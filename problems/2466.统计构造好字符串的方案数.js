/*
 * @lc app=leetcode.cn id=2466 lang=javascript
 *
 * [2466] 统计构造好字符串的方案数
 */

// @lc code=start

/**
 * 
 * @param {number} low 
 * @param {number} high 
 * @param {number} zero 
 * @param {number} one 
 * @returns {number}
 */
function countGoodStrings(low, high, zero, one) {
  const dp = new Array(high + 1).fill(0)
  dp[0] = 1
  const MOD = 10**9 + 7
  let res = 0
  for (let i = 1; i <= high; i++) {
    if (i - zero >= 0) {
      dp[i] = dp[i] + dp[i - zero] % MOD
    }
    if (i - one >= 0) {
      dp[i] = dp[i] + dp[i - one] % MOD
    }
    if (i >= low && i <= high) {
      res = (res + dp[i]) % MOD
    }
  }
  return res
};
// @lc code=end
