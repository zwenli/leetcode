/*
 * @lc app=leetcode.cn id=1254 lang=javascript
 *
 * [1254] 统计封闭岛屿的数目
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
  const m = grid.length
  const n = grid[0].length
  const uf = new UnionFind(m * n + 1)
  const BOARD = m * n
  const getIdx = (i, j) => i * n + j
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 0) {
      uf.union(getIdx(i, 0), BOARD)
    }
    if (grid[i][n - 1] === 0) {
      uf.union(getIdx(i, n - 1), BOARD)
    }
  }
  for (let j = 1; j < n - 1; j++) {
    if (grid[0][j] === 0) {
      uf.union(getIdx(0, j), BOARD)
    }
    if (grid[m - 1][j] === 0) {
      uf.union(getIdx(m - 1, j), BOARD)
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        if (i > 0 && grid[i - 1][j] === 0) {
          uf.union(getIdx(i, j), getIdx(i - 1, j))
        }
        if (j > 0 && grid[i][j - 1] === 0) {
          uf.union(getIdx(i, j), getIdx(i, j - 1))
        }
      }
    }
  }
  let cnt = new Set()
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        cnt.add(uf.find(getIdx(i, j)))
      }
    }
  }
  let total = cnt.size
  if (cnt.has(uf.find(BOARD))) {
    total -= 1
  }
  return total
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
  }
  find(p) {
    if (this.parent[p] !== p) {
      this.parent[p] = this.find(this.parent[p])
    }
    return this.parent[p]
  }
  union(i, j) {
    const pi = this.find(i)
    const pj = this.find(j)
    if (pi === pj) return
    this.parent[pi] = pj
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = closedIsland([
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
])

assert.equal(res1, 2)
