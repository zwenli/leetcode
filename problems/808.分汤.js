/*
 * @lc app=leetcode.cn id=808 lang=javascript
 *
 * [808] 分汤
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var soupServings = function (n) {
  // 记忆化搜索
  // https://leetcode.cn/problems/soup-servings/solutions/1981704/fen-tang-by-leetcode-solution-0yxs/
  n = Math.ceil(n / 25)
  if (n >= 179) {
    // n 在非常大的情况下，汤 A 会有很大的概率比 B 先分配完，汤 A 被先取完的概率应该非常接近 1。
    // 论证过程看题解
    return 1
  }
  const memo = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0))
  const dfs = (i, j) => {
    // dp[i][j] 表示 汤A剩余i，汤B 剩余j的最终概率 = 汤A先分配完的概率 + 汤A和汤B同时分配完的概率×0.5
    // 状态转移方程：
    // dp[i][j] = (dp[i-4][j] + dp[i-3][j-1] + dp[i-2][j-2] + dp[i-1][j-3]) / 4
    
    // 无法在分配的情况
    if (i <= 0 && j <= 0) {
      // 汤 A 和汤 B 同时分配完的概率为1
      // 汤A先分配玩的概率为0
      return 0.5
    } else if (i <= 0) {
      // 汤 A 先分配完，汤 B 永远无法完成分配
      return 1
    } else if (j <= 0) {
      // 汤 B 先分配完，汤 A 永远无法完成分配
      return 0
    }
    if (memo[i][j] === 0) {
      // 状态转移方程：
      // dp[i][j] = (dp[i-4][j] + dp[i-3][j-1] + dp[i-2][j-2] + dp[i-1][j-3]) / 4
      memo[i][j] =
        0.25 *
        (dfs(i - 4, j) +
          dfs(i - 3, j - 1) +
          dfs(i - 2, j - 2) +
          dfs(i - 1, j - 3))
    }
    return memo[i][j]
  }

  return dfs(n, n)
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = soupServings(50)
assert.equal(res1, 0.625)

const res2 = soupServings(100)
assert.equal(res2, 0.71875)
