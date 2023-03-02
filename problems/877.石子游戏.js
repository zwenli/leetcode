/*
 * @lc app=leetcode.cn id=877 lang=javascript
 *
 * [877] 石子游戏
 */

// @lc code=start
/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
  // 和 486.预测赢家 是一样的
  const n = piles.length
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < n; i++) {
    dp[i][i] = piles[i]
  }
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      // i < j, 当前玩家可以选择取走 piles[i]，piles[j]
      // 然后轮到另一个玩家在剩下的石子堆中取走石子。
      // 在两种方案中，当前玩家会选择最优的方案，使得自己的石子数量最大化。
      dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
    }
  }
  return dp[0][n - 1] >= 0
}
// @lc code=end

const assert = require('node:assert')

const res1 = stoneGame([3, 7, 2, 3])
assert.equal(res1, true)

const res2 = stoneGame([5, 3, 4, 5])
assert.equal(res2, true)
