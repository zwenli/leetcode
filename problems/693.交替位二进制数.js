/*
 * @lc app=leetcode.cn id=693 lang=javascript
 *
 * [693] 交替位二进制数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function (n) {
  let prev
  while (n) {
    const bit = n & 1
    if (prev === bit) return false
    prev = bit
    n >>= 1
  }
  return true
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = hasAlternatingBits(5)
assert.equal(res1, true)

const res2 = hasAlternatingBits(7)
assert.equal(res2, false)

const res3 = hasAlternatingBits(11)
assert.equal(res3, false)
