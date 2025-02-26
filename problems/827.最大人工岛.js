/*
 * @lc app=leetcode.cn id=827 lang=javascript
 *
 * [827] 最大人工岛
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function (grid) {
  const n = grid.length
  const getIdx = (x, y) => x * n + y
  const inArea = (x, y) => x >= 0 && x < n && y >= 0 && y < n
  const parent = Array.from({ length: n * n }, (_, i) => i)
  const sizes = Array.from({ length: n * n }, () => 1)
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x])
    }
    return parent[x]
  }
  const union = (x, y) => {
    const px = find(x)
    const py = find(y)
    if (px === py) return
    parent[px] = py
    sizes[py] += sizes[px]
  }
  // 连通分量
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) continue
      if (i > 0 && grid[i - 1][j] === 1) {
        union(getIdx(i - 1, j), getIdx(i, j))
      }
      if (j > 0 && grid[i][j - 1] === 1) {
        union(getIdx(i, j - 1), getIdx(i, j))
      }
    }
  }
  let res = 0
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  // 计算最大岛屿面积
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        // 计算当前元素对应的连通分量大小，即岛屿面积
        // 用来解决gird全是1的情况
        res = Math.max(sizes[find(getIdx(i, j))], res)
        continue
      }
      // 当前元素是海洋，尝试计算上下左右四个对应的岛屿面积
      let cur = 1
      let count = {}
      for (const dir of dirs) {
        const x = i + dir[0]
        const y = j + dir[1]
        if (inArea(x, y) && grid[x][y] === 1) {
          const root = find(getIdx(x, y))
          count[root] = sizes[root]
        }
      }
      for (let k in count) {
        cur += count[k]
      }
      res = Math.max(res, cur)
    }
  }
  return res
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = largestIsland([
  [1, 0],
  [0, 1],
])
assert.equal(res1, 3)

const res2 = largestIsland([
  [1, 1],
  [1, 1],
])
assert.equal(res2, 4)
