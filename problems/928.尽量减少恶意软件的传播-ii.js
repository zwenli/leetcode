/*
 * @lc app=leetcode.cn id=928 lang=javascript
 *
 * [928] 尽量减少恶意软件的传播 II
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @param {number[]} initial
 * @return {number}
 */
var minMalwareSpread = function (graph, initial) {
  // 题解： https://leetcode.cn/problems/minimize-malware-spread-ii/solutions/2740511/jin-liang-jian-shao-e-yi-ruan-jian-de-ch-d5gg/?envType=problem-list-v2&envId=union-find
  const n = graph.length
  const uf = new UnionFind(n)
  const initialSet = new Array(n).fill(0)
  for (const v of initial) {
    initialSet[v] = 1
  }
  for (let u = 0; u < n; u++) {
    if (initialSet[u] === 1) continue
    for (let v = 0; v < n; v++) {
      if (initialSet[v] === 1) continue
      if (graph[u][v] === 1) {
        uf.union(u, v)
      }
    }
  }

  const infectedBy = Array.from({ length: n }, () => []) // 受哪些节点感染
  for (const v of initial) {
    const infectedSet = Array.from({ length: n }, () => 0) // 被节点v感染的子集
    for (let u = 0; u < n; u++) {
      if (initialSet[u] === 1) continue
      if (graph[u][v] === 1) {
        infectedSet[uf.find(u)] = 1
      }
    }
    for (let u = 0; u < n; u++) {
      if (infectedSet[u] === 1) {
        infectedBy[u].push(v)
      }
    }
  }
  // 统计只能受到v感染到的所有节点数量
  const count = new Array(n).fill(0)
  for (let u = 0; u < n; u++) {
    if (infectedBy[u].length !== 1) continue
    const v = infectedBy[u][0]
    for (let w = 0; w < n; w++) {
      if (uf.connected(w, u)) {
        count[v]++
      }
    }
  }
  // count[v] 最大且下标最小的节点v，就是所求答案
  let res = initial[0]
  for (const v of initial) {
    if (count[v] > count[res] || (count[v] === count[res] && v < res)) {
      res = v
    }
  }
  return res
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = Array.from({ length: n }, () => 0)
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
    if (this.rank[px] > this.rank[py]) {
      ;[px, py] = [py, px]
    }
    this.parent[px] = py
    if (this.rank[px] === this.rank[py]) {
      this.rank[py] += 1
    }
    return true
  }
  connected(x, y) {
    return this.find(x) === this.find(y)
  }
}
// @lc code=end
