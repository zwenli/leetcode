/*
 * @lc app=leetcode.cn id=1202 lang=javascript
 *
 * [1202] 交换字符串中的元素
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function (s, pairs) {
  const n = s.length
  const uf = new UnionFind(n)
  for (const p of pairs) {
    uf.union(p[0], p[1])
  }
  // 收集连通分量中的字母
  const vec = Array.from({ length: n }, () => [])
  for (let i = 0; i < n; i++) {
    vec[uf.find(i)].push(s[i])
  }
  // 排序
  for (let i = 0; i < n; i++) {
    if (vec[i].length > 0) {
      vec[i].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    }
  }
  // 回填
  let p = new Array(n).fill(0)
  let ans = new Array(n).fill('')
  for (let i = 0; i < n; i++) {
    ans[i] = vec[uf.find(i)][p[uf.find(i)]]
    p[uf.find(i)] += 1
  }
  return ans.join('')
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = Array.from({ length: n }, () => 0)
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
    if (this.rank[pi] < this.rank[pj]) {
      this.parent[pi] = pj
    } else {
      this.parent[pj] = pi
      if (this.rank[pi] === this.rank[pj]) {
        this.rank[pi] += 1
      }
    }
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = smallestStringWithSwaps('dcab', [[0,3],[1,2],[0,2]])

assert.equal(res1, 'abcd')
