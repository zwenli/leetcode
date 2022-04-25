/*
 * @lc app=leetcode.cn id=81 lang=javascript
 *
 * [81] 搜索旋转排序数组 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
function search(nums, target) {
  if (!nums || !nums.length) return false
  const n = nums.length
  if (n === 1) {
    return nums[0] === target
  }
  let left = 0
  let right = n - 1
  while (left <= right) {
    // 去除重复元素
    while (left < right && nums[left] === nums[left + 1]) left += 1;
    while (left < right && nums[right] === nums[right - 1]) right -= 1;
    
    const mid = left + ((right - left) >> 1)
    if (target === nums[mid]) {
      return true
    } else if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return false
}

// function search(nums, target) {
//   if (!nums || !nums.length) return false
//   const n = nums.length
//   if (n === 1) {
//     return nums[0] === target
//   }
//   let left = 0
//   let right = n - 1
//   while (left <= right) {
//     const mid = left + ((right - left) >> 1)
//     if (nums[mid] === target) {
//       return true
//     }
//     if (nums[left] === nums[mid] && nums[right] === nums[mid]) {
//       // 无法判断[left, mid] 和 [mid + 1, right]哪个是有序的
//       // 只能将当前二分区间的左边界加一，右边界减一，然后在新区间上继续二分查找。
//       left += 1
//       right -= 1
//     } else if (nums[left] <= nums[mid]) {
//       // [left, mid] 区间是有序的
//       if (nums[left] <= target && target < nums[mid]) {
//         // target 大小满足在区间[left, mid]，将搜索范围向左边收缩
//         right = mid - 1
//       } else {
//         left = mid + 1
//       }
//     } else {
//       // [mid + 1, right] 区间是有序
//       if (nums[mid] < target && target <= nums[right]) {
//         // target 大小满足在区间[mid + 1, right]，将搜索范围向右收缩
//         left = mid + 1
//       } else {
//         right = mid - 1
//       }
//     }
//   }
//   return false
// }
// @lc code=end

const assert = require('assert').strict

const res1 = search([2, 5, 6, 0, 0, 1, 2], 0)
assert.equal(res1, true)

const res2 = search([2, 5, 6, 0, 0, 1, 2], 3)
assert.equal(res2, false)
