/*
 * @lc app=leetcode.cn id=29 lang=javascript
 *
 * [29] 两数相除
 */

// @lc code=start
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
function divide(dividend, divisor) {
  // 位运算累减的思路
  // 以 15 / 3 为例，3 右移 1，3 << 1 = 6 < 15
  // 继续右移直到 (3 << 2 = 12) < 15 < (3 << 3 = 24)
  // 此时得出累计减去divisor的数量，也就是 2 ** 2 = 4
  // dividend 减去累减的数量，重复上述动作，直到dividend < divisor
  const MAX = 2 ** 31 - 1
  const MIN = (-2) ** 31
  if (divisor === MIN) {
    return dividend === MIN ? 1 : 0
  }
  if (divisor === 1) {
    return dividend
  }
  if (divisor === -1) {
    if (dividend >= 0) {
      return -dividend
    } else {
      return dividend === MIN ? MAX : -dividend
    }
  }
  const sign = (dividend > 0) ^ (divisor > 0) ? -1 : 1
  let ans = 0
  dividend = Math.abs(dividend)
  divisor = Math.abs(divisor)
  while (dividend >= divisor) {
    let temp = divisor
    let m = 1
    // JavaScript位运算会自动转成32位整数处理，需要判断溢出情况
    while (temp << 1 <= dividend && temp << 1 > 0) {
      temp <<= 1
      m <<= 1
    }
    dividend -= temp
    ans += m
  }
  return ans * sign
}
// @lc code=end

const assert = require('assert').strict

const res1 = divide(10, 3)
assert.equal(res1, 3)

const res2 = divide(7, -3)
assert.equal(res2, -2)

// 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。
// 本题中，如果除法结果溢出，则返回 2^31 − 1。
const res3 = divide(-2147483648, -1)
assert.equal(res3, 2147483647)

const res4 = divide(2147483647, 1)
assert.equal(res4, 2147483647)

const res5 = divide(2147483647, 2)
assert.equal(res5, 1073741823)
