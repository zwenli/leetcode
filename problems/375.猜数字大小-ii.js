/*
 * @lc app=leetcode.cn id=375 lang=javascript
 *
 * [375] 猜数字大小 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
function getMoneyAmount(n) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0))

  for (let i = n - 1; i >= 1; i -= 1) {
    for (let j = i + 1; j <= n; j += 1) {
      // 当j = n时，如果 k = j，则k + 1 > n，dp[k+1][j]出现越界
      // 为避免出现下标越界，先令 dp[i][j] = j + dp[i][j-1]
      // 之后遍历 i <= k < j 的每个 k，更新 dp[i][j]
      dp[i][j] = j + dp[i][j - 1]
      for (let k = i; k < j; k += 1) {
        dp[i][j] = Math.min(dp[i][j], k + Math.max(dp[i][k - 1], dp[k + 1][j]))
      }
    }
  }
  return dp[1][n]
}
// @lc code=end

const assert = require('assert').strict

const res1 = getMoneyAmount(10)
assert.equal(res1, 16)

const res2 = getMoneyAmount(1)
assert.equal(res2, 0)

const res3 = getMoneyAmount(2)
assert.equal(res3, 1)
