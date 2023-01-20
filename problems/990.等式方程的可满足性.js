/*
 * @lc app=leetcode.cn id=990 lang=javascript
 *
 * [990] 等式方程的可满足性
 */

// @lc code=start
/**
 * @param {string[]} equations
 * @return {boolean}
 */
class UnionFind {
  constructor(length) {
    this.length = length
    this.parent = new Array(length).fill(0)
    this.rank = new Array(length).fill(0)
    for (let i = 0; i < length; i++) {
      this.parent[i] = i
    }
  }
  find(p) {
    const parent = this.parent
    while (parent[p] !== p) {
      parent[p] = parent[parent[p]]
      p = parent[p]
    }
    return p
  }
  union(i, j) {
    const iRoot = this.find(i)
    const jRoot = this.find(j)
    if (iRoot === jRoot) return
    if (this.rank[iRoot] > this.rank[jRoot]) {
      this.parent[jRoot] = iRoot
    } else {
      this.parent[iRoot] = jRoot
      if (this.rank[iRoot] === this.rank[jRoot]) {
        this.rank[jRoot] += 1
      }
    }
  }
  isConnected(i, j) {
    return this.find(i) === this.find(j)
  }
}
var equationsPossible = function (equations) {
  const uf = new UnionFind(26)
  const BASE_CODE = 'a'.charCodeAt(0)
  for (const equation of equations) {
    if (equation[1] === '=') {
      const i = equation.charCodeAt(0) - BASE_CODE
      const j = equation.charCodeAt(3) - BASE_CODE
      uf.union(i, j)
    }
  }
  for (const equation of equations) {
    if (equation[1] === '!') {
      const i = equation.charCodeAt(0) - BASE_CODE
      const j = equation.charCodeAt(3) - BASE_CODE
      if (uf.isConnected(i, j)) return false
    }
  }
  return true
}
// @lc code=end

const assert = requ
