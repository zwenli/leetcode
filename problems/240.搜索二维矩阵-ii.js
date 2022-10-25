/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // z字型搜索
  // time complexity O(m + n)
  const m = matrix.length
  const n = matrix[0].length
  // 以矩阵左上角为起点，每次搜索往右下角方向搜索
  // 即 x 增加 ，y 减小
  // 为什么，以坐标（x,y）为例，根据题意
  // 第x行，[0,y-1]列的数值必定小于 matrix[x][y]
  // 第y列，[x+1,m]行的数值必定大于 matrix[x][y]
  //  <------------递减-----------[x][y]
  //                                 ｜
  //                                 ｜
  //                                递增
  //                                 ｜
  //                                 ⌄
  let x = 0
  let y = n - 1
  while (x <= m - 1 && y >= 0) {
    const current = matrix[x][y]
    if (current === target) {
      return true
    }
    if (current > target) {
      // 当target[x][y] > target 时
      // 第 y 列的数值必大于target，该列可以忽略，y减少1
      y -= 1
    } else {
      // 当 target[x][y] < target 时
      // 第 x 行的数值必小于 target，该行可忽略，x增加1
      x += 1
    }
  }
  return false
// }
// var searchMatrix = function (matrix, target) {
//   // 每行二分查找
//   // time complexity O(mlogn)
//   for (const nums of matrix) {
//     const index = binarySearch(nums, target)
//     if (index > -1) return true
//   }
//   return false
// }
// function binarySearch(nums, target) {
//   let left = 0
//   let right = nums.length - 1
//   while (left <= right) {
//     const mid = left + ((right - left) >> 1)
//     if (nums[mid] === target) return mid
//     if (nums[mid] < target) {
//       left = mid + 1
//     } else {
//       right = mid - 1
//     }
//   }
//   return -1
// }
// @lc code=end
