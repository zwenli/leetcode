/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=123 lang=javascript
 *
 * [123] 买卖股票的最佳时机 III
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */

function maxProfit(prices) {
  // 动态规划
  // time O(n)
  // space O(1)
  const n = prices.length;
  if (n < 2) return 0;
  let buy1 = -prices[0]; // 第一次买入
  let sell1 = 0; // 第一次卖出
  let buy2 = -prices[0]; // 第二次买入
  let sell2 = 0; // 第二次卖出
  for (let i = 1; i < n; i += 1) {
    buy1 = Math.max(buy1, -prices[i]);
    sell1 = Math.max(sell1, buy1 + prices[i]);
    buy2 = Math.max(buy2, sell1 - prices[i]);
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }
  // 转移方程中，其实是允许了同一天买入卖出股票，只不过因为一天的价格不变而不会对价格有影响
  // 因此最大值必然会转移到sell2
  return sell2;
}

// function maxProfit(prices) {
//   // 动态规划
//   // time O(n)
//   // space O(n)
//   const n = prices.length;
//   const dp = new Array(n).fill(0).map(() => new Array(4).fill(0));
//   dp[0][0] = -prices[0];
//   dp[0][1] = 0;
//   dp[0][2] = -prices[0]; // 初始状态是不能为此状态的，严格可以初始化为-Inifity
//   dp[0][3] = 0; // 初始状态是不能为此状态的，严格可以初始化为-Inifity
//   for (let i = 1; i < n; i += 1) {
//     dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
//     dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
//     dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] - prices[i]);
//     dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] + prices[i]);
//   }
//   // return dp[n - 1][3]; // 最大值是会转移到dp[i][3]的
//   return Math.max(dp[n - 1][1], dp[n - 1][3]);
// }

// function maxProfit(prices) {
//   // 动态规划, 这个动态规划可以继续优化为常量空间，n时间
//   // dp[k,i]: k表示交易次数，i表示天数，转移方程如下
//   // dp[k,i] = max(dp[k, i-1], prices[i] - prices[j] + dp[k-1][j-1]), j = [0, i-1]
//   // dp[k-1][j-1]也就是上次交易后收益
//   // time complexity O(kn^2)
//   // space complexity O(kn)
//   const n = prices.length;
//   if (n < 2) return 0;
//   const dp = new Array(3).fill(0).map(() => new Array(n).fill(0));
//   // k = 0，即都不交易，收益一直是零
//   for (let k = 1; k <= 2; k += 1) {
//     for (let i = 1; i < n; i += 1) {
//       let min = prices[0];
//       for (let j = 1; j < i; j += 1) {
//         min = Math.min(min, prices[j] - dp[k - 1][j - 1]);
//       }
//       dp[k][i] = Math.max(dp[k][i - 1], prices[i] - min);
//     }
//   }
//   return dp[2][n - 1];
// }
// @lc code=end

const res1 = maxProfit([3, 3, 5, 0, 0, 3, 1, 4]);
// 6
const res2 = maxProfit([1, 2, 3, 4, 5]);
// 4

/**
 * 没进行任何操作过 dp
 *   第i-天也是没操作过，可以省略这个状态
 * 买入一次 dp[i][0]
 *   第i-1天没持股，i天第一次买入，；或者第i-1天持股了，没交易
 * 卖出一次 dp[i][1]
 *   第i-1天已经卖出一次没持股，不操作；或者第i-1天持股，第i天卖出
 * 第二次买入 dp[i][2]
 *   第i-1天买入第二次持股，不操作；第i-1天已经卖出第一次没持股了，第i天买入
 * 第二次卖出 dp[i][3]
 *   第i-1天已经卖出第二次没持股了，不操作；第i-1天已经买入第二次持股了，卖出
 * dp[0][0] = -prices[0];
 * dp[0][1] = 0;
 * dp[0][2] = -prices[0];
 * dp[0][3] = 0;
 * 最后取max(0, dp[n-1][1], dp[n-1][3])
 * dp[1],dp[3]在初始化已是为0，并且在状态转移过程中维护的是最大值，
 * 因此dp[n-1][1]，dp[n-1][3]最终必大于等于0，因此0可以省略
 * max(dp[n-1][1], dp[n-1][3])
 */
