/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var sortColors = function (nums) {
//   // 单指针
//   // 对数组进行两次遍历，第一次将所有的0交换到数组的头部
//   // 第二次将所有的1交换到头部的0之后。
//   const n = nums.length
//   let p = 0
//   for (let i = 0; i < n; i++) {
//     if (nums[i] === 0) {
//       swap(nums, i, p)
//       p++
//     }
//   }
//   for (let i = p; i < n; i++) {
//     if (nums[i] === 1) {
//       swap(nums, i, p)
//       p++
//     }
//   }
// }

var sortColors = function (nums) {
  // 双（三）指针
  const n = nums.length
  let p0 = 0 // 0指针，p0 之前是已排序好的0
  let p1 = 0 // 1指针（其实也可以理解为i，正常情况下是都加1的）
  let p2 = n - 1 // 2指针，p2之后是已排序的2
  while (p1 <= p2) {
    if (nums[p1] === 0) {
      swap(nums, p0, p1)
      p0++
      p1++
    } else if (nums[p1] === 1) {
      p1++
    } else {
      swap(nums, p1, p2)
      p2--
      // p1 这里不加1的原因是，
      // 交换完后，需要重新判断p1应该放在哪个位置
    }
  }
}

function swap(nums, i, j) {
  const temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = [2, 0, 2, 1, 1, 0]
sortColors(res1)
assert.deepEqual(res1, [0, 0, 1, 1, 2, 2])

const res2 = [2, 0, 1]
sortColors(res2)
assert.deepEqual(res2, [0, 1, 2])
