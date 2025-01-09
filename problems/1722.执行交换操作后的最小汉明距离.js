/*
 * @lc app=leetcode.cn id=1722 lang=javascript
 *
 * [1722] 执行交换操作后的最小汉明距离
 */

// @lc code=start
/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
var minimumHammingDistance = function (source, target, allowedSwaps) {
  const uf = new UnionFind()
  for (const [x, y] of allowedSwaps) {
    uf.union(x, y)
  }
  const n = source.length
  const s = {} // 为每个连通分量维护一个位置集合
  for (let i = 0; i < n; i++) {
    const root = uf.find(i)
    if (!s[root]) {
      s[root] = []
    }
    s[root].push(i)
  }
  // 计算汉明距离
  let ans = 0
  for (const root in s) {
    const arr = s[root]
    // 提取 source 数组中对应位置的元素，存储在数组 a 中。
    const a = arr.map(i => source[i])
    // b 对象，用于统计 target 数组中对应位置的元素出现的次数。
    const b = {}
    for (const i of arr) {
      if (!b[target[i]]) {
        b[target[i]] = 0
      }
      b[target[i]]++
    }
    // 遍历每个元素
    for (const c of a) {
      if (b[c]) {
        // 如果 b[c] 存在且大于 0，则将 b[i] 减 1，表示匹配成功。
        b[c]--
      } else {
        // 否则，汉明距离加 1。
        ans++
      }
    }
  }
  return ans
}
class UnionFind {
  constructor() {
    this.parent = new Map()
  }
  find(p) {
    if (!this.parent.has(p)) {
      this.parent.set(p, p)
    }
    if (this.parent.get(p) !== p) {
      this.parent.set(p, this.find(this.parent.get(p)))
    }
    return this.parent.get(p)
  }
  union(i, j) {
    const pi = this.find(i)
    const pj = this.find(j)
    if (pi === pj) return
    this.parent.set(pi, pj)
  }
  isConnected(i, j) {
    return this.find(i) === this.find(j)
  }
}
// @lc code=end

const assert = require("node:assert").strict

const res1 = minimumHammingDistance([5,1,2,4,3], [1,5,4,2,3], [[0,4],[4,2],[1,3],[1,4]])

assert.equal(res1, 0)