/*
 * @lc app=leetcode.cn id=952 lang=javascript
 *
 * [952] 按公因数计算最大组件大小
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var largestComponentSize = function (nums) {
  // 核心在于将数与其公因数建立连接，转换成图问题，
  // 然后利用 并查集 合并连通分量，最终得到最大连通分量的大小。
  // 
  // 在图论中，连通分量指图中所有能够通过边相互到达的节点组成的最大集合。
  // 比如有一个无向图，节点用数字表示，边用连接这些数字的线表示：
  // 1 - 2    4
  // |        |
  // 3        5
  // 这个图有两个连通分量
  // 第一个连通分量是 {1, 2, 3}，因为节点 1、2、3 之间通过边相互连接。
  // 第二个连通分量是 {4, 5}，因为节点 4 和 5 之间通过边连接，但它们与 {1, 2, 3} 这个连通分量没有连接。
  // 因此，这个图的 连通分量 是 {1, 2, 3} 和 {4, 5}，共 两个连通分量。
  const uf = new UnionFind()
  for (const num of nums) {
    const factors = getFactors(num)
    for (const factor of factors) {
      uf.union(num, factor)
    }
  }

  let res = 0
  let count = {}
  for (const num of nums) {
    const root = uf.find(num)
    count[root] = (count[root] ?? 0) + 1
    res = Math.max(count[root], res)
  }
  return res
}

class UnionFind {
  constructor() {
    this.parent = new Map()
    this.count = 0
  }
  find(p) {
    if (this.parent.get(p) === undefined) {
      this.parent.set(p, p)
      this.count += 1
    }
    if (this.parent.get(p) !== p) {
      this.parent.set(p, this.find(this.parent.get(p)))
    }
    return this.parent.get(p)
  }
  union(i, j) {
    const iRoot = this.find(i)
    const jRoot = this.find(j)
    if (iRoot === jRoot) return
    this.parent.set(iRoot, jRoot)
    this.count -= 1
  }
}

// 分解质因数
// 分解质因数的目标是将一个正整数 num 表示为一系列质数的乘积
function getFactors(num) {
  const factors = new Set()
  // 从小质数开始试除
  let d = 2
  while (d * d <= num) {
    while (num % d === 0) { // 如果可以整除
      factors.add(d)
      num = num / d
    }
    d += 1
  }
  // 如果 num 剩余大于 1，说明它本身是质数
  if (num > 1) {
    factors.add(num)
  }
  return Array.from(factors)
}
// @lc code=end
