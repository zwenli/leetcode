/*
 * @lc app=leetcode.cn id=1335 lang=javascript
 *
 * [1335] 工作计划的最低难度
 */

// @lc code=start
/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
var minDifficulty = function (jobDifficulty, d) {
  // https://leetcode.cn/problems/minimum-difficulty-of-a-job-schedule/solution/gong-zuo-ji-hua-de-zui-di-nan-du-by-leet-dule/
  // TODO: 优化，滚动数组
  // dp[i][j] 前i天，完成前j项工作的最低难度
  // f(i,j) 第i份工作到第j份工作的最高难度
  // dp[i,j] = min(dp[i-1,k] + f(k+1,j)), k = [i-1,j-1]
  const n = jobDifficulty.length
  if (n < d) return -1

  const dp = new Array(d).fill(0).map(() => new Array(n).fill(Infinity))
  let max = 0
  // 边界情况，前1天完成前i项任务的最低难度
  for (let i = 0; i < n; i++) {
    max = Math.max(max, jobDifficulty[i])
    dp[0][i] = max
  }
  for (let i = 1; i < d; i++) {
    for (let j = i; j < n; j++) {
      max = 0
      for (let k = j; k >= i; k--) {
        max = Math.max(max, jobDifficulty[k])
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][k - 1] + max)
      }
    }
  }
  return dp[d - 1][n - 1]
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = minDifficulty([6, 5, 4, 3, 2, 1], 2)
assert.equal(res1, 7)
