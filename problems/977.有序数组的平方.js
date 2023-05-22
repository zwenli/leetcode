/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */

var sortedSquares = function (nums) {
  // 双指针，
  const n = nums.length
  const ans = []
  for (let i = 0, j = n - 1, p = n - 1; i <= j; p--) {
    if (nums[i] * nums[i] > nums[j] * nums[j]) {
      ans[p] = nums[i] * nums[i]
      i += 1
    } else {
      ans[p] = nums[j] * nums[j]
      j -= 1
    }
  }
  return ans
}
// var sortedSquares = function (nums) {
//   // 双指针，
//   // 利用数组nums已经按照升序排序的条件，
//   // 找到负数和正数的分界线，之后使用类似「归并排序」的方法实现。
//   // time complexity O(n)
//   const n = nums.length
//   let negative = -1
//   for (let i = 0; i < n; i++) {
//     if (nums[i] < 0) {
//       negative = i
//     } else {
//       break
//     }
//   }
//   const ans = []
//   let i = negative
//   let j = negative + 1
//   while (i >= 0 || j < n) {
//     if (i < 0) {
//       ans.push(nums[j] * nums[j])
//       j++
//     } else if (j >= n) {
//       ans.push(nums[i] * nums[i])
//       i--
//     } else if (nums[i] * nums[i] < nums[j] * nums[j]) {
//       ans.push(nums[i] * nums[i])
//       i--
//     } else {
//       ans.push(nums[j] * nums[j])
//       j++
//     }
//   }
//   return ans
// }
// var sortedSquares = function (nums) {
//   // time complexity O(nlogn)
//   // TODO: 改为自己实现排序算法
//   return nums.map((num) => num * num).sort((a, b) => a - b)
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = sortedSquares([-4, -1, 0, 3, 10])
assert.deepEqual(res1, [0, 1, 9, 16, 100])

const res2 = sortedSquares([-7, -3, 2, 3, 11])
assert.deepEqual(res2, [4, 9, 9, 49, 121])
