/*
 * @lc app=leetcode.cn id=172 lang=javascript
 *
 * [172] 阶乘后的零
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let ans = 0
  while (n !== 0) {
    n = Math.floor(n / 5)
    ans += n
  }
  return ans
}
// var trailingZeroes = function (n) {
//   // n!尾零的个数即为n!中因子10的个数，
//   // 而10 = 2 * 5，因此转为求n!中质因子2的个数和5的个数的较小值
//   // 又因为5的个数不会大于2的个数，因此可以仅考虑质因子5的个数。
//   // 质因子5的个数等于[1,n]的每个数的质因子5的个数之和，因此
//   // 可以通过遍历[1,n]的所有5的倍数求出。
//   let ans = 0
//   for (let i = 5; i <= n; i += 5) {
//     for (let x = i; x % 5 === 0; x /= 5) {
//       ans += 1
//     }
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = trailingZeroes(30)
assert.equal(res1, 7)

const res2 = trailingZeroes(5)
assert.equal(res2, 1)
