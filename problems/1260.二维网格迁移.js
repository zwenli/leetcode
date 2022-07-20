/*
 * @lc app=leetcode.cn id=1260 lang=javascript
 *
 * [1260] 二维网格迁移
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function (grid, k) {
  // time complexity O(mn)
  // space complexity O(1)
  const m = grid.length
  const n = grid[0].length
  k = k % (m * n)
  const res = new Array(m).fill(null).map(() => new Array(n).fill(null))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const next = (i * n + j + k) % (m * n)
      const x = Math.floor(next / n)
      const y = next % n
      res[x][y] = grid[i][j]
    }
  }
  return res
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = shiftGrid(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  1
)
assert.deepEqual(res1, [
  [9, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
])

const res2 = shiftGrid(
  [
    [3, 8, 1, 9],
    [19, 7, 2, 5],
    [4, 6, 11, 10],
    [12, 0, 21, 13],
  ],
  4
)
assert.deepEqual(res2, [
  [12, 0, 21, 13],
  [3, 8, 1, 9],
  [19, 7, 2, 5],
  [4, 6, 11, 10],
])

const res3 = shiftGrid(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  9
)
assert.deepEqual(res3, [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])
