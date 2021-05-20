/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=188 lang=javascript
 *
 * [188] 买卖股票的最佳时机 IV
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */

// function maxProfit(k, prices) {
//   // 动态规划
//   // time complexity O(kn)
//   // space complexity O(1)
//   const n = prices.length;
//   if (n < 2) return 0;
//   k = Math.min(k, Math.floor(n / 2));
//   const sell = new Array(k + 1).fill(0);
//   const buy = new Array(k + 1).fill(-prices[0]);
//   // base case, 创建时顺便完成了
//   for (let i = 1; i < n; i += 1) {
//     for (let j = 1; j <= k; j += 1) {
//       // 一般情况下是要加上临时变量取存储状态，防止上一个状态值被改写了，
//       // 这里就是 buy[j] -> buy[i][j] = max(buy[i-1][j], sell[i-1][j-1] - prices[i])
//       // 而sell[j - 1] 在已经是变成状态sell[i][j-1]，状态已经被改写了
//       // 但是这里结果不影响，证明过程略，看不懂。。。
//       sell[j] = Math.max(sell[j], buy[j] + prices[i]);
//       buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
//     }
//   }
//   return sell[k];
// }

// function maxProfit(k, prices) {
//   // 动态规划
//   const n = prices.length;
//   if (n < 2) return 0;
//   k = Math.min(k, Math.floor(n / 2));
//   // sell[i][j]: 第i天时，已完成j次交易，已卖出手里没有有持股，此时的最大收益
//   const sell = new Array(n).fill(0).map(() => new Array(k + 1).fill(0));
//   // buy[i][j]: 第i天时，恰好在进行第j次交易，买入了手里有持股，此时的最大收益
//   const buy = new Array(n).fill(0).map(() => new Array(k + 1).fill(0));
//   // base case
//   for (let j = 0; j <= k; j += 1) {
//     sell[0][j] = 0; // 第一天是无法卖出交易的，因此利润为0
//     buy[0][j] = -prices[0]; // 第一天买入，利润为负
//   }
//   for (let i = 1; i < n; i += 1) {
//     for (let j = 1; j <= k; j += 1) {
//       // 前一天已经卖出，已完成j次交易操作，今天不操作
//       // 或者 前一天有持股，正在进行第j次交易，今天卖出
//       sell[i][j] = Math.max(sell[i - 1][j], buy[i - 1][j] + prices[i]);
//       // 前一天已经买入，正在进行第j次交易，今天不操作
//       // 或者 前一天已经卖出，完成了j-1次交易，今天买入
//       buy[i][j] = Math.max(buy[i - 1][j], sell[i - 1][j - 1] - prices[i]);
//     }
//   }
//   return sell[n - 1][k];
// }

function maxProfit(k, prices) {
  // 动态规划，通用解法，可以用来处理各种买卖股票的问题。
  // 问题中有三个状态，一是天数i，二是允许交易的最大次数
  // 三是当前持有状态，0表示没持有，1表示持有，状态如下：
  // dp[i][k][0], dp[i][k][1]
  // (PS: 买入-卖出为完成一次交易，)
  // 状态转移方程：
  // dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]); // rest or sell
  //  今天我没有持有股票，有两种情况：
  //  1. 昨天我没持股，然后今天选择不操作，rest，所以我今天还是没持股
  //  2. 昨天我有持股，然后今天选择卖出，sell，所以我今天没持股了
  // dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]); // rest or buy
  //  今天我持股，有两种情况
  //  1. 昨天我持股，然后今天选择不操作，rest，所以我今天还是持股了
  //  2. 昨天我没持股，然后今天选择买入，buy，所以我今天持股了。
  // 注意base case
  // 因为第1天（i = 0）是无法卖出的，所以利润为0
  // dp[0][k][0] = 0
  // 第一天就买入股票的化（k = 1），利润是负数的
  // 其余k情况，第一天就有多笔交易，状态是不合法的，设置个-Infinity表示不合法状态，
  // 这里都设置成 -prieces[0]，也没问题。
  // dp[0][1][1] = -prieces[0];
  // 拓展： 对于冷冻期，手续费的处理
  // 冷冻期的话，假如冷冻期为1天，那么动态转移方程为：
  // 卖完需要间隔一天后才能再买入，那么就从i-2的状态转移即可
  // dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
  // dp[i][k][1] = max(dp[i-1][k][1], dp[i-2][k-1][0] - prices[i]);
  // 手续费，在买入的时候，顺便从利润中扣除手续费即可
  // dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
  // dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i] - fee);
  const n = prices.length;
  if (n < 2) return 0;
  // 最大可交易次数k是不能超过n/2，天数的一半，多处的是无意义的，也无法发起多余的交易
  // TODO：其实如果k>n/2，就相当于不限次数交易，用贪心更快
  k = Math.min(k, Math.floor(n / 2));
  const dp = new Array(n).fill(0).map(
    () => new Array(k + 1).fill(0).map(
      () => new Array(2).fill(0),
    ),
  );
  // base case
  for (let j = 0; j <= k; j += 1) {
    dp[0][j][0] = 0; // 不持有
    dp[0][j][1] = -prices[0]; // 持有
  }
  for (let i = 1; i < n; i += 1) {
    for (let j = 1; j <= k; j += 1) {
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
    }
  }
  // 最后一天没持有的收益肯定比持有的收益高，
  return dp[n - 1][k][0];
}

// ----------
// function maxProfit(k, prices) {
//   // 动态规划
//   // time complexity O(k*n)
//   // space complexity O(k*n)
//   // const n = prices.length;
//   // if (n < 2) return 0;
//   // const dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0));
//   // const min = new Array(k + 1).fill(prices[0]);
//   // for (let i = 1; i < n; i += 1) {
//   //   for (let ki = 1; ki <= k; ki += 1) {
//   //     min[ki] = Math.min(min[ki], prices[i] - dp[ki - 1][i - 1]);
//   //     dp[ki][i] = Math.max(dp[ki][i - 1], prices[i] - min[ki]);
//   //   }
//   // }
//   // return dp[k][n - 1];
//   // 动态规划
//   // time complexity O(k*n)
//   // space complexity O(k)
//   const n = prices.length;
//   if (n < 2) return 0;
//   const dp = new Array(k + 1).fill(0);
//   const min = new Array(k + 1).fill(prices[0]);
//   for (let i = 1; i < n; i += 1) {
//     for (let ki = 1; ki <= k; ki += 1) {
//       min[ki] = Math.min(min[ki], prices[i] - dp[ki - 1]);
//       dp[ki] = Math.max(dp[ki], prices[i] - min[ki]);
//     }
//   }
//   return dp[k];
// }
// function maxProfit(k, prices) {
//   // 动态规划
//   // time complexity O(k*n)
//   // space complexity O(k*n)
//   const n = prices.length;
//   if (n < 2) return 0;
//   const dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0));
//   for (let ki = 1; ki <= k; ki += 1) {
//     let min = prices[0];
//     for (let i = 1; i < n; i += 1) {
//       min = Math.min(min, prices[i] - dp[ki - 1][i - 1]);
//       dp[ki][i] = Math.max(dp[ki][i - 1], prices[i] - min);
//     }
//   }
//   return dp[k][n - 1];
// }
// function maxProfit(k, prices) {
//   // 动态规划
//   // time complexity O(k*n^2)
//   // space complexity O(k*n)
//   const n = prices.length;
//   if (n < 2) return 0;
//   const dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0));
//   for (let ki = 1; ki <= k; ki += 1) {
//     for (let i = 1; i < n; i += 1) {
//       let min = prices[0];
//       for (let j = 1; j < i; j += 1) {
//         min = Math.min(min, prices[j] - dp[ki - 1][j - 1]);
//       }
//       dp[ki][i] = Math.max(dp[ki][i - 1], prices[i] - min);
//     }
//   }
//   return dp[k][n - 1];
// }
// @lc code=end

const res5 = maxProfit(2, [3, 3, 5, 0, 0, 3, 1, 4]);
// 6
const res4 = maxProfit(2, [1, 2, 4]);
// 3
const res1 = maxProfit(2, [2, 4, 1]);
// 2
const res2 = maxProfit(2, [3, 2, 6, 5, 0, 3]);
// 7
const res3 = maxProfit(1, [2, 1]);
// 0

// --
// buy[i][j] 第i天时，恰好在进行第j次交易，且手里有持股，此时的最大收益
// sell[i][j] 第i天是，恰好在进行第j次交易，且手里没持股，此时的最大收益
// buy[i][j] = Math.max(buy[i-1][j], sell[i-1][j-1] - prices[i]);
// sell[i][j] = Math.max(sell[i-1][j], buy[i-1][j] + prices[j]);
// sell[0][k] = 0;
// buy[0][k] = -prices[0];

// ---
// dp[k][i] 第i天，第k次交易时的最大收益
// 有两种情况
// 第k次交易，第i天不交易，利益延续i-1天的
// 第k次交易，在j天买入，i天卖出，（j < i），加上第k-1次交易，j-1天时的收益
// dp[k][i] = Math.max(dp[k][i-1], prices[i]-prices[j]+dp[k-1][j-1]), j = [0, i-1]
// dp[0][i] = 0, 表示都不进行交易
