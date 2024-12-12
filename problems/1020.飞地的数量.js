/*
 * @lc app=leetcode.cn id=1020 lang=javascript
 *
 * [1020] 飞地的数量
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
  // 并查集 + dfs
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  const m = grid.length
  const n = grid[0].length
  const uf = new UnionFind(m * n + 1)
  const BOARD = m * n // 虚拟节点
  const getIdx = (i, j) => i * n + j

  const dfs = (i, j) => {
    uf.union(BOARD, getIdx(i, j))
    for (const [dx, dy] of dirs) {
      const nx = i + dx
      const ny = j + dy
      if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue
      if (grid[nx][ny] === 0 || uf.isConnected(BOARD, getIdx(nx, ny))) continue
      dfs(nx, ny)
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
        // 从边缘陆地块开始出发进行dfs
        // 遍历过程中，先检查下陆地单元格是否和虚拟节点连通，降低复杂度
        // 如果已经连通，说明当前陆地单元格属于之前的某个连通分量，已经被整体标记，进行跳过即可。
        if (grid[i][j] === 0 || uf.isConnected(BOARD, getIdx(i, j))) continue
        dfs(i, j)
      }
    }
  }

  // 最后遍历整个矩阵，统计所有不与虚拟节点连通的陆地数量。
  let cnt = 0
  for (let i = 1; i < m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      if (grid[i][j] === 1 && !uf.isConnected(BOARD, getIdx(i, j))) {
        cnt += 1
      }
    }
  }
  return cnt
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = Array.from({ length: n }, () => 0)
  }
  find(p) {
    while (this.parent[p] !== p) {
      this.parent[p] = this.parent[this.parent[p]]
      p = this.parent[p]
    }
    return p
  }
  union(i, j) {
    const pi = this.find(i)
    const pj = this.find(j)
    if (pi === pj) return false
    if (this.rank[pi] < this.rank[pj]) {
      this.parent[pi] = pj
    } else {
      this.parent[pj] = pi
      if (this.rank[pi] === this.rank[pj]) {
        this.rank[pi] += 1
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

const res1 = numEnclaves([
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
])

assert.equal(res1, 3)
