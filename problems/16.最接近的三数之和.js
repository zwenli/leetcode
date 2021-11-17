/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumClosest(nums, target) {
  // 排序+双指针
  // time complexity O(n^2): 排序的时间复杂度为O(nlogn)，一层循环O(n)枚举i，双指针O(n)枚举L和R
  // 一共是O(n^2)
  // space complexity O(logn): 排序需要O(logn)的空间
  const n = nums.length
  let best = Infinity // 最接近的总和
  nums.sort((a, b) => a - b)
  for (let i = 0; i < n; i += 1) {
    if (i > 0 && nums[i] === nums[i - 1]) continue
    let L = i + 1
    let R = n - 1
    while (L < R) {
      let sum = nums[i] + nums[L] + nums[R]
      if (sum === target) {
        return target
      }
      update(sum)
      if (sum < target) {
        while (L < R && nums[L] === nums[L + 1]) L += 1
        L += 1
      } else {
        while (L < R && nums[R] === nums[R - 1]) R -= 1
        R -= 1
      }
    }
  }
  return best
  function update(sum) {
    // 比较差值的绝对值
    if (Math.abs(sum - target) < Math.abs(best - target)) {
      best = sum
    }
  }
}
// @lc code=end

const assert = require('assert')
const res1 = threeSumClosest([-1,2,1,-4], 1)
assert.equal(res1, 2)

/**

和15.三数之和类似

1. 暴力，三层循环
2. 排序+双指针


 */
