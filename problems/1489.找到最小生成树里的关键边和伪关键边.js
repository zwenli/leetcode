/*
 * @lc app=leetcode.cn id=1489 lang=javascript
 *
 * [1489] 找到最小生成树里的关键边和伪关键边
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var findCriticalAndPseudoCriticalEdges = function (n, edges) {
  // 题解：https://leetcode.cn/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/solutions/569009/zhao-dao-zui-xiao-sheng-cheng-shu-li-de-gu57q/?envType=problem-list-v2&envId=union-find
  // 要想解决本题，需要用到「最小生成树」以及对应求解最小生成树的「Kruskal算法」。
  const m = edges.length
  const uf_std = new UnionFind(n)
  // 保存边对应的索引
  for (const [i, edge] of edges.entries()) {
    edge.push(i)
  }
  // 按权值升序排序
  edges.sort((a, b) => a[2] - b[2])
  let value = 0 // 计算原图最小生成树的权值
  for (let i = 0; i < m; i++) {
    if (uf_std.union(edges[i][0], edges[i][1])) {
      value += edges[i][2]
    }
  }
  const ans = [[], []]
  for (let i = 0; i < m; i++) {
    // 判断是否是关键边
    let uf = new UnionFind(n)
    let v = 0
    for (let j = 0; j < m; j++) {
      if (i !== j && uf.union(edges[j][0], edges[j][1])) {
        v += edges[j][2]
      }
    }
    if (uf.count !== 1 || (uf.count === 1 && v > value)) {
      ans[0].push(edges[i][3])
      continue
    }
    // 判断是否是伪关键边
    uf = new UnionFind(m)
    uf.union(edges[i][0], edges[i][1])
    v = edges[i][2]
    for (let j = 0; j < m; j++) {
      if (i !== j && uf.union(edges[j][0], edges[j][1])) {
        v += edges[j][2]
      }
    }
    if (v === value) {
      ans[1].push(edges[i][3])
    }
  }
  return ans
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.size = Array.from({ length: n }, () => 1)
    this.count = n
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }
  union(x, y) {
    let px = this.find(x)
    let py = this.find(y)
    if (px === py) return false
    if (this.size[px] > this.size[py]) {
      ;[px, py] = [py, px]
    }
    this.parent[px] = py
    this.size[py] += this.size[px]
    this.count -= 1
    return true
  }
  connected(x, y) {
    return this.find(x) === this.find(y)
  }
}
// @lc code=end
