/*
 * @lc app=leetcode.cn id=228 lang=javascript
 *
 * [228] 汇总区间
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  const n = nums.length
  let res = []
  let left = 0
  let right = 0
  while (right < n) {
    while (right < n - 1 && nums[right] + 1 === nums[right + 1]) {
      right++
    }
    if (left === right) {
      res.push(nums[left].toString())
    } else {
      res.push(`${nums[left]}->${nums[right]}`)
    }
    right++
    left = right
  }
  return res
}
// @lc code=end
