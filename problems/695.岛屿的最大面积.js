/*
 * @lc app=leetcode.cn id=695 lang=javascript
 *
 * [695] 岛屿的最大面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
// TODO: bfs

// var maxAreaOfIsland = function (grid) {
//   // dfs
//   // time complexity O(m*n)
//   // space complexity O(m*n)
//   const m = grid.length
//   const n = grid[0].length
//   const visited = new Set()
//   const dx = [1, 0, -1, 0]
//   const dy = [0, 1, 0, -1]
//   let ans = 0
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (grid[i][j] === 1 && !visited.has(i * n + j)) {
//         ans = Math.max(ans, dfs(i, j))
//       }
//     }
//   }
//   return ans
//   function dfs(i, j) {
//     let area = 1
//     visited.add(i * n + j)
//     for (let k = 0; k < 4; k++) {
//       const ni = i + dx[k]
//       const nj = j + dy[k]
//       if (
//         ni >= 0 &&
//         ni < m &&
//         nj >= 0 &&
//         nj < n &&
//         grid[ni][nj] === 1 &&
//         !visited.has(ni * n + nj)
//       ) {
//         area += dfs(ni, nj)
//       }
//     }
//     return area
//   }
// }
var maxAreaOfIsland = function (grid) {
  // dfs
  // time complexity O(m*n)
  // space complexity O(m*n)
  const m = grid.length
  const n = grid[0].length
  const visited = new Set()
  let ans = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1 && !visited.has(i * n + j)) {
        ans = Math.max(ans, dfs(i, j))
      }
    }
  }
  return ans
  function dfs(i, j) {
    if (
      i < 0 ||
      j < 0 ||
      i >= m ||
      j >= n ||
      grid[i][j] === 0 ||
      visited.has(i * n + j)
    ) {
      return 0
    }
    visited.add(i * n + j)
    return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1)
  }
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = maxAreaOfIsland([
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
])
assert.equal(res1, 6)

const res2 = maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]])
assert.equal(res2, 0)
