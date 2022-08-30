/*
 * @lc app=leetcode.cn id=747 lang=javascript
 *
 * [747] 至少是其他数字两倍的最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  let max1 = -1 // 最大
  let max2 = -1 // 次最大
  let index = -1 // 最大值的下标
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] > max1) {
      max2 = max1
      max1 = nums[i]
      index = i
    } else if (nums[i] > max2) {
      max2 = nums[i]
    }
  }
  return max1 >= max2 * 2 ? index : -1
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = dominantIndex([3, 6, 1, 0])
assert.equal(res1, 1)

const res2 = dominantIndex([1, 2, 3, 4])
assert.equal(res2, -1)
