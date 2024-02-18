/*
 * @lc app=leetcode.cn id=525 lang=javascript
 *
 * [525] 连续数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  const n = nums.length
  let ans = 0
  let counter = 0
  const map = new Map()
  map.set(counter, -1)
  for (let i = 0; i < n; i++) {
    const num = nums[i]
    if (num === 1) {
      counter += 1
    } else {
      counter -= 1
    }

    if (map.has(counter)) {
      const prevIndex = map.get(counter)
      ans = Math.max(ans, i - prevIndex)
    } else {
      map.set(counter, i)
    }
  }

  return ans
}
// @lc code=end
