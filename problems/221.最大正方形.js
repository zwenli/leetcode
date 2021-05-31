/*
 * @lc app=leetcode.cn id=221 lang=javascript
 *
 * [221] 最大正方形
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */

function maximalSquare(matrix) {
  // dp[i,j]: 表示以(i,j)为右下角，且只包含1的正方形的边长最长值。
  // 最大面积也就是最大边长的乘积
  // 动态转移方程如下
  // matrix[i,j] == 0, dp[i,j] = 0; 因为当前位置不可能在由1组成的正方形中。
  // otherwise, dp[i,j] = min(dp[i-1,j],dp[i,j-1],dp[i-1,j-1]) + 1,
  // 由左方、上方、左上方三个相邻的dp决定的。木桶的短板理论。
  // time complexity O(mn)
  // space complexity O(n)
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = new Array(n + 1).fill(0);
  let leftUp = 0; // 左上角
  let maxSide = 0;
  for (let i = 1; i <= m; i += 1) {
    // 遍历每行时重置左上角的值为0，
    leftUp = 0;
    for (let j = 1; j <= n; j += 1) {
      const nextLeftUp = dp[j];
      if (matrix[i - 1][j - 1] === '1') {
        dp[j] = 1 + Math.min(dp[j], dp[j - 1], leftUp);
        maxSide = Math.max(dp[j], maxSide);
      } else {
        dp[j] = 0;
      }
      leftUp = nextLeftUp;
    }
  }
  return maxSide * maxSide;
}

// function maximalSquare(matrix) {
//   // dp[i,j]: 表示以(i,j)为右下角，且只包含1的正方形的边长最长值。
//   // 最大面积也就是最大边长的乘积
//   // 动态转移方程如下
//   // matrix[i,j] == 0, dp[i,j] = 0; 因为当前位置不可能在由1组成的正方形中。
//   // otherwise, dp[i,j] = min(dp[i-1,j],dp[i,j-1],dp[i-1,j-1]) + 1,
//   // 由左方、上方、左上方三个相邻的dp决定的。木桶的短板理论。
//   // time complexity O(mn)
//   // space complexity O(mn)
//   const m = matrix.length;
//   const n = matrix[0].length;
//   const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
//   let maxSide = 0;
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       if (matrix[i - 1][j - 1] === '1') {
//         dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
//         maxSide = Math.max(dp[i][j], maxSide);
//       }
//     }
//   }
//   return maxSide * maxSide;
// }
// @lc code=end

const res1 = maximalSquare([
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0'],
]);
// 4

const res2 = maximalSquare([['0', '1'], ['1', '0']]);
// 1

const res3 = maximalSquare([[['0']]]);
// 0
