/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */

// function maxProfit(prices) {
//   // 1. 贪心算法，只要当前比前一天涨，就可理解为卖出，累加进利润
//   // 计算过程并不是真正的交易过程，不允许当前买和卖同时进行的
//   // 时间复杂度O(n)
//   // 空间复杂度O(1)
//   let profit = 0;
//   if (!prices || prices.length < 2) return profit;
//   for (let i = 1; i < prices.length; i += 1) {
//     if (prices[i] > prices[i - 1]) {
//       profit += prices[i] - prices[i - 1];
//     }
//   }
//   return profit;
// }

// function maxProfit(prices) {
//   // 2. 动态规划，
//   // 时间复杂度O(n): n为数组长度，一共有2n的状态，每次状态转移的时间复杂度为O(1)。故总时间复杂度为O(2n)。
//   // 空间复杂度O(n): 需要O(n)的空间存储状态
//   if (!prices || prices.length < 2) return 0;
//   const n = prices.length;
//   const dp = new Array(n).fill(null).map(() => new Array(2).fill(null));
//   dp[0][0] = 0;
//   dp[0][1] = -prices[0]; // base case
//   for (let i = 1; i < n; i += 1) {
//     // dp[i][0]表示第i天交易后，手里没有股票的最大利润
//     // 如果这天交易后没有股票，可能是前一天已经没持有股票dp[i-1][0]，
//     // 或者是前一天结束时持有股票dp[i-1][1]，这时将股票卖出，获取prices[i]的收益。
//     dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
//     // dp[i][1]表示第i天交易后，手里有一支股票的最大利润
//     // 如果这天交易后持有一支股票，可能是前一天已经持有股票dp[i-1][1]
//     // 或者是前一天结束时没持有股票dp[i-1][0]，这时将其买入，减少prices[i]的收益。
//     dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
//   }
//   // 由于全部交易后，持有股票的收益一定低于没持有股票的收益，
//   // 因此dp[n-1][0]必然大于dp[n-1][1]，dp[n - 1][0]即为所求的最后答案
//   return dp[n - 1][0];
// }

function maxProfit(prices) {
  // 2. 动态规划，对空间的优化，由于第i天的状态只依赖i-1天，保存前一天状态即可
  // 时间复杂度O(n): n为数组长度，一共有2n的状态，每次状态转移的时间复杂度为O(1)。故总时间复杂度为O(2n)。
  // 空间复杂度O(1):
  if (!prices || prices.length < 2) return 0;
  const n = prices.length;
  let dp0 = 0;
  let dp1 = -prices[0]; // base case
  for (let i = 1; i < n; i += 1) {
    // dp[i][0]表示第i天交易后，手里没有股票的最大利润
    // 如果这天交易后没有股票，可能是前一天已经没持有股票dp[i-1][0]，
    // 或者是前一天结束时持有股票dp[i-1][1]，这时将股票卖出，获取prices[i]的收益。
    const newDp0 = Math.max(dp0, dp1 + prices[i]);
    // dp[i][1]表示第i天交易后，手里有一支股票的最大利润
    // 如果这天交易后持有一支股票，可能是前一天已经持有股票dp[i-1][1]
    // 或者是前一天结束时没持有股票dp[i-1][0]，这时将其买入，减少prices[i]的收益。
    const newDp1 = Math.max(dp1, dp0 - prices[i]);
    dp0 = newDp0;
    dp1 = newDp1;
  }
  // 由于全部交易后，持有股票的收益一定低于没持有股票的收益，
  // 因此dp[n-1][0]必然大于dp[n-1][1]，dp[n - 1][0]即为所求的最后答案
  return dp0;
}
// @lc code=end

const res1 = maxProfit([7, 1, 5, 3, 6, 4]); // 7
const res2 = maxProfit([1, 2, 3, 4, 5]); // 4

// 1. 贪心算法
// 2. 动态规划
// 3. 暴力搜索（回溯）会超时
