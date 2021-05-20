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
  // 贪心
  // time complexity O(n)
  // space complexity O(1)
  const n = prices.length;
  let profit = 0;
  let buy = prices[0] + fee; // 第一次买入，加上手续费
  for (let i = 1; i < n; i += 1) {
    // buy - fee < prices[i] > buy
    //  买入                   卖出
    if (prices[i] + fee < buy) {
      // 当前股票价格prices[i]加上手续费fee，小于buy
      // 那么与其用buy的价格买入，不如用更低的价格prices[i] + fee买入，
      // 更新buy
      buy = prices[i] + fee;
    } else if (prices[i] > buy) {
      // 当前股票价格prices[i]大于buy，存在收益，
      // 直接卖出获得prices[i] - buy的收益，
      // 但实际，此时卖出股票有可能不是全局最优解，如下一天价格继续上涨，
      // 因此提供一个反悔的操作，看成手上拥有一支买入价格为prices[i]的股票，
      // 将buy更新为prices[i]。这样以来，当下一天股票继续上涨时，
      // 会获得prices[i+1] - prices[i]的收益，加上今天的收益prices[i] - buy,
      // 恰好等于今天不进行任何操作，而在下一天卖出股票的收益。
      profit += prices[i] - buy;
      buy = prices[i];
    }
    // 其他情况，prices[i]落在[buy-fee, buy]区间内的，
    // 价格没有低到需要放弃手中的股票
    // 价格也没高到卖出股票获取收益
  }
  // 上面的贪心思想可以浓缩成一句话，即当我们卖出一支股票时，我们就立即获得了以相同价格并且免除手续费买入一支股票的权利。
  return profit;
}

// function maxProfit(prices, fee) {
//   // 动态规划，空间优化
//   // time complexity O(n)
//   // space complexity O(1)
//   const n = prices.length;
//   if (n < 2) return 0;
//   let release = 0;
//   let hold = -prices[0] - fee; // 每次买入就先从利润中扣除手续费
//   for (let i = 1; i < n; i += 1) {
//     // release = Math.max(release, hold + prices[i]);
//     // hold = Math.max(hold, release - prices[i] - fee);
//     [release, hold] = [
//       Math.max(release, hold + prices[i]),
//       Math.max(hold, release - prices[i] - fee),
//     ];
//   }
//   return release;
// }

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
