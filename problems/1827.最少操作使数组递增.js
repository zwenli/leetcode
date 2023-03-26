/*
 * @lc app=leetcode.cn id=1827 lang=javascript
 *
 * [1827] 最少操作使数组递增
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  /**
   * 在遍历数组时，对于每个元素，如果它小雨等于前一个元素，需要将其变为前一个元素加1。
   * 并记录下总共的操作次数即可。
   */
  let max = nums[0]
  let ans = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i]
    } else {
      max += 1
      ans += max - nums[i]
    }
  }
  return ans
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = minOperations([1, 1, 1])
assert.equal(res1, 3)
