/*
 * @lc app=leetcode.cn id=910 lang=typescript
 *
 * [910] 最小差值 II
 */

// @lc code=start
function smallestRangeII(nums: number[], k: number): number {
  nums.sort((a, b) => a - b)
  const mi = nums[0],
    ma = nums[nums.length - 1]
  let res = ma - mi
  for (let i = 0; i < nums.length - 1; i++) {
    const a = nums[i],
      b = nums[i + 1]
    res = Math.min(res, Math.max(ma - k, a + k) - Math.min(mi + k, b - k))
  }
  return res
}
// @lc code=end
