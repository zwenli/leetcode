/*
 * @lc app=leetcode.cn id=905 lang=javascript
 *
 * [905] 按奇偶排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  // 双指针 + 原地
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    while (nums[left] % 2 === 0) {
      left++
    }
    while (nums[right] % 2 === 1) {
      right--
    }
    if (left < right) {
      const temp = nums[left]
      nums[left] = nums[right]
      nums[right] = temp
      left++
      right--
    }
  }
  return nums
}
// var sortArrayByParity = function (nums) {
//   // 双指针
//   const n = nums.length
//   const ans = new Array(n).fill(0)
//   let left = 0
//   let right = n - 1
//   for (const num of nums) {
//     if (num % 2 === 0) {
//       ans[left++] = num
//     } else {
//       ans[right--] = num
//     }
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = sortArrayByParity([3, 1, 2, 4])
assert.deepEqual(res1, [4, 2, 3, 1])

const res2 = sortArrayByParity([0])
assert.deepEqual(res2, [0])
