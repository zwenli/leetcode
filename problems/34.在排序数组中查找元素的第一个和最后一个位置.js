/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  /**
   * time complexity O(logn): 二分查找的时间复杂度为O(logn)，两次二分查找
   */
  if (!nums || !nums.length) return [-1, -1]
  const left = binarySearch(nums, target, true)
  const right = binarySearch(nums, target, false) - 1
  if (left <= right) {
    return [left, right]
  }
  return [-1, -1]
}

function binarySearch(nums, target, lower = false) {
  // lower 等于 true 找第一个大于等于target的数字
  // lower 等于 false 找第一个大于target的数字
  let left = 0
  let right = nums.length - 1
  let ans = nums.length
  while (left <= right) {
    const mid = (right + left) >> 1
    if (nums[mid] > target || (lower && nums[mid] >= target)) {
      right = mid - 1
      ans = mid
    } else {
      left = mid + 1
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = searchRange([5, 7, 7, 8, 8, 10], 8)
assert.deepEqual(res1, [3, 4])

const res2 = searchRange([5, 7, 7, 8, 8, 10], 6)
assert.deepEqual(res2, [-1, -1])

const res3 = searchRange([], 0)
assert.deepEqual(res3, [-1, -1])
