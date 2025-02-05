/*
 * @lc app=leetcode.cn id=2492 lang=javascript
 *
 * [2492] 两个城市间路径的最小分数
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function (n, roads) {
  const uf = new UnionFind(n + 1)
  // 先处理连通分量
  for (const r of roads) {
    uf.union(r[0], r[1])
  }
  // 再处理连通分量内，任意量节点之间的路径分数最小值
  const scores = {}
  for (const r of roads) {
    const z = uf.find(r[0])
    if (!scores[z]) scores[z] = Infinity
    scores[z] = Math.min(scores[z], r[2])
  }
  return scores[uf.find(1)]
}
class UnionFind {
  constructor (n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
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
    this.parent[px] = py
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = minScore(4, [[1,2,2],[1,3,4],[3,4,7]])
assert.equal(res1, 2)
