/*
 * @lc app=leetcode.cn id=922 lang=javascript
 *
 * [922] 按奇偶排序数组 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParityII = function (nums) {
  const n = nums.length
  let even = 0
  let odd = 1
  while (odd < n && even < n) {
    // 找到偶数位置上的奇数
    while (nums[even] % 2 === 0) {
      even += 2
    }
    // 找到奇数位置上的偶数
    while (nums[odd] % 2 === 1) {
      odd += 2
    }
    if (odd < n && even < n) {
      const temp = nums[even]
      nums[even] = nums[odd]
      nums[odd] = temp
    }
  }
  return nums
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = sortArrayByParityII([4, 2, 5, 7])
assert.deepEqual(res1, [4, 5, 2, 7])

const res2 = sortArrayByParityII([2, 0, 3, 4, 1, 3])
assert.deepEqual(res2, [2, 3, 0, 1, 4, 3])
