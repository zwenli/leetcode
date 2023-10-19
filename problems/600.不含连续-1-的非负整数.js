/*
 * @lc app=leetcode.cn id=600 lang=javascript
 *
 * [600] 不含连续1的非负整数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var findIntegers = function (n) {
  const s = n.toString(2) // 转化为二进制字符串s
  const m = s.length
  const dp = new Array(m).fill(-1).map(() => new Array(2).fill(-1))
  return f(0, false, true)

  // f(i, pre, isLimit, isNum) 表示构造从左到右第i位及其之后数位的合法方案数
  // pre 表示第 i - 1 位是否为1，如果为真则当前不能填1
  // isLimit 表示当前是否受到了n的约束。若为真，则第i位至多填s[i],否则可以填至1
  // isNum 表示i前面的数位是否填写的数字。若为假，则当前位可以跳过（不填数字），或则填入的数字至少位1，若为真，则要填入的数字可以从 0 开始。
  // 由于前导零对答案无影响，isNum 可以省略。
  function f(i, pre, isLimit) {
    // 当前填写的数字是一个合法方案
    if (i === s.length) return 1

    if (!isLimit && dp[i][Number(pre)] !== -1) return dp[i][Number(pre)]

    const up = isLimit ? Number(s[i]) : 1
    // isLimit && up === 0 的逻辑，up === 0 说明只能填0，填写受到约束，后续的填写也会受到约束
    let res = f(i + 1, false, isLimit && up === 0) // 填 0
    // i - 1不是0，且i可填1
    if (!pre && up === 1) res += f(i + 1, true, isLimit) // 填 1
    if (!isLimit) dp[i][Number(pre)] = res
    return res
  }
}
// @lc code=end
const assert = require('node:assert').strict

const res1 = findIntegers(5)
assert.equal(res1, 5)

const res2 = findIntegers(1)
assert.equal(res2, 2)

const res3 = findIntegers(2)
assert.equal(res3, 3)
