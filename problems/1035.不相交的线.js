/*
 * @lc app=leetcode.cn id=1035 lang=javascript
 *
 * [1035] 不相交的线
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxUncrossedLines = function (nums1, nums2) {
  // 动态规划
  // 问题可以转化为最长公共子序列的问题
  // https://leetcode.cn/problems/uncrossed-lines/solutions/787955/bu-xiang-jiao-de-xian-by-leetcode-soluti-6tqz/
  const m = nums1.length
  const n = nums2.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    const num1 = nums1[i - 1]
    for (let j = 1; j <= n; j++) {
      const num2 = nums2[j - 1]
      if (num1 === num2) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
      }
    }
  }
  return dp[m][n]
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = maxUncrossedLines([1, 4, 2], [1, 2, 4])
assert.equal(res1, 2)

const res2 = maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2])
assert.equal(res2, 3)

const res3 = maxUncrossedLines([1, 1, 2, 1, 2], [1, 3, 2, 3, 1])
assert.equal(res3, 3)
