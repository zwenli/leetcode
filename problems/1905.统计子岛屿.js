/*
 * @lc app=leetcode.cn id=1905 lang=javascript
 *
 * [1905] 统计子岛屿
 */

// @lc code=start
/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {
  // https://leetcode.com/problems/count-sub-islands/solutions/5667068/count-sub-islands/?envType=problem-list-v2&envId=union-find
  const m = grid1.length
  const n = grid1[0].length
  const getIdx = (i, j) => i * n + j
  const isCellLand = (i, j, grid) => grid[i][j] === 1
  const uf = new UnionFind(m * n)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (isCellLand(i, j, grid2)) {
        if (i > 0 && isCellLand(i - 1, j, grid2)) {
          uf.union(getIdx(i, j), getIdx(i - 1, j))
        }
        if (j > 0 && isCellLand(i, j - 1, grid2)) {
          uf.union(getIdx(i, j), getIdx(i, j - 1))
        }
      }
    }
  }
  // 标记是否为子岛屿，默认true
  const isSubIsland = new Array(m * n).fill(true)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (isCellLand(i, j, grid2) && !isCellLand(i, j, grid1)) {
        // 当(i,j)在grid2是陆地，grid1是水域
        // 说明 (i,j) 对应的岛屿不是子岛屿
        // 找到p（根节点）标记为false
        const p = uf.find(getIdx(i, j))
        isSubIsland[p] = false
      }
    }
  }
  let ans = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (isCellLand(i, j, grid2)) {
        const p = uf.find(getIdx(i, j))
        // 陆地且对应岛屿为子岛屿，计数
        if (isSubIsland[p]) {
          ans += 1
          // 改为 false，防止重复计数
          isSubIsland[p] = false
        }
      }
    }
  }
  return ans
}

class UnionFind {
  constructor(n) {
    this.parent = new Array(n)
    this.rank = new Array(n)
    for (let i = 0; i < n; i++) {
      this.parent[i] = i
      this.rank[i] = 0
    }
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
    if (this.rank[pi] > this.rank[pj]) {
      this.parent[pj] = pi
    } else if (this.rank[pi] < this.rank[pj]) {
      this.parent[pi] = pj
    } else {
      this.parent[pi] = pj
      this.rank[pj] += 1
    }
  }
}
// @lc code=end
