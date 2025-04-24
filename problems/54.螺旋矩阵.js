/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  // 按层模拟
  const m = matrix.length
  const n = matrix[0].length
  let r0 = 0,
    r1 = m - 1,
    c0 = 0,
    c1 = n - 1
  const ans = []
  while (r0 <= r1 && c0 <= c1) {
    // up
    for (let c = c0; c <= c1; c++) {
      ans.push(matrix[r0][c])
    }
    // right
    for (let r = r0 + 1; r <= r1; r++) {
      ans.push(matrix[r][c1])
    }
    if (r0 < r1 && c0 < c1) {
      // bottom
      for (let c = c1 - 1; c >= c0; c--) {
        ans.push(matrix[r1][c])
      }
      // left
      for (let r = r1 - 1; r > r0; r--) {
        ans.push(matrix[r][c0])
      }
    }
    r0++
    r1--
    c0++
    c1--
  }
  return ans
}

// var spiralOrder = function (matrix) {
//   const m = matrix.length
//   const n = matrix[0].length
//   const visited = new Array(m).fill(false).map(() => new Array(n).fill(false))
//   const dirs = [
//     [0, 1],
//     [1, 0],
//     [0, -1],
//     [-1, 0],
//   ]
//   const res = []
//   let d = 0
//   let i = 0
//   let j = 0
//   while (res.length < m * n) {
//     res.push(matrix[i][j])
//     visited[i][j] = true
//     const ni = i + dirs[d][0]
//     const nj = j + dirs[d][1]
//     if (!(ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj])) {
//       d = (d + 1) % 4
//     }
//     i += dirs[d][0]
//     j += dirs[d][1]
//   }

//   return res
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = spiralOrder([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])

assert.deepEqual(res1, [1, 2, 3, 6, 9, 8, 7, 4, 5])

const res2 = spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
])

assert.deepEqual(res2, [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7])
