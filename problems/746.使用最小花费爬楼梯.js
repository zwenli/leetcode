/*
 * @lc app=leetcode.cn id=746 lang=javascript
 *
 * [746] 使用最小花费爬楼梯
 */

// @lc code=start
/**
 * @param {number[]} cost
 * @return {number}
 */
function minCostClimbingStairs(cost) {
  const n = cost.length
  const dp = new Array(n + 1).fill(0)
  dp[0] = 0
  dp[1] = 0
  for (let i = 2; i <= n; i += 1) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }
  return dp[n];
}
// @lc code=end

const assert = require('assert').strict

const res1 = minCostClimbingStairs([10, 15, 20])
assert.equal(res1, 15)

const res2 = minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])
assert.equal(res2, 6)

/**

dp[i]: 表示到第i个台阶时的最低花费,
到达第i个台阶，只能从第i-1、或者i-2的台阶上来，
dp[i] = Math.min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])

dp[0] = 0
dp[1] = 0
 */
