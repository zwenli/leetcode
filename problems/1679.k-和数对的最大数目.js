/*
 * @lc app=leetcode.cn id=1679 lang=javascript
 *
 * [1679] K 和数对的最大数目
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maxOperations(nums, k) {
  let ans = 0
  if (nums.length < 2) return ans
  nums.sort((a, b) => a - b)
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    const sum = nums[left] + nums[right]
    if (sum === k) {
      ans += 1
      left += 1
      right -= 1
    } else if (sum < k) {
      left += 1
    } else {
      right -= 1
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = maxOperations([1,2,3,4], 5)
assert.equal(res1, 2)

const res2 = maxOperations([3,1,3,4,3], 6)
assert.equal(res2, 1)