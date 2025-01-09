/*
 * @lc app=leetcode.cn id=2316 lang=javascript
 *
 * [2316] 统计无向图中无法互相到达点对数
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countPairs = function (n, edges) {
  const uf = new UnionFind(n)
  for (const [i, j] of edges) {
    uf.union(i, j)
  }
  let ans = 0
  for (let i = 0; i < n; i++) {
    // size 为连通分量的大小
    // n - size 与这个点无法互相到达的点数
    ans += n - uf.getSize(i)
  }
  // 每个点进行这样的计算后求和，但这样的方法计算，
  // 每个点对会被计算两次，因此最后结果需要除以 2。
  return ans / 2;
}
// var countPairs = function (n, edges) {
//   const uf = new UnionFind(n)
//   for (const [i, j] of edges) {
//     uf.union(i, j)
//   }
//   const counts = new Map()
//   for (let i = 0; i < n; i++) {
//     counts.set(uf.find(i), uf.getSize(i))
//   }
//   let cur = n
//   let ans = 0
//   for (const cnt of counts.values()) {
//     // 先减去自身集合的点数，及之前的，防止重复计算
//     cur -= cnt
//     // cur 表示点无法互相到达的点数
//     // cnt 表示连通分量的大小，也就是点的数量。
//     // 相乘就是这个连通分量所有点无法互相到达的点数
//     ans += cnt * cur
//   }
//   return ans
// }

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
    this.size[pi] = 0
  }
  getSize(p) {
    return this.size[this.find(p)]
  }
}
// @lc code=end
