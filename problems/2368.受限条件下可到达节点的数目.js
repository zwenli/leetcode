/*
 * @lc app=leetcode.cn id=2368 lang=javascript
 *
 * [2368] 受限条件下可到达节点的数目
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} restricted
 * @return {number}
 */
var reachableNodes = function (n, edges, restricted) {
  const isRestricted = new Array(n).fill(0)
  for (const x of restricted) {
    isRestricted[x] = 1
  }
  const uf = new UnionFind(n)
  for (const [x, y] of edges) {
    if (isRestricted[x] === 1 || isRestricted[y] === 1) {
      continue
    }
    uf.union(x, y)
  }
  return uf.getSize(0)
}

class UnionFind {
  constructor(n) {
    this.parent = []
    this.size = []
    this.rank = []
    for (let i = 0; i < n; i++) {
      this.parent[i] = i
      this.size[i] = 1
      this.rank[i] = 0
    }
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }
  union(x, y) {
    const px = this.find(x)
    const py = this.find(y)
    if (px === py) return
    if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px
      this.size[px] += this.size[py]
      this.size[py] = 0
    } else if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py
      this.size[py] += this.size[px]
      this.size[px] = 0
    } else {
      this.parent[py] = px
      this.rank[px] += 1
      this.size[px] += this.size[py]
      this.size[py] = 0
    }
  }
  getSize(x) {
    return this.size[this.find(x)]
  }
}
// @lc code=end
