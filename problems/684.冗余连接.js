/*
 * @lc app=leetcode.cn id=684 lang=javascript
 *
 * [684] 冗余连接
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const n = edges.length
  const uf = new UnionFind(n + 1)
  for (const [a, b] of edges) {
    if (uf.isConnected(a, b)) return [a, b]
    uf.union(a, b)
  }
  return void 0
}

class UnionFind {
  constructor(n) {
    this.count = n
    this.parent = new Array(n).fill(0).map((_, i) => i)
    this.rank = new Array(n).fill(0)
  }
  find(p) {
    while (this.parent[p] !== p) {
      this.parent[p] = this.parent[this.parent[p]]
      p = this.parent[p]
    }
    return p
  }
  union(i, j) {
    const iRoot = this.find(i)
    const jRoot = this.find(j)
    if (iRoot === jRoot) return
    if (this.rank[iRoot] < this.rank[jRoot]) {
      this.parent[iRoot] = jRoot
    } else {
      this.parent[jRoot] = iRoot
      if (this.rank[iRoot] === this.rank[jRoot]) {
        this.rank[iRoot] += 1
      }
    }
    this.count -= 1
  }
  isConnected(i, j) {
    return this.find(i) === this.find(j)
  }
}
// @lc code=end
