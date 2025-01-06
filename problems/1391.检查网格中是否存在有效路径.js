/*
 * @lc app=leetcode.cn id=1391 lang=javascript
 *
 * [1391] 检查网格中是否存在有效路径
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var hasValidPath = function (grid) {
  const m = grid.length
  const n = grid[0].length
  const getIdx = (i, j) => i * n + j
  const uf = new UnionFind(m * n)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 上
      if ([2, 5, 6].includes(grid[i][j])) {
        if (i > 0 && [2, 3, 4].includes(grid[i - 1][j])) {
          uf.union(getIdx(i, j), getIdx(i - 1, j))
        }
      }
      // 左
      if ([1, 3, 5].includes(grid[i][j])) {
        if (j > 0 && [1, 4, 6].includes(grid[i][j - 1])) {
          uf.union(getIdx(i, j), getIdx(i, j - 1))
        }
      }
    }
  }

  return uf.isConnected(0, m * n - 1)
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = Array.from({ length: n }, () => 0)
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
    if (pi === pj) return false
    if (this.rank[pi] > this.rank[pj]) {
      this.parent[pj] = pi
    } else {
      this.parent[pi] = pj
      if (this.rank[pi] === this.rank[pj]) {
        this.rank[pj] += 1
      }
    }
    return true
  }
  isConnected(i, j) {
    return this.find(i) === this.find(j)
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = hasValidPath([
  [2, 4, 3],
  [6, 5, 2],
])
assert.equal(res1, true)
