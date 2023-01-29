/*
 * @lc app=leetcode.cn id=201 lang=javascript
 *
 * [201] 数字范围按位与
 */

// @lc code=start
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */

var rangeBitwiseAnd = function (left, right) {
  // 位移，官方解，更优雅些
  let shift = 0
  // 找到公共前缀
  while (left < right) {
    left >>= 1
    right >>= 1
    shift += 1
  }
  return left << shift
}
// var rangeBitwiseAnd = function (left, right) {
//   // 区间内数字，只要第i位出现0，答案的第i位必为0
//   // 右移，找出公共前缀，
//   // 出现不相同的地方停止位移，取公共前缀的结果
//   let ans = 0
//   for (let i = 31; i >= 0; i--) {
//     const L = (left >> i) & 1
//     const R = (right >> i) & 1
//     if (L == R) {
//       ans |= L << i
//     } else {
//       break
//     }
//   }
//   return ans
// }
// var rangeBitwiseAnd = function (left, right) {
//   // timeout
//   let ans = 2 ** 32 - 1
//   for (let i = left; i <= right; i++) {
//     ans &= i
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = rangeBitwiseAnd(5, 7)
assert.equal(res1, 4)

const res2 = rangeBitwiseAnd(0, 0)
assert.equal(res2, 0)

const res3 = rangeBitwiseAnd(1, 2147483647)
assert.equal(res3, 0)
