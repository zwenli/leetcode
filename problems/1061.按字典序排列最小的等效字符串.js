/*
 * @lc app=leetcode.cn id=1061 lang=javascript
 *
 * [1061] 按字典序排列最小的等效字符串
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
var smallestEquivalentString = function (s1, s2, baseStr) {
  const BASE = 'a'.charCodeAt(0)
  const uf = new UnionFind(26)
  for (let i = 0; i < s1.length; i++) {
    const c1 = s1.charCodeAt(i) - BASE
    const c2 = s2.charCodeAt(i) - BASE
    uf.union(c1, c2)
  }
  let ans = ''
  for (let i = 0; i < baseStr.length; i++) {
    ans += String.fromCharCode(uf.find(baseStr.charCodeAt(i) - BASE) + BASE)
  }
  return ans
}

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
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
    // 连接时，确保字典序最小的为父节点
    if (pi < pj) {
      this.parent[pj] = pi
    } else {
      this.parent[pi] = pj
    }
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = smallestEquivalentString('leetcode', 'programs', 'sourcecode')

assert.equal(res1, 'aauaaaaada')
