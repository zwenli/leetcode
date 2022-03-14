/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

function findKthLargest(nums, k) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  return nums[n - k]
}
// @lc code=end

const assert = require('assert').strict

const res1 = findKthLargest([3, 2, 1, 5, 6, 4], 2)
assert.equal(res1, 5)

const res2 = findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)
assert.equal(res2, 4)

/**
 * https://leetcode.com/problems/kth-largest-element-in-an-array/discuss/60294/Solution-explained
 */
