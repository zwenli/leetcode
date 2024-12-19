/*
 * @lc app=leetcode.cn id=1361 lang=javascript
 *
 * [1361] 验证二叉树
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[]} leftChild
 * @param {number[]} rightChild
 * @return {boolean}
 */
var validateBinaryTreeNodes = function (n, leftChild, rightChild) {
  const uf = new UnionFind(n)
  for (let i = 0; i < n; i++) {
    const l = leftChild[i]
    const r = rightChild[i]
    if (l === r && l !== -1) return false
    if (!uf.union(i, l) || !uf.union(i, r)) return false
  }
  return uf.count === 1
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = Array.from({ length: n }, () => 0)
    // 用于标记各个孩子的父节点
    this.father = Array.from({ length: n }, () => -1)
    this.count = n
  }
  find(p) {
    if (this.parent[p] !== p) {
      this.parent[p] = this.find(this.parent[p])
    }
    return this.parent[p]
  }
  union(f, c) {
    if (c === -1) return true
    if (this.father[c] !== -1) return false
    const pi = this.find(f)
    const pj = this.find(c)
    if (pi === pj) return false
    if (this.rank[pi] > this.rank[pj]) {
      this.parent[pj] = pi
    } else {
      this.parent[pi] = pj
      if (this.rank[pi] === this.rank[pj]) {
        this.rank[pj] += 1
      }
    }
    this.father[c] = f
    this.count -= 1
    return true
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, 3, -1, -1])
assert.equal(res1, false)

const res2 = validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, -1, -1, -1])
assert.equal(res2, true)

const res3 = validateBinaryTreeNodes(2, [1, 0], [-1, -1])
assert.equal(res3, false)

const res4 = validateBinaryTreeNodes(
  6,
  [1, -1, -1, 4, -1, -1],
  [2, -1, -1, 5, -1, -1]
)
assert.equal(res4, false)

const res5 = validateBinaryTreeNodes(4, [3, -1, 1, -1], [-1, -1, 0, -1])
assert.equal(res5, true)

const res6 = validateBinaryTreeNodes(3, [1,-1,-1], [-1,-1,1])
assert.equal(res6, false)
