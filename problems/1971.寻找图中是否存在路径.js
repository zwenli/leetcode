/*
 * @lc app=leetcode.cn id=1971 lang=javascript
 *
 * [1971] 寻找图中是否存在路径
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  const uf = new UnionFind(n)
  for (const [u, v] of edges) {
    uf.union(u, v)
  }
  return uf.isConnected(source, destination)
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
