/*
 * @lc app=leetcode.cn id=219 lang=javascript
 *
 * [219] 存在重复元素 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if (!map.has(num)) {
      map.set(num, i)
    } else {
      if (i - map.get(num) <= k) return true
      map.set(num, i)
    }
  }
  return false
}
// @lc code=end
