/*
 * @lc app=leetcode.cn id=2376 lang=javascript
 *
 * [2376] 统计特殊整数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countSpecialNumbers = function (n) {
  /**
   * 数位dp（digit dp）
   * https://leetcode.cn/problems/count-special-integers/solutions/1746956/shu-wei-dp-mo-ban-by-endlesscheng-xtgx/
   * mask: 掩码，判断数字是否在集合中，比如有数字203，那么其对应mask为 1101
   * isLimit: 表示当前是否受到了 n 的约束（注意要构造的数字不能超过 n）。
   *   比如n = 123, i = 0填的是1的话，isLimit 为true，那么 i = 1的这一位至多填2.
   *   i = 0 填的是0的话，isLimit 为false，，i=1填的数字不受约束，至多填9.
   * isNum: 表示 i 前面的数位是否填了数字。若为假，则当前位可以跳过（不填数字），或者要填入的数字至少为 1；若为真，则要填入的数字可以从 0 开始。
   *   （换句话说就是前导0的情况，假设i=2之前没填（isNum = false），那么可以理解为 前面填了00，那么有两种情况，可以继续跳过填0，或者从1开始填入数字）
   *    例如 n=123，在 i=0 时跳过的话，相当于后面要构造的是一个 99 以内的数字了，
   *    如果 i=1 不跳过，那么相当于构造一个 10 到 99 的两位数，
   *    如果 i=1 跳过，相当于构造的是一个 9 以内的数字。
   */
  const s = String(n)
  const m = s.length
  // mask用到10位二进制
  const memo = new Array(m).fill(-1).map(() => new Array(1 << 10).fill(-1))

  return f(0, 0, true, false)
  

  function f(i, mask, isLimit, isNum) {
    if (i === s.length) {
      // isNum 为 true 表示得到了一个合法数字
      // 为false，说明i之前没填过数字
      return isNum ? 1 : 0
    }
    /**
     * isLimit 代表着数字都是顶格获取的，比如 7653849 这个数字填充第三位的时候，所谓顶格选其实就是前两位选了 76。
     * !isNum 代表着前面前部跳过的情况，同样还是 7653849 这个数字填充第三位的时候，前面两位跳过的话其实就是 00，
     * 上面两种状态其实就意味着，这两个状态其实是不会反复出现的，0000... 或者 7653849 这种是只会出现一次的。
     * 要么全部跳过，要么全部选最大值。不会由其它状态转换出来，既然只会出现一次，那么就根本不用缓存。
     */
    if (!isLimit && isNum && memo[i][mask] !== -1) {
      return memo[i][mask]
    }

    let res = 0
    // 前面还没填写数字，可以跳过当前数位
    if (!isNum) res = f(i + 1, mask, false, false)
    // 填写当前数位，最大可填数字受isLimit
    const up = isLimit ? s[i] - 0 : 9
    // 枚举要填入的数字 d，前面还没填写数字的情况下从1开始填写。
    for (let d = isNum ? 0 : 1; d <= up; d++) {
      // (mask >> d) & 1) === 0 说明数字没在集合中
      if (((mask >> d) & 1) === 0) {
        // 更新mask，将数字加入集合中
        // d === up，说明当前数字是可填最大值，下个填写的数字将会受到约束。
        res += f(i + 1, mask | (1 << d), isLimit && d === up, true)
      }
    }

    if (!isLimit && isNum) {
      memo[i][mask] = res
    }
    return res
  }
}

// var countSpecialNumbers = function (n) {
//   // Time Limit Exceeded
//   let ans = 0
//   for (let i = 1; i <= n; i++) {
//     if (isSpecial(i)) ans += 1
//   }
//   return ans

//   function isSpecial(num) {
//     let mask = 0
//     while (num > 0) {
//       const d = num % 10
//       if ((mask >> d) & 1) {
//         return false
//       }
//       mask = mask | (1 << d)
//       num = Math.floor(num / 10)
//     }
//     return true
//   }
// }
// @lc code=end
const assert = require('node:assert').strict

const res1 = countSpecialNumbers(20)
assert.equal(res1, 19)

const res2 = countSpecialNumbers(5)
assert.equal(res2, 5)

const res3 = countSpecialNumbers(135)
assert.equal(res3, 110)
