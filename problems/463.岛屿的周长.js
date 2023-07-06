/*
 * @lc app=leetcode.cn id=463 lang=javascript
 *
 * [463] 岛屿的周长
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

var islandPerimeter = function (grid) {
  const DIRS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  const m = grid.length
  const n = grid[0].length

  const dfs = (i, j) => {
    // 边界或者水域，周长加1
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      return 1
    }
    if (grid[i][j] === 2) {
      return 0
    }
    grid[i][j] = 2
    let res = 0
    for (const [dx, dy] of DIRS) {
      res += dfs(i + dx, j + dy)
    }
    return res
  }

  let ans = 0
  for (let i = 0; i < m; i++) {
    let found = false
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        ans += dfs(i, j)
        found = true
        break
      }
    }
    if (found) break
  }
  return ans
}

// TODO：迭代

// @lc code=end

const assert = require('node:assert/strict')

const res1 = islandPerimeter([
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
])
assert.equal(res1, 16)

const res2 = islandPerimeter([[1]])
assert.equal(res2, 4)

const res3 = islandPerimeter([[1, 0]])
assert.equal(res3, 4)

const res4 = islandPerimeter([
  [1, 1, 1],
  [1, 0, 0],
])
assert.equal(res4, 10)
