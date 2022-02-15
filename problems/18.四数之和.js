/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
function fourSum(nums, target) {
  nums.sort((a, b) => a - b)
  return sumTarget(nums, 4, 0, target)
  function sumTarget(nums, n, start, target) {
    const ans = []
    if (n < 2 || nums.length < n) return ans
    if (n === 2) {
      let L = start
      let R = nums.length - 1
      while (L < R) {
        const left = nums[L]
        const right = nums[R]
        const sum = left + right
        if (sum === target) {
          ans.push([left, right])
          while (L < R && nums[L] === left) L += 1
          while (L < R && nums[R] === right) R -= 1
        } else if (sum < target) {
          while (L < R && nums[L] === left) L += 1
        } else if (sum > target) {
          while (L < R && nums[R] === right) R -= 1
        }
      }
      return ans
    } else {
      for (let i = start; i < nums.length; i += 1) {
        if (i > start && nums[i] === nums[i - 1]) continue
        const sub = sumTarget(nums, n - 1, i + 1, target - nums[i])
        for (const arr of sub) {
          arr.unshift(nums[i])
          ans.push(arr)
        }
      }
      return ans
    }
  }
}
// @lc code=end

const assert = require('assert').strict

const res1 = fourSum([1, 0, -1, 0, -2, 2], 0)
assert.deepEqual(res1, [
  [-2, -1, 1, 2],
  [-2, 0, 0, 2],
  [-1, 0, 0, 1],
])

const res2 = fourSum([2, 2, 2, 2, 2], 8)
assert.deepEqual(res2, [[2, 2, 2, 2]])
