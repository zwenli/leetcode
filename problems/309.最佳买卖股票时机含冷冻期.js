/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 最佳买卖股票时机含冷冻期
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */

function maxProfit(prices) {
  // 动态规划
  // time complexity O(n):
  // space ccomplexity O(1): O(3)
  const n = prices.length;
  if (n < 2) return 0;
  let release = 0; // 不持股
  let hold = -prices[0]; // 持股，
  let cool = 0; // 冷冻期
  for (let i = 1; i < n; i += 1) {
    // 第i-1可能是未持股，或者是冷冻期
    const nr = Math.max(release, cool);
    // i-1天持股，不交易；i-1天未持股，i买入，
    const nh = Math.max(hold, release - prices[i]);
    // i-1天持股，i卖出
    const nc = hold + prices[i];
    release = nr;
    hold = nh;
    cool = nc;
  }
  return Math.max(release, cool);
}
// function maxProfit(prices) {
//   // 动态规划
//   // time complexity O(n):
//   // space ccomplexity O(n): O(3n)
//   const n = prices.length;
//   if (n < 2) return 0;
//   const dp = new Array(n).fill(0).map(() => new Array(3).fill(0));
//   dp[0][0] = 0; // 不持股
//   dp[0][1] = -prices[0]; // 持股，
//   dp[0][2] = 0; // 冷冻期
//   for (let i = 1; i < n; i += 1) {
//     // 第i-1可能是未持股，或者是冷冻期
//     dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2]);
//     // i-1天持股，不交易；i-1天未持股，i买入，
//     dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
//     // i-1天持股，i卖出
//     dp[i][2] = dp[i - 1][1] + prices[i];
//   }
//   return Math.max(dp[n - 1][0], dp[n-1][2]);
// }
// @lc code=end

const res1 = maxProfit([1, 2, 3, 0, 2]);
// 3
const res2 = maxProfit([2, 1]);
// 0

// 三种状态
// 未持股，持股，冷冻期
// dp0, dp1, dp2
// dp0 = max(dp0, dp2) 第i-1可能是未持股股，或者是冷冻期
// dp1 = max(dp1, dp0 - prices[i])，i-1天持股，不交易；i-1天未持股，i买入，
// dp2 = dp1 + prices[i]，只能是i-1天持股，i卖出
// 返回dp0
