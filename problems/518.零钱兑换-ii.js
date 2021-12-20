/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=518 lang=javascript
 *
 * [518] 零钱兑换 II
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */

function change(amount, coins) {
  // 动态规划
  // time complexity O(n * amount): n为coins的数量
  // space complexity O(n)
  // 之前的动态转移方程可以优化为
  // dp[i] = dp[i] + dp[i-coin]
  // 不参与，和i-1的组合数量一样不产生影响。
  // 参与组合，等于amount=i-coin的组合数量，在这个基础上加上这枚硬币

  // coins中的元素可以选取多次，且不用考虑元素的顺序，因此需要计算的是选取硬币的组合数。
  // 动态规划的边界是dp[0] = 1, 只有当不选取任何硬币时，金币之和才为0，因此只有1种硬币组合
  // 对于面额为coin的硬币，当 coin <= i <= amount时，如果存在一种硬币组合的金额之和为i - coin，
  // 则在该硬币组合之中增加一个面额为coin的硬币，即可得到一种金额之和为i的硬币组合。因此需要遍历coins，
  // 对于其中的每一种面额的硬币，更新数组dp中每个大于等于改面额的元素的值。
  // 因此可得带动态规划的做法：
  //  初始化dp[0] = 1
  //  遍历coins，对于其中的每一个元素coin，进行如下操作：
  //    遍历i从coin到amount，将dp[i-coin]的值累加到dp[i]
  //  最终得到的dp[amount] 就是所求的答案

  // 参考70.爬楼梯，注意循环的层次，可以这么解释, coin就是步数step
  // dp[i] = dp[i - coin1] + dp[i - coin2] + ... + dp[i-coinj]
  // 对于i金额的金额组合数量，等于子问题i-coin的金额的组合加上coin这枚硬币，也就是i-coin的组合数量
  if (!coins || !coins.length) return 0
  if (amount <= 0) return 1
  const K = coins.length
  const dp = new Array(amount + 1).fill(0)
  dp[0] = 1
  for (let k = 0; k < K; k += 1) {
    const coin = coins[k]
    // for (let i = 1; i <= amount; i += 1) {
    //   if (i < coin) continue; // 金额小于面值，组合情况不变化
    //   dp[i] += dp[i - coin];
    // }
    for (let i = coin; i <= amount; i += 1) {
      dp[i] += dp[i - coin]
    }
  }
  return dp[amount]
}
// function change(amount, coins) {
//   // 动态规划
//   // time complexity O(n * amount): n为coins的数量
//   // space complexity O(n * amount)
//   // dp[i][j]: 表示前i个面值，金额为j的组合数量
//   // i = 0 表示没有面值组合的情况，
//   // 没有硬币，或金额为0的情况：
//   // 当金额为0，只有一种组合情况0
//   // 当没有硬币的时候，如果金额为0，组合数量为1，因为只有一种方案
//   // 当金额大于0时，组合数量为0，不存在组合。
//   // 即dp[0][j] = j === 0 ? 1 : 0
//   // 当有硬币组合的情况：
//   // 1. j<coin，金额小于当前硬币的面值，不会受到该枚硬币的影响
//   //   组合数量和i-1的一样。
//   //   dp[i][j] = dp[i-1][j]
//   // 2. j>=coin, 金额大于等于硬币面值，可以使用该硬币进行组合，
//   //   分参与组合，不参与组合两种情况。不参与，和i-1的组合数量一样不产生影响。
//   //   参与组合，等于amount=j-coin的组合数量，在这个基础上加上这枚硬币，因此
//   //  dp[i][j] = dp[i-1][j] + dp[i][j-coin]
//   if (!coins || !coins.length) return 0; // 没有硬币可组合
//   if (amount <= 0) return 1; // 金额为0只有一个组合情况，不用硬币组合
//   const I = coins.length;
//   const dp = new Array(I + 1).fill(0).map(() => new Array(amount + 1).fill(0));
//   // base case
//   for (let i = 0; i <= I; i += 1) {
//     dp[i][0] = 1;
//   }
//   for (let i = 1; i <= I; i += 1) {
//     const coin = coins[i - 1];
//     for (let j = 1; j <= amount; j += 1) {
//       if (j < coin) {
//         dp[i][j] = dp[i - 1][j];
//       } else {
//         dp[i][j] = dp[i][j - coin] + dp[i - 1][j];
//       }
//     }
//   }
//   return dp[I][amount];
// }
// @lc code=end

// 相关题目 70.爬楼梯
// 背包问题，

const res1 = change(3, [2])
// 0;
const res2 = change(10, [10])
// 1
const res3 = change(5, [1, 2, 5])
// 4
const res4 = change(0, [7])
// 1
