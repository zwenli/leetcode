/*
 * @lc app=leetcode.cn id=1137 lang=javascript
 *
 * [1137] 第 N 个泰波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

function tribonacci(n) {
  if (n === 0) return 0
  if (n === 1 || n === 2) return 1
  const dp = new Array(n + 1).fill(0)
  dp[0] = 0
  dp[1] = 1
  dp[2] = 1
  for (let i = 3; i <= n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3]
  }
  return dp[n]
}
// @lc code=end

const assert = require('assert').strict;

const res1 = tribonacci(4);
assert.equal(res1, 4);

const res2 = tribonacci(25);
assert.equal(res2, 1389537);