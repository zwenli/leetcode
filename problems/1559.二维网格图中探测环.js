/*
 * @lc app=leetcode.cn id=1559 lang=javascript
 *
 * [1559] 二维网格图中探测环
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var containsCycle = function (grid) {
  const m = grid.length
  const n = grid[0].length
  const getIdx = (i, j) => i * n + j
  const uf = new UnionFind(m * n)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i > 0 && grid[i][j] === grid[i - 1][j]) {
        if (!uf.union(getIdx(i, j), getIdx(i - 1, j))) {
          return true
        }
      }
      if (j > 0 && grid[i][j] === grid[i][j - 1]) {
        if (!uf.union(getIdx(i, j), getIdx(i, j - 1))) {
          return true
        }
      }
    }
  }
  return false
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
    if (pi === pj) return false
    this.parent[pi] = pj
    return true
  }
}
// @lc code=end
