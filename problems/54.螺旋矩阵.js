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
  const m = matrix.length
  const n = matrix[0].length
  const visited = new Array(m).fill(false).map(() => new Array(n).fill(false))
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  const res = []
  let d = 0
  let i = 0
  let j = 0
  while (res.length < m * n) {
    res.push(matrix[i][j])
    visited[i][j] = true
    const ni = i + dirs[d][0]
    const nj = j + dirs[d][1]
    if (!(ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj])) {
      d = (d + 1) % 4
    }
    i += dirs[d][0]
    j += dirs[d][1]
  }

  return res
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = spiralOrder([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])

assert.deepEqual(res1, [1, 2, 3, 6, 9, 8, 7, 4, 5])
