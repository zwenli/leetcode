/*
 * @lc app=leetcode.cn id=268 lang=javascript
 *
 * [268] 丢失的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  // 数学
  // 数组nums中有n个数字
  // 从0到n的全部整数之和sum = (n * (n + 1)) / 2
  // 数组元素之和记录为 arrSum
  // 则arrSum 比 sum 少了一个丢失的数字，
  // 因此丢失的数字为 sum - arrSum
  const n = nums.length
  let sum = (n * (n + 1)) / 2
  for (const num of nums) {
    sum -= num
  }
  return sum
}
// var missingNumber = function (nums) {
//   // 位运算
//   // 数组nums中有n个数字，在这n个数字后面再添加上从0到n的每一个数字，
//   // 则添加了n+1个数字，共有2n+1个数字。
//   // 在这2n+1个数字中，丢失的数字只出现一次，其余都是出现两次。
//   // 此时问题就变成了 136.只出现一次的数字
//   let xor = 0
//   const n = nums.length
//   for (let i = 0; i < n; i++) {
//     xor ^= nums[i]
//   }
//   for (let i = 0; i <= n; i++) {
//     xor ^= i
//   }
//   return xor
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = missingNumber([3, 0, 1])
assert.equal(res1, 2)

const res2 = missingNumber([0, 1])
assert.equal(res2, 2)
const res3 = missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])
assert.equal(res3, 8)
const res4 = missingNumber([0])
assert.equal(res4, 1)
