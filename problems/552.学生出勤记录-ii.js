/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=552 lang=javascript
 *
 * [552] 学生出勤记录 II
 */

const { check } = require('prettier');

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

function checkRecord(n) {
  // 动态规划，空间优化
  // time complexity O(n)
  // space complexity O(1): 6个变量
  // dp(i,a,l): 长度为i，缺勤数a，连续l次迟到的可奖励出勤数量。
  // 总共有六个状态
  // dp(i,0,0)，无A，尾部无L，记为0A0L
  // dp(i,0,1), 0A1L, 如 ...PL
  // dp(i,0,2), 0A2L, eg ...PLL
  // dp(i,1,0), 1A0L, eg ...A..
  // dp(i,1,1), 1A1L, eg ...A..PL
  // dp(i,1,2), 1A2L, eg ...A..PLL
  // 最后对于n的的所有可被视为可奖励的出勤记录的数量为所有状态之和
  const MOD = 1000000007;
  let dp00 = 1;
  let dp01 = 1;
  let dp02 = 0;
  let dp10 = 1;
  let dp11 = 0;
  let dp12 = 0;
  for (let i = 1; i < n; i += 1) {
    const t00 = dp00;
    const t01 = dp01;
    const t02 = dp02;
    const t10 = dp10;
    const t11 = dp11;
    const t12 = dp12;
    // + P, 此时连续的L记录会清空，有两种状态符合转移
    // 0A0L = 0A0L + 0A1L + 0A2L
    dp00 = (t00 + t01 + t02) % MOD;
    // 1A0L = 1A0L + 1A1L + 1A2L
    dp10 = (t10 + t11 + t12) % MOD;
    // + L, L连续次数会加一
    // 0A1L = 0A0L
    dp01 = t00;
    // 0A2L = 0A1L
    dp02 = t01;
    // 1A1L = 1A0L
    dp11 = t10;
    // 1A2L = 1A1L
    dp12 = t11;
    // + A, 同理连续的L记录会清空
    // 1A0L = 0A0L + 0A1L + 0A2L
    dp10 += (t00 + t01 + t02) % MOD;
  }
  return (
    dp00 + dp01 + dp02 + dp10 + dp11 + dp12
  ) % MOD;
}
// function checkRecord(n) {
//   // 动态规划
//   // dp(i,a,l): 长度为i，缺勤数a，连续l次迟到的可奖励出勤数量。
//   // 总共有六个状态
//   // dp(i,0,0)，无A，尾部无L，记为0A0L
//   // dp(i,0,1), 0A1L, 如 ...PL
//   // dp(i,0,2), 0A2L, eg ...PLL
//   // dp(i,1,0), 1A0L, eg ...A..
//   // dp(i,1,1), 1A1L, eg ...A..PL
//   // dp(i,1,2), 1A2L, eg ...A..PLL
//   // 最后对于n的的所有可被视为可奖励的出勤记录的数量为所有状态之和
//   const MOD = 1000000007;
//   const dp = new Array(n + 1).fill(0).map(
//     () => new Array(2).fill(0).map(
//       () => new Array(3).fill(0),
//     ),
//   );
//   // base case
//   dp[1][0][0] = 1; // 'P'
//   dp[1][0][1] = 1; // 'L'
//   dp[1][1][0] = 1; // 'A'
//   for (let i = 2; i <= n; i += 1) {
//     // + P, 此时连续的L记录会清空，有两种状态符合转移
//     // 0A0L = 0A0L + 0A1L + 0A2L
//     dp[i][0][0] = (dp[i - 1][0][0] + dp[i - 1][0][1] + dp[i - 1][0][2]) % MOD;
//     // 1A0L = 1A0L + 1A1L + 1A2L
//     dp[i][1][0] = (dp[i - 1][1][0] + dp[i - 1][1][1] + dp[i - 1][1][2]) % MOD;
//     // + L, L连续次数会加一
//     // 0A1L = 0A0L
//     dp[i][0][1] = dp[i - 1][0][0];
//     // 0A2L = 0A1L
//     dp[i][0][2] = dp[i - 1][0][1];
//     // 1A1L = 1A0L
//     dp[i][1][1] = dp[i - 1][1][0];
//     // 1A2L = 1A1L
//     dp[i][1][2] = dp[i - 1][1][1];
//     // + A, 同理连续的L记录会清空
//     // 1A0L = 0A0L + 0A1L + 0A2L
//     // 1A0L状态在+P的时候已经出现过，要累加上
//     dp[i][1][0] += (dp[i - 1][0][0] + dp[i - 1][0][1] + dp[i - 1][0][2]) % MOD;
//   }
//   return (
//     dp[n][0][0]
//     + dp[n][0][1]
//     + dp[n][0][2]
//     + dp[n][1][0]
//     + dp[n][1][1]
//     + dp[n][1][2]
//   ) % MOD;
// }

// function checkRecord(n) {
//   // 递归+剪枝，会超时
//   // time complexity O(n^3)
//   // space complexity O(n^n): 递归树最深n层，每个节点包含n长的字符串
//   let ans = 0;
//   dfs('');
//   return ans;
//   function dfs(str) {
//     if (str.length === n) {
//       ans += 1;
//       // console.log(str);
//       return;
//     }
//     dfs(`${str}P`);
//     if (str.indexOf('A') === -1) dfs(`${str}A`);
//     if (!(str.length >= 2 && str[str.length - 1] === 'L' && str[str.length - 2] === 'L')) {
//       dfs(`${str}L`);
//     }
//   }
// }
// @lc code=end

const res1 = checkRecord(2);
// 8
const res2 = checkRecord(3);
// 19

// 递归 + 剪枝
// 动态规划
