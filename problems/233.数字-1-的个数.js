/*
 * @lc app=leetcode.cn id=233 lang=javascript
 *
 * [233] 数字 1 的个数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
function countDigitOne(n) {
  // 数位dp, 同2376
  // https://leetcode.cn/problems/number-of-digit-one/solutions/1750339/by-endlesscheng-h9ua/
  const s = String(n)
  const m = s.length
  // 对于m长的数字，最多有m个1，因此dp的空间用m*m即可
  const dp = new Array(m).fill(-1).map(() => new Array(m).fill(-1))
  return f(0, 0, true)

  // 此题由于前导零对答案无影响，isNum 可以省略。
  function f(i, cnt, isLimit) {
    if (i === s.length) return cnt
    if (!isLimit && dp[i][cnt] !== -1) return dp[i][cnt]

    let res = 0
    for (let d = 0, up = isLimit ? Number(s[i]) : 9; d <= up; d++) {
      res += f(i + 1, cnt + (d === 1 ? 1 : 0), isLimit && d === up)
    }
    if (!isLimit) {
      dp[i][cnt] = res
    }
    return res
  }
}
// function countDigitOne(n) {
//   /**
//    * 思路为计算小于等于n的所有数，某一位的所有1的个数, k表示第k位
//    * (n / 10 ** (k + 1)) * (10 ** k) + min(max(n % (10 ** (k + 1)) - (10 ** k) + 1, 0), 10 ** k)
//    */
//   let mulk = 1
//   let ans = 0
//   for (let k = 0; n >= mulk; k += 1) {
//     ans += Math.floor(n / (mulk * 10)) * mulk + Math.min(Math.max(n % (mulk * 10) - mulk + 1, 0), mulk)
//     mulk *= 10
//   }
//   return ans
// }
// function countDigitOne(n) {
//   /**
//    * dp, 内存溢出
//    * 此思路是计算每个数字中1的个数，对于任意数字i，可以拆分成 i /10 和 i%10的个数之和
//    * 分别计算这两个数字的1的个数，dp[i%10]其实就是个位数是否出现1，dp[i /10]的结果是已知的
//    * 故 dp[i] = dp[i/10] + dp[i%10]
//    * base case dp[1] = 1
//    * 所求结果就是所有dp[i]之和
//    */
//   let ans = 0
//   const dp = new Array(n + 1).fill(0)
//   dp[1] = 1
//   for (let i = 0; i <= n; i += 1) {
//     dp[i] = dp[Math.floor(i / 10)] + dp[i % 10]
//     ans += dp[i]
//   }
//   return ans
// }
// @lc code=end
const assert = require('assert').strict

const res1 = countDigitOne(13)
assert.equal(res1, 6)
const res2 = countDigitOne(0)
assert.equal(res2, 0)
