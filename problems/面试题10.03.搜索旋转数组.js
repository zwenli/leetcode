/*
 * href: https://leetcode.cn/problems/search-rotate-array-lcci/
 * 面试题 10.03. 搜索旋转数组
 * 相似题目 https://leetcode.cn/problems/search-in-rotated-sorted-array/
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var search = function (nums, target) {
  const n = nums.length
  let left = 0
  let right = n - 1
  while (left <= right) {
    // left 此时为最小索引，返回答案
    if (nums[left] === target) return left
    const mid = ((right - left) >> 1) + left
    if (nums[mid] === target) {
      // 中间可能存在相等的值
      right = mid
    } else if (nums[0] < nums[mid]) {
      // [0, mid] 有序
      if (nums[0] <= target && target < nums[mid]) {
        // target 落在左半部分的有序区间内
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else if (nums[0] > nums[mid]) {
      // [mid + 1, n - 1] 有序
      if (nums[mid] < target && target <= nums[n - 1]) {
        // target 落在右半部分的有序区间内
        left = mid + 1
      } else {
        right = mid - 1
      }
    } else {
      // nums[0] === nums[mid]，中间数字与左边相等
      // 此时无法判断两个区间的有序性，
      //    /                   /
      // --  -mid-- or  --mid--   -
      // 退化成从左往右查找target
      left += 1
    }
  }
  return -1
}

// @lc code=end

const assert = require('node:assert').strict

const res1 = search([15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], 5)
assert.equal(res1, 8)

const res2 = search([15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], 11)
assert.equal(res2, -1)

const res3 = search([1,1,1,1,1,2,1,1,1], 2)
assert.equal(res3, 5)
