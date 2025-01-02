/*
 * @lc app=leetcode.cn id=1584 lang=javascript
 *
 * [1584] 连接所有点的最小费用
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  // Kruskal 算法，一种常见并且好写的最小生成树算法，由 Kruskal 发明。该算法的基本思想是从小到大加入边，是一个贪心算法。
  // https://leetcode.cn/problems/min-cost-to-connect-all-points/solutions/565801/lian-jie-suo-you-dian-de-zui-xiao-fei-yo-kcx7
  const n = points.length
  const dist = (x, y) => {
    const px = points[x]
    const py = points[y]
    return Math.abs(px[0] - py[0]) + Math.abs(px[1] - py[1])
  }
  const uf = new UnionFind(n)
  const edges = []
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push([dist(i, j), i, j])
    }
  }
  edges.sort((a, b) => a[0] - b[0])
  let ans = 0
  let num = 1
  for (const [len, x, y] of edges) {
    if (uf.union(x, y)) {
      ans += len
      num += 1
      if (num === n) break
    }
  }
  return ans
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = Array.from({ length: n }, () => 0)
    this.count = n
  }
  find(p) {
    if (this.parent[p] !== p) {
      this.parent[p] = this.find(this.parent[p])
    }
    return this.parent[p]
  }
  union(i, j) {
    let pi = this.find(i)
    let pj = this.find(j)
    if (pi === pj) return false
    if (this.rank[pi] < this.rank[pj]) {
      ;[pi, pj] = [pj, pi]
    }
    this.parent[pj] = pi
    this.count -= 1
    if (this.rank[pi] === this.rank[pj]) {
      this.rank[pi] += 1
    }
    return true
  }
}
// @lc code=end
