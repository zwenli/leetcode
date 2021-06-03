/*
 * @lc app=leetcode.cn id=1277 lang=javascript
 *
 * [1277] 统计全为 1 的正方形子矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */

function countSquares(matrix) {
  // 动态规划，
  // time complexity O(mn)
  // space complexity O(n)
  const m = matrix.length;
  const n = matrix[0].length;
  let ans = 0;
  // dp[i][j], 表示以(i,j)为右下角的最大正方形边长
  // 也可以表示为以(i,j)为右下角的正方形数目
  // 计算出所有dp[i][j]后累加起来就可以得到矩阵中正方形数目了
  const dp = new Array(n + 1).fill(0);
  let leftUp;
  for (let i = 1; i <= m; i += 1) {
    leftUp = dp[0];
    for (let j = 1; j <= n; j += 1) {
      const nextLeftUp = dp[j];
      if (matrix[i - 1][j - 1] === 1) {
        dp[j] = 1 + Math.min(dp[j], dp[j - 1], leftUp);
      } else {
        dp[j] = 0;
      }
      ans += dp[j];
      leftUp = nextLeftUp;
    }
  }
  return ans;
}
// function countSquares(matrix) {
//   // 动态规划，
//   // time complexity O(mn)
//   // space complexity O(mn)
//   const m = matrix.length;
//   const n = matrix[0].length;
//   let ans = 0;
//   // dp[i][j], 表示以(i,j)为右下角的最大正方形边长
//   // 也可以表示为以(i,j)为右下角的正方形数目
//   // 计算出所有dp[i][j]后累加起来就可以得到矩阵中正方形数目了
//   // 当i == 0 || j == 0, dp[i][j] = matrix[i][j]
//   // 当 matrix[i][j] == 0, dp[i][j] = 0
//   // 其余情况, dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
//   const dp = new Array(m + 1).fill(0).map(
//     () => new Array(n + 1).fill(0)
//   );
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       if (matrix[i - 1][j - 1] === 1) {
//         dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
//       }
//       ans += dp[i][j];
//     }
//   }
//   return ans;
// }
// @lc code=end

const res1 = countSquares([
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1, 1]
]);
// 15
const res2 = countSquares([
  [1, 0, 1],
  [1, 1, 0],
  [1, 1, 0]
]);
// 7