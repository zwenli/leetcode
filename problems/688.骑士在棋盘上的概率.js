/*
 * @lc app=leetcode.cn id=688 lang=javascript
 *
 * [688] 骑士在棋盘上的概率
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */

var knightProbability = function (n, k, row, column) {
  // 记忆化搜索
  const directions = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ]
  const memo = new Array(k + 1).fill(0).map(
    () => new Array(n).fill(0).map(
      () => new Array(n).fill(-1)
    )
  )
  return dfs(n, k, row, column, memo)
  function dfs(n, k, row, column, memo) {
    if (row >= n || row < 0 || column >= n || column < 0) return 0
    if (k === 0) return 1
    if (memo[k][row][column] === -1) {
      let rate = 0
      for (let dir of directions) {
        rate += dfs(n, k - 1, row - dir[0], column - dir[1], memo) / 8
      }
      memo[k][row][column] = rate
    }
    return memo[k][row][column]
  }
}

// var knightProbability = function (n, k, row, column) {
//   // 递归解法
//   // https://leetcode.com/problems/knight-probability-in-chessboard/discuss/113954/Evolve-from-recursive-to-dpbeats-94
//   // 会超时
//   const directions = [
//     [2, 1],
//     [1, 2],
//     [-1, 2],
//     [-2, 1],
//     [-2, -1],
//     [-1, -2],
//     [1, -2],
//     [2, -1],
//   ]
//   return dfs(n, k, row, column)
//   function dfs(n, k, row, column) {
//     if (row >= n || row < 0 || column >= n || column < 0) return 0
//     if (k === 0) return 1
//     let rate = 0
//     for (let dir of directions) {
//       rate += dfs(n, k - 1, row - dir[0], column - dir[1]) / 8
//     }
//     return rate
//   }
// }

// var knightProbability = function (n, k, row, column) {
//   const directions = [
//     [2, 1],
//     [1, 2],
//     [-1, 2],
//     [-2, 1],
//     [-2, -1],
//     [-1, -2],
//     [1, -2],
//     [2, -1],
//   ]
//   const dp = new Array(k + 1)
//     .fill(0)
//     .map(() => new Array(n).fill(0).map(() => new Array(n).fill(0)))
//   for (let step = 0; step <= k; step++) {
//     for (let i = 0; i < n; i++) {
//       for (let j = 0; j < n; j++) {
//         if (step === 0) {
//           dp[step][i][j] = 1
//         } else {
//           for (const dir of directions) {
//             const ni = i + dir[0]
//             const nj = j + dir[1]
//             if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
//               dp[step][i][j] += dp[step - 1][ni][nj] / 8
//             }
//           }
//         }
//       }
//     }
//   }
//   return dp[k][row][column]
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = knightProbability(3, 2, 0, 0)
assert.equal(res1, 0.0625)

const res2 = knightProbability(1, 0, 0, 0)
assert.equal(res2, 1)
