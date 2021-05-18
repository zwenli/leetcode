/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */

function maxProfit(prices) {
  // 动态规划 转化成53.最小子序和
  const n = prices.length;
  let maxCur = 0;
  let maxSoFar = 0;
  for (let i = 1; i < n; i += 1) {
    maxCur = Math.max(0, maxCur + prices[i] - prices[i - 1]);
    maxSoFar = Math.max(maxSoFar, maxCur);
  }
  return maxSoFar;
}

// function maxProfit(prices) {
//   // 动态规划，空间优化
//   // 再优化，就是一次遍历的解法了
//   // dp(i,0) = max(dp(i-1, 0), dp(i-1, 1) + prices[i])
//   // dp(i,1) == max(dp(i-1, 1), -prices[i])
//   // dp(0,0) = 0;
//   // dp(0,1) = -prices[0];
//   // i的状态只依赖i-1，变量存i-1的状态即可
//   // 时间复杂度O(n):
//   // 空间复杂度O(1):
//   const n = prices.length;
//   if (n < 2) return 0;
//   let dp0 = 0; // 第i天不持股的现金
//   let dp1 = -prices[0]; // 第i天持股的收益
//   for (let i = 1; i < n; i += 1) {
//     dp0 = Math.max(dp0, dp1 + prices[i]);
//     dp1 = Math.max(dp1, -prices[i]);
//   }
//   return dp0;
// }

// function maxProfit(prices) {
//   // 动态规划，滚动数组
//   // dp(i,0) = max(dp(i-1, 0), dp(i-1, 1) + prices[i])
//   // dp(i,1) == max(dp(i-1, 1), -prices[i])
//   // dp(0,0) = 0;
//   // dp(0,1) = -prices[0];
//   // 时间复杂度O(n):
//   // 空间复杂度O(1): 固定2*2的数组，常量
//   const n = prices.length;
//   if (n < 2) return 0;
//   const dp = new Array(2).fill(0).map(() => new Array(2).fill(0));
//   dp[0][0] = 0;
//   dp[0][1] = -prices[0];
//   for (let i = 1; i < n; i += 1) {
//     dp[i % 2][0] = Math.max(dp[(i - 1) % 2][0], dp[(i - 1) % 2][1] + prices[i]);
//     dp[i % 2][1] = Math.max(dp[(i - 1) % 2][1], -prices[i]);
//   }
//   return dp[(n - 1) % 2][0];
// }

// function maxProfit(prices) {
//   // 动态规划
//   // f(i,0): 第i天，未持股时，手上的现金
//   // f(i,1): 第i天，持股时，手上的现金
//   // f(i,0) = max(f(i-1, 0), f(i-1, 1) + prices[i])
//   // 第i天没有持股有两种情况，i-1天没持股，没交易，i-1天持股，卖出
//   // f(i,1) == max(f(i-1, 1), -prices[i])
//   // 第i天持股有两种情况，i-1天也持股，没交易，i-1天没持股，买入
//   // 题目只能是某一天买入，f(i,1)其实也就是找出minPrice
//   // f(0,0) = 0;
//   // fi(0,1) = -prices[0];
//   const n = prices.length;
//   if (n < 2) return 0;
//   const dp = new Array(n).fill(0).map(() => new Array(2).fill(0));
//   dp[0][0] = 0;
//   dp[0][1] = -prices[0];
//   for (let i = 1; i < n; i += 1) {
//     dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
//     dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
//   }
//   return dp[n - 1][0];
// }

// function maxProfit(prices) {
//   // 递归
//   // f(i,0): 第i天，未持股时，手上的现金
//   // f(i,1): 第i天，持股时，手上的现金
//   // f(i,0) = max(f(i-1, 0), f(i-1, 1) + prices[i])
//   // 第i天没有持股有两种情况，i-1天没持股，没交易，i-1天持股，卖出
//   // f(i,1) == max(f(i-1, 1), -prices[i])
//   // 第i天持股有两种情况，i-1天也持股，没交易，i-1天没持股，买入
//   // f(0,0) = 0;
//   // fi(0,1) = -prices[0];
//   const n = prices.length;
//   const memo = new Array(n).fill(0).map(() => new Array(2).fill(null));
//   return dfs(n - 1, 0);
//   function dfs(i, stat) {
//     if (i === 0 && stat) {
//       return -prices[i];
//     }
//     if (i === 0 && !stat) {
//       return 0;
//     }
//     if (memo[i][stat] === null) {
//       memo[i][stat] = stat
//         ? Math.max(dfs(i - 1, 1), -prices[i])
//         : Math.max(dfs(i - 1, 0), dfs(i - 1, 1) + prices[i]);
//     }
//     return memo[i][stat];
//   }
// }

// function maxProfit(prices) {
//   // 一次遍历，记录最小值
//   // 时间复杂度O(n)
//   // 空间复杂度O(1)
//   if (prices.length < 2) return 0;
//   const n = prices.length;
//   let minPrice = Infinity;
//   let res = 0;
//   for (let i = 0; i < n - 1; i += 1) {
//     if (prices[i] < minPrice) {
//       minPrice = prices[i];
//     } else {
//       res = Math.max(prices[i] - minPrice, res);
//     }
//   }
//   return res;
// }

// function maxProfit(prices) {
//   // 暴力解法，超时
//   // 时间复杂度O(n^2)
//   // 空间复杂度O(1)
//   if (prices.length < 2) return 0;
//   const n = prices.length;
//   let res = 0;
//   for (let i = 0; i < n - 1; i += 1) {
//     for (let j = i + 1; j < n; j += 1) {
//       res = Math.max(res, prices[j] - prices[i]);
//     }
//   }
//   return res;
// }
// @lc code=end

const res1 = maxProfit([7, 1, 5, 3, 6, 4]);
// 5
const res2 = maxProfit([7, 6, 4, 3, 1]);
// 0

// 暴力循环
// 递归
// 动态规划
// 53. 最小子序和
// 如果将转化成每天的收益profit[i] = prices[i] - prices[i-1]
// 那么这个问题就转化成53的最小子序和了。
