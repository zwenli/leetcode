/*
 * @lc app=leetcode.cn id=461 lang=javascript
 *
 * [461] 汉明距离
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let ans = 0
  let s = x ^ y
  while (s !== 0) {
    s &= s - 1 // 消去最低位的1
    ans += 1
  }
  return ans
}
// var hammingDistance = function (x, y) {
//   let ans = 0
//   for (let k = 0; k < 31; k++) {
//     ans += ((x >> k) & 1) ^ ((y >> k) & 1)
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = hammingDistance(1, 4)
assert.equal(res1, 2)

const res2 = hammingDistance(3, 1)
assert.equal(res2, 1)
