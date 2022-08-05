/*
 * @lc app=leetcode.cn id=576 lang=javascript
 *
 * [576] 出界的路径数
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */
var findPaths = function (m, n, maxMove, startRow, startColumn) {
  // dp, 空间优化
  // time complexity O(maxMove*m*n)
  // space complexity O(m*n): 2 * m * n
  const MOD = 10 ** 9 + 7
  const directions = [
    [1,0],[0,1],[-1,0],[0,-1]
  ]
  let dp = new Array(m).fill(0).map(
    () => new Array(n).fill(0)
  )
  dp[startRow][startColumn] = 1
  let outCounts = 0
  for (let i = 0; i < maxMove; i++) {
    const newDp = new Array(m).fill(0).map(
      () => new Array(n).fill(0)
    )
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < n; k++) {
        const count = dp[j][k]
        if (count > 0) {
          for (const dir of directions) {
            const nj = j + dir[0]
            const nk = k + dir[1]
            if (nj >= 0 && nj < m && nk >= 0 && nk < n) {
              newDp[nj][nk] = (newDp[nj][nk] + count) % MOD
            } else {
              outCounts = (outCounts + count) % MOD
            }
          }
        }
      }
    }
    dp = newDp
  }
  return outCounts
}

// var findPaths = function (m, n, maxMove, startRow, startColumn) {
//   // dp
//   // time complexity O(maxMove*m*n)
//   // space complexity O(maxMove*m*n)
//   // dp[i][j][k] 表示球移动i次后位于坐标(j,k)的路径数量
//   // 当i = 0时，球一定位于起始位置(startRow, startColumn)，因此dp的边界情况是：
//   // dp[0][startRow][startColumn] = 1, dp[0][j][k] = 0, (j !==startRow, k !== startColumn)
//   // 当球移动了i次后，位于坐标(j,k)，且 i < maxMove, 0 <= j < m, 0 <= k < n,
//   // 则移动第i+1次后，球一定位于坐标(j,k)相邻的一个坐标记为(nj,nk)
//   // * 当0 <= nj < m, 0 <= nk < n时，球在移动i+1后没有出界，将dp[i][j][k]的路径数累加到dp[i+1][nj][nk]
//   // * 否则，球在移动i+1后出界，将dp[i][j][k]的值加到出界的路径数
//   const MOD = 10 ** 9 + 7
//   const directions = [
//     [1,0],[0,1],[-1,0],[0,-1]
//   ]
//   const dp = new Array(maxMove + 1).fill(0).map(
//     () => new Array(m).fill(0).map(
//       () => new Array(n).fill(0)
//     )
//   )
//   dp[0][startRow][startColumn] = 1
//   let ans = 0
//   for (let i = 0; i < maxMove; i++) {
//     for (let j = 0; j < m; j++) {
//       for (let k = 0; k < n; k++) {
//         const count = dp[i][j][k]
//         if (count > 0) {
//           for (const dir of directions) {
//             const nj = j + dir[0]
//             const nk = k + dir[1]
//             if (nj >= 0 && nj < m && nk >= 0 && nk < n) {
//               dp[i + 1][nj][nk] = (dp[i + 1][nj][nk] + count) % MOD
//             } else {
//               ans = (ans + count) % MOD
//             }
//           }
//         }
//       }
//     }
//   }
//   return ans
// }

// var findPaths = function (m, n, maxMove, startRow, startColumn) {
//   // 记忆化搜索
//   const MOD = 10 ** 9 + 7
//   const directions = [
//     [1,0],[0,1],[-1,0],[0,-1]
//   ]
//   const cache = new Array(m).fill(null).map(
//     () => new Array(n).fill(null).map(
//       () => new Array(maxMove + 1).fill(null)
//     )
//   )
//   return dfs(startRow, startColumn, maxMove)
//   function dfs(i, j, k) {
//     if (i >= m || i < 0 || j >= n || j < 0) return 1
//     if (k === 0) return 0
//     if (cache[i][j][k] === null) {
//       let path = 0
//       for (const dir of directions) {
//         path += dfs(i + dir[0], j + dir[1], k - 1)
//         path %= MOD
//       }
//       cache[i][j][k] = path
//     }
//     return cache[i][j][k]
//   }
// }
// @lc code=end
const assert = require('node:assert').strict

const res1 = findPaths(2, 2, 2, 0, 0)
assert.equal(res1, 6)

const res2 = findPaths(1, 3, 3, 0, 1)
assert.equal(res2, 12)
