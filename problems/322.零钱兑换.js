/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

function coinChange(coins, amount) {
  // 3. 动态规划，
  // 时间复杂度O(Sn): S为金额，n为面值数。一共需要计算O(S)个状态,
  // 每个状态需要枚举n个面值来转移状态，共需要O(Sn)。
  // 空间复杂度O(S): dp数组需要O(S)长的空间。
  if (!coins || !coins.length) return -1;
  if (amount < 1) return 0;
  const dp = new Array(amount + 1).fill(Infinity);
  // F(i) = min(F(i - C0), .. F(i - Cj) .. F(i - Cn-1)) + 1
  // F(0) = 0;
  // F(i) 表示组成金额i所需的最小硬币数量，Cj表示第j枚硬币的面值，
  // 那么需要从i-Cj这个金额状态F(i-Cj)转移过来，再算上枚举的这枚硬币数量1的贡献，
  // 由于要硬币数量最小的，所以F(i)为前面能转移过来的状态的最小值加上枚举的硬币数量1
  dp[0] = 0; // base case
  for (let i = 0; i <= amount; i += 1) {
    for (const coin of coins) {
      // 面值没有超过金额才能兑换，转移
      if (coin <= i) {
        dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// function coinChange(coins, amount) {
//   // 2. 贪心 贪心在这里不适用，硬币不是倍数关系，
//   // 如: [10, 5, 1]这类适用
//   // [10,7,1] 这类就不适用了，如果是14， 7+7是最优的，但是按贪心的话，会算出10 + 1 + 。。。 + 1

//   // WA: [186,419,83,408], 6249
//   // 时间复杂度O(n): n为数组长度，只遍历一次
//   // 空间复杂度O(1): 只需要常量的变量空间
//   if (!coins || !coins.length) return -1; // 没有硬币
//   if (!amount) return 0; // 无需兑换
//   coins.sort((a, b) => b - a);
//   let ans = 0;
//   let rest = amount;
//   // 硬币从大到小尝试兑换
//   for (const coin of coins) {
//     // 对改硬币尝试最多能用多少兑换，
//     const num = Math.floor(rest / coin);
//     if (num > 0) {
//       // 如果可以兑换，累加次数，将剩下的用下个硬币兑换
//       ans += num;
//       rest -= num * coin;
//     }
//     if (rest === 0) {
//       // 剩余为0，说明可以兑换
//       return ans;
//     }
//   }
//   return -1;
// }

// function coinChange(coins, amount) {
//   // dfs加缓存
//   // 时间复杂度O(Sn): S为金额，n为面值数。一共需要计算S个状态的答案
//   // 每个状态F(S) 由于上面的记忆化的措施只计算了一次，而计算一个状态的答案需要枚举n个面值
//   // 空间复杂度O(S): 需要长为S的数组存储计算出来的答案F(S)。
//   if (!coins || !coins.length) return -1;
//   if (amount < 1) return 0;
//   return dfs(coins, amount, new Array(amount));

//   function dfs(coins, remain, count) {
//     if (remain < 0) return -1; // 剩余零钱为负数，说明无法兑换
//     if (remain === 0) return 0;
//     if (count[remain - 1]) return count[remain - 1]; // 如果有缓存，直接返回
//     // F(S)表示组成金额S所需的最小硬币数量
//     // [C0, ..., Cn-1]表示可选的n枚硬币的面值
//     // 假设知道F(S)，即组成金额S的最小硬币数量，最后一枚的硬币面值为C，那么转移方程式如下：
//     // F(S) = F(S-C) + 1
//     // 因为不知道最后一枚硬币的面值是多少，需要枚举每个硬币面值，找出最小值。
//     let min = Infinity;
//     for (const coin of coins) {
//       const res = dfs(coins, remain - coin, count);
//       if (res >= 0 && res < min) {
//         min = res + 1;
//       }
//     }
//     count[remain - 1] = min === Infinity ? -1 : min;
//     return count[remain - 1];
//   }
// }

// function coinChange(coins, amount) {
//   // 1. dfs, 会超时, 加上剪枝也是会超时
//   if (!coins || !coins.length) return -1;
//   if (amount === 0) return 0;
//   coins.sort((a, b) => b - a); // 排序，优先处理大的

//   let minCnt = Infinity;
//   dfs(0, 0);
//   return minCnt === Infinity ? -1 : minCnt;

//   function dfs(cur, cnt) {
//     if (cur === amount) {
//       minCnt = Math.min(cnt, minCnt);
//       return;
//     }
//     if (cur > amount) return;
//     // 已经超过当前最小的兑换，无需继续处理了
//     if (cnt + 1 >= minCnt) return;
//     for (const coin of coins) {
//       dfs(cur + coin, cnt + 1);
//     }
//   }
// }
// @lc code=end

const res1 = coinChange([1, 2, 5], 11); // 3

const res2 = coinChange([2], 3); // -1

const res3 = coinChange([1], 0); // 0

const res4 = coinChange([1], 1); // 1

const res5 = coinChange([1], 2); // 2

// 1. 暴力搜索（回溯，dfs）会超时的
// TODO: bfs，一个遇到0的对应的层级就是ans
// 2. 贪心
// 3. 动态规划

// S为总金额，Ci表示第i枚硬币的面值，Xi表示面值为Ci的硬币数量，
// 由于Ci*Xi不能超过S，可以得出Xi的最多不会超过[S/Ci], 即取值范围为[0, S/Ci]
// 一个简答的办法就是通过回溯，枚举每个硬币的数量子集[X0, .. Xn-1]
// 针对给定的子集计算它们组成的金额数，如果金额数为S，则记录返回合法硬币总数的最小值，反之返回 -1
