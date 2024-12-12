/*
 * @lc app=leetcode.cn id=803 lang=javascript
 *
 * [803] 打砖块
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @param {number[][]} hits
 * @return {number[]}
 */
var hitBricks = function (grid, hits) {
  // 逆序思维 + 并查集
  // 顺序击碎砖块 转成 逆序补回砖块
  // 官方题解：https://leetcode.cn/problems/bricks-falling-when-hit/solutions/561849/803-da-zhuan-kuai-by-leetcode-r5kf/?envType=problem-list-v2&envId=union-find&status=TO_DO
  const m = grid.length
  const n = grid[0].length
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  const getIdx = (i, j) => i * n + j
  const inArea = (i, j) => i >= 0 && i < m && j >= 0 && j < n
  // 1. 打掉砖块
  const copy = grid.map((r) => [...r])
  for (const [i, j] of hits) {
    copy[i][j] = 0
  }
  // 2. 并查集处理
  const size = m * n
  const uf = new UnionFind(size + 1)
  for (let j = 0; j < n; j++) {
    if (copy[0][j] === 1) {
      uf.union(j, size)
    }
  }
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (copy[i][j] === 0) continue
      if (copy[i - 1][j] === 1) {
        uf.union(getIdx(i - 1, j), getIdx(i, j))
      }
      if (j > 0 && copy[i][j - 1] === 1) {
        uf.union(getIdx(i, j - 1), getIdx(i, j))
      }
    }
  }
  // 3. 逆序补回砖块，计算出前后大小差值，减去自身砖块就是掉落的数量
  const res = new Array(hits.length).fill(0)
  for (let i = hits.length - 1; i >= 0; i--) {
    const [x, y] = hits[i]
    // 原先就没有砖块情况，是没有砖块掉落的。
    if (grid[x][y] === 0) continue
    const origin = uf.getSize(size)
    // 砖连接到顶部的情况
    if (x === 0) {
      uf.union(y, size)
    }
    for (const dir of dirs) {
      const nx = x + dir[0]
      const ny = y + dir[1]
      if (inArea(nx, ny) && copy[nx][ny] === 1) {
        uf.union(getIdx(x, y), getIdx(nx, ny))
      }
    }
    const current = uf.getSize(size)
    res[i] = Math.max(0, current - origin - 1)
    // 最后补上砖块
    copy[x][y] = 1
  }
  return res
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.size = Array.from({ length: n }, () => 1)
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
    this.size[pj] += this.size[pi]
  }
  getSize(i) {
    const root = this.find(i)
    return this.size[root]
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = hitBricks(
  [[0,1,1,1,1],[1,1,1,1,0],[1,1,1,1,0],[0,0,1,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
  [[6,0],[1,0],[4,3],[1,2],[7,1],[6,3],[5,2],[5,1],[2,4],[4,4],[7,3]]
)

assert.deepEqual(res1, [0,0,0,0,0,0,0,0,0,0,0])