/*
 * @lc app=leetcode.cn id=947 lang=javascript
 *
 * [947] 移除最多的同行或同列石头
 */

// @lc code=start
/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  const uf = new UnionFind()
  for (const stone of stones) {
    uf.union(stone[0] + 10000, stone[1])
  }
  return stones.length - uf.count
}

class UnionFind {
  constructor() {
    this.parent = new Map()
    this.count = 0
  }
  find(p) {
    if (!this.parent.has(p)) {
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
// @lc code=end
