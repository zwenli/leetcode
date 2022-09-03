/*
 * @lc app=leetcode.cn id=868 lang=javascript
 *
 * [868] 二进制间距
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function (n) {
  let gap = 0
  let prev = -1
  for (let i = 0; n !== 0; i++) {
    if ((n & 1) === 1) {
      if (prev > -1) {
        gap = Math.max(gap, i - prev)
      }
      prev = i
    }
    n >>= 1
  }
  return gap
}
// var binaryGap = function (n) {
//   let gap = 0
//   let prev1 = -1
//   let prev2 = -1
//   for (let i = 0; i < 32; i++) {
//     const bit = (n >> i) & 1
//     if (bit) {
//       prev2 = prev1
//       prev1 = i
//       gap = Math.max(gap, prev2 > -1 ? prev1 - prev2 : prev2)
//     }
//   }
//   return gap
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = binaryGap(22)
assert.equal(res1, 2)

const res2 = binaryGap(8)
assert.equal(res2, 0)

const res3 = binaryGap(5)
assert.equal(res3, 2)
