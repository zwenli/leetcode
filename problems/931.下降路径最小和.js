/*
 * @lc app=leetcode.cn id=931 lang=javascript
 *
 * [931] 下降路径最小和
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */
function minFallingPathSum(matrix) {
  // dp 空间优化
  const n = matrix.length
  let dp = [...matrix[0]]
  let next
  for (let i = 1; i < n; i += 1) {
    next = [...matrix[i]]
    for (let j = 0; j < n; j += 1) {
      let best = dp[j]
      if (j - 1 >= 0) {
        best = Math.min(best, dp[j - 1])
      }
      if (j + 1 < n) {
        best = Math.min(best, dp[j + 1])
      }
      next[j] += best
    }
    dp = next
  }
  return Math.min(...dp)
}

// function minFallingPathSum(matrix) {
//   const n = matrix.length
//   const dp = new Array(n).fill(Infinity).map(() => new Array(n).fill(Infinity))
//   for (let j = 0; j < n; j += 1) {
//     dp[0][j] = matrix[0][j]
//   }
//   for (let i = 1; i < n; i += 1) {
//     for (let j = 0; j < n; j += 1) {
//       if (j - 1 >= 0) {
//         dp[i][j] = Math.min(dp[i][j], matrix[i][j] + dp[i - 1][j - 1])
//       }
//       dp[i][j] = Math.min(dp[i][j], matrix[i][j] + dp[i - 1][j])
//       if (j + 1 < n) {
//         dp[i][j] = Math.min(dp[i][j], matrix[i][j] + dp[i - 1][j + 1])
//       }
//     }
//   }
//   return Math.min(...dp[n - 1])
// }
// @lc code=end

const assert = require('assert').strict
const res1 = minFallingPathSum([
  [2, 1, 3],
  [6, 5, 4],
  [7, 8, 9],
])
assert.equal(res1, 13)
const res2 = minFallingPathSum([
  [-19, 57],
  [-40, -5],
])
assert.equal(res2, -59)
const res3 = minFallingPathSum([[-48]])
assert.equal(res3, -48)
/**
1. 递归，深度遍历，计算出所有结果
2. 动态规划
dp[i][j] 表示起点到(i,j)点的下降路径最小和
当前点的最小和和有上一层的最小和加上当前点的和，
有效的上一个坐标为(i-1,j-1)(i-1,j)(i-1,j+1)
故转移方程如下:
dp[i][j] = m[i][j] + min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]), 
// i-1 >=0 , j + 1 < n
最后min(dp[n-1][0...n1])为所求答案
边界情况，可以从第一行中的任何元素开始
故dp[0][j] = m[0][j]

 */
