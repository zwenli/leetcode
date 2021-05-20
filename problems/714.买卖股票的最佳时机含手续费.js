/*
 * @lc app=leetcode.cn id=714 lang=javascript
 *
 * [714] 买卖股票的最佳时机含手续费
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */

function maxProfit(prices, fee) {
  // 动态规划，空间优化
  // time complexity O(n)
  // space complexity O(1)
  const n = prices.length;
  if (n < 2) return 0;
  let release = 0;
  let hold = -prices[0] - fee; // 每次买入就先从利润中扣除手续费
  for (let i = 1; i < n; i += 1) {
    release = Math.max(release, hold + prices[i]);
    hold = Math.max(hold, release - prices[i] - fee);
  }
  return release;
}

// function maxProfit(prices, fee) {
//   // 动态规划
//   // time complexity O(n)
//   // space complexity O(n)
//   // dp[i][0]: 没持股的最大收益
//   // dp[i][1]: 持股的最大收益
//   const n = prices.length;
//   if (n < 2) return 0;
//   const dp = new Array(n).fill(0).map(() => new Array(2).fill(0));
//   dp[0][0] = 0;
//   dp[0][1] = -prices[0] - fee; // 每次买入就先从利润中扣除手续费
//   for (let i = 1; i < n; i += 1) {
//     dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
//     dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee);
//   }
//   return dp[n - 1][0];
// }
// @lc code=end

const res1 = maxProfit([1, 3, 2, 8, 4, 9], 2);
// 8
