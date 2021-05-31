/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

function minPathSum(grid) {
  // 动态规划，空间优化
  // dp[j] = grid[i][j] + min(dp[j], dp[j-1])
  // 边界情况
  // dp[0] = grid[0][0];
  // i = 0时，dp[j] = grid[0][j] + dp[j-1]
  // i > 0时，dp[0] = grid[i][0] + dp[0];
  // time complexity O(mn)
  // space complexity O(n)
  const m = grid.length;
  const n = grid[0].length;
  const dp = new Array(n + 1).fill(Infinity);
  dp[1] = 0;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      dp[j] = grid[i - 1][j - 1] + Math.min(dp[j], dp[j - 1]);
    }
  }
  return dp[n];
}

// function minPathSum(grid) {
//   // 动态规划，滚动数组
//   // dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
//   // 边界情况
//   // dp[0][0] = grid[0][0]
//   // dp[0][j] = grid[0][j] + dp[0][j-1]
//   // dp[i][0] = grid[i][0] + dp[i-1][0]
//   // time complexity O(mn)
//   // space complexity O(mn)
//   const m = grid.length;
//   const n = grid[0].length;
//   const dp = new Array(2).fill(0).map(() => new Array(n + 1).fill(Infinity));
//   dp[0][1] = 0;
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       dp[i % 2][j] = grid[i - 1][j - 1]
//         + Math.min(dp[(i - 1) % 2][j], dp[i % 2][j - 1]);
//     }
//   }
//   return dp[m % 2][n];
// }

// function minPathSum(grid) {
//   // 动态规划
//   // dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
//   // 边界情况
//   // i = 0 && j = 0, dp[0][0] = grid[0][0]
//   // i = 0 && j > 0, dp[0][j] = grid[0][j] + dp[0][j-1]
//   // i > 0 && j = 0, dp[i][0] = grid[i][0] + dp[i-1][0]
//   // time complexity O(mn)
//   // space complexity O(mn)
//   const m = grid.length;
//   const n = grid[0].length;
//   const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(Infinity));
//   dp[0][1] = 0;
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       dp[i][j] = grid[i - 1][j - 1] + Math.min(dp[i - 1][j], dp[i][j - 1]);
//     }
//   }
//   return dp[m][n];
// }
// @lc code=end

const res1 = minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]);
// 7
const res2 = minPathSum([[1, 2, 3], [4, 5, 6]]);
// 12
const res3 = minPathSum([[1, 2], [5, 6], [1, 1]]);
// 8
