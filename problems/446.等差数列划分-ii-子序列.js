/*
 * @lc app=leetcode.cn id=446 lang=javascript
 *
 * [446] 等差数列划分 II - 子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function (nums) {
  const n = nums.length
  if (n < 3) return 0
  // dp[i][d] 表示以nums[i]为尾项，公差为d的等差子序列的个数，
  // 这里会考虑至少有两个元素的等差子序列，称为弱等差子序列
  const dp = new Array(n).fill(0).map(() => new Map())
  let ans = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const d = nums[i] - nums[j]
      // j，子序列个数
      const cnt = dp[j].get(d) || 0
      // j 加上 i自身后，等差子序列至少有三个元素，
      // 因此先加上结果
      ans += cnt
      // 还要考虑 [nums[j], nums[j]] 这个等差子序列，因此转移方程
      // dp[i][d] += dp[j][d] + 1
      dp[i].set(d, (dp[i].get(d) || 0) + cnt + 1)
    }
  }
  return ans
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = numberOfArithmeticSlices([2, 4, 6, 8, 10])
assert.equal(res1, 7)
