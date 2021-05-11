/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */

function longestCommonSubsequence(text1, text2) {
  // 动态规划
  // 观察转移方程可知，当前状态只依赖上，左，左上的状态
  // 时间复杂度O(mn):
  // 空间复杂度O(n): O(n)
  const m = text1.length;
  const n = text2.length;
  // 加1是处理空字符串的情况
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i += 1) {
    let upLeft = dp[0]; // 表示左上角的值，因为在计算前一列的时候会被覆盖, 需要在被覆盖之前保存下旧值。
    for (let j = 1; j <= n; j += 1) {
      const tmp = dp[j]; // 记录未被覆盖的dp[j]，它会在计算dp[j+1]时作为upLeft用到
      if (text1[i - 1] === text2[j - 1]) {
        dp[j] = 1 + upLeft;
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }
      upLeft = tmp; // 更新upLeft
    }
  }
  return dp[n];
}
// function longestCommonSubsequence(text1, text2) {
//   // 动态规划
//   // 观察转移方程可知，当前状态只依赖上，左，左上的状态
//   // 时间复杂度O(mn):
//   // 空间复杂度O(n): O(2n)
//   const m = text1.length;
//   const n = text2.length;
//   // 加1是处理空字符串的情况
//   let prev = new Array(n + 1).fill(0);
//   let cur = new Array(n + 1).fill(0);
//   // TODO: 还以在优化，有upLeft记录旧的左上角数据，
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       if (text1[i - 1] === text2[j - 1]) {
//         cur[j] = 1 + prev[j - 1];
//       } else {
//         cur[j] = Math.max(prev[j], cur[j - 1]);
//       }
//     }
//     // swap
//     prev = cur;
//     cur = new Array(n + 1).fill(0);
//   }
//   return prev[n];
// }

// function longestCommonSubsequence(text1, text2) {
//   // 动态规划
//   // LCS(i,j)表示字符串S1[0,i]和S2[0,j]的最长公共子序列
//   // 状态转移方程如下：
//   // when i = 0 or j = 0, LCS(i,j) = 0, 也就是空字符串的公共子序列为0
//   // when s1[i] = s2[j], LCS(i,j) = 1 + LCS(i-1, j-1)
//   // otherwise, LCS(i,j) = max(LCS(i-1,j), LCS(i,j-1))
//   // 时间复杂度O(mn):
//   // 空间复杂度O(n): O(2n)
//   const m = text1.length;
//   const n = text2.length;
//   // 加1是处理空字符串的情况
//   const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       if (text1[i - 1] === text2[j - 1]) {
//         dp[i][j] = 1 + dp[i - 1][j - 1];
//       } else {
//         dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
//       }
//     }
//   }
//   return dp[m][n];
// }

// function longestCommonSubsequence(text1, text2) {
//   // 递归，自顶向下
//   // 时间复杂度O(mn):
//   // 空间复杂度O(mn):
//   const m = text1.length;
//   const n = text2.length;
//   const memo = new Array(m).fill(0).map(() => new Array(n).fill(0));
//   return dfs(m - 1, n - 1);
//   function dfs(i, j) {
//     // 空字符串，返回0
//     if (i < 0 || j < 0) return 0;
//     if (!memo[i][j]) {
//       if (text1[i] === text2[j]) {
//         memo[i][j] = 1 + dfs(i - 1, j - 1);
//       } else {
//         memo[i][j] = Math.max(dfs(i - 1, j), dfs(i, j - 1));
//       }
//     }
//     return memo[i][j];
//   }
// }
// @lc code=end

const res1 = longestCommonSubsequence('abcde', 'ace');
// 3
const res2 = longestCommonSubsequence('abc', 'abc');
// 3
const res3 = longestCommonSubsequence('abc', 'def');
// 0
const res4 = longestCommonSubsequence('abcba', 'abcbcba');
// 5

// 递归+缓存
// 动态规划
