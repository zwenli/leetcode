/*
 * @lc app=leetcode.cn id=1319 lang=javascript
 *
 * [1319] 连通网络的操作次数
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  if (connections.length + 1 < n) return -1
  const uf = new UnionFind(n)
  for (const c of connections) {
    uf.union(c[0], c[1])
  }
  return uf.count - 1
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.count = n
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
    if (pi === pj) return
    this.parent[pi] = pj
    this.count -= 1
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = makeConnected(4, [
  [0, 1],
  [0, 2],
  [1, 2],
])
assert.equal(res1, 1)

const res2 = makeConnected(6, [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 3],
])
assert.equal(res2, 2)

const res3 = makeConnected(6, [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
])
assert.equal(res3, -1)

const res4 = makeConnected(5, [
  [0, 1],
  [0, 2],
  [3, 4],
  [2, 3],
])
assert.equal(res4, 0)
