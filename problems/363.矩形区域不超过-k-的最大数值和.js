/*
 * @lc app=leetcode.cn id=363 lang=javascript
 *
 * [363] 矩形区域不超过 K 的最大数值和
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

function maxSumSubmatrix(matrix, k) {
  // 动态规划，优化空间，dp[i2][j2]只依赖dp[i2-1][j2],dp[i2][j2-1],dp[i2-1][j2-1]
  // time complexity O(n^2m^2)
  // space complexity O(nm)
  const m = matrix.length;
  const n = matrix[0].length;
  let ans = -Infinity;
  for (let i1 = 1; i1 <= m; i1 += 1) {
    for (let j1 = 1; j1 <= n; j1 += 1) {
      const dp = new Array(n + 1).fill(0);
      for (let i2 = i1; i2 <= m; i2 += 1) {
        let letfUp = dp[j1 - 1];
        for (let j2 = j1; j2 <= n; j2 += 1) {
          const nextLeftUp = dp[j2];
          dp[j2] = dp[j2] + dp[j2 - 1] - letfUp + matrix[i2 - 1][j2 - 1]
          if (dp[j2] <= k && dp[j2] > ans) {
            ans = dp[j2]
          }
          letfUp = nextLeftUp;
        }
      }
    }
  }
  return ans;
}
// function maxSumSubmatrix(matrix, k) {
//   // 动态规划，优化空间, 每次左上角(i1,j1)更换之后，之前记录的值都没有用了，
//   // 只需要记录(i2, j2)右下角的值就好了
//   // time complexity O(n^2m^2)
//   // space complexity O(nm)
//   const m = matrix.length;
//   const n = matrix[0].length;
//   let ans = -Infinity;
//   for (let i1 = 1; i1 <= m; i1 += 1) {
//     for (let j1 = 1; j1 <= n; j1 += 1) {
//       const dp = new Array(m+1).fill(0).map(
//         () => new Array(n + 1).fill(0)
//       )
//       dp[i1][j1] = matrix[i1-1][j1-1];
//       for (let i2 = i1; i2 <= m; i2 += 1) {
//         for (let j2 = j1; j2 <= n; j2 += 1) {
//           dp[i2][j2] = dp[i2 - 1][j2] + dp[i2][j2-1]
//           - dp[i2-1][j2-1] + matrix[i2-1][j2-1]
//           if (dp[i2][j2] <= k && dp[i2][j2] > ans) {
//             ans = dp[i2][j2]
//           }
//         }
//       }
//     }
//   }
//   return ans;
// }
// function maxSumSubmatrix(matrix, k) {
//   // 动态规划，会超出内存限制
//   // time complexity O(n^2m^2)
//   // space complexity O(n^2m^2)
//   const m = matrix.length;
//   const n = matrix[0].length;
//   let ans = -Infinity;
//   const dp = new Array(m+1).fill(0).map(
//     () => new Array(n + 1).fill(0).map(
//       () => new Array(m + 1).fill(0).map(
//         () => new Array(n + 1).fill(0)
//       )
//     )
//   )
//   for (let i1 = 1; i1 <= m; i1 += 1) {
//     for (let j1 = 1; j1 <= n; j1 += 1) {
//       dp[i1][j1][i1][j1] = matrix[i1-1][j1-1];
//       for (let i2 = i1; i2 <= m; i2 += 1) {
//         for (let j2 = j1; j2 <= n; j2 += 1) {
//           dp[i1][j1][i2][j2] = dp[i1][j1][i2 - 1][j2] + dp[i1][j1][i2][j2-1]
//           - dp[i1][j1][i2-1][j2-1] + matrix[i2-1][j2-1]
//           if (dp[i1][j1][i2][j2] <= k && dp[i1][j1][i2][j2] > ans) {
//             ans = dp[i1][j1][i2][j2]
//           }
//         }
//       }
//     }
//   }
//   return ans;
// }
// @lc code=end

// dp[i1, j1, i2, j2] 表示 [i1,j1]到[i2,j2]的矩阵区域的和
// dp[i1, j1, i2, j2] = dp[i1, j1, i2-1, j2] + dp[i1, j1, i2, j2-1]
//                      - dp[i1, j1, i2-1, j2-1] + matrix[i2][j2]

const res1 = maxSumSubmatrix([
  [1, 0, 1],
  [0, -2, 3]
], 2);
// 2
const res2 = maxSumSubmatrix([
  [2, 2, -1]
], 3);
// 3
const res3 = maxSumSubmatrix([
  [2, 2, -1]
], 0);
// -1
const res4 = maxSumSubmatrix([
  [2, 2, -1]
], 2);
// 2