/*
 * @lc app=leetcode.cn id=765 lang=javascript
 *
 * [765] 情侣牵手
 */

// @lc code=start
/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function (row) {
  // 题解：https://leetcode.cn/problems/couples-holding-hands/solutions/599958/qing-lu-qian-shou-by-leetcode-gl1c/?envType=problem-list-v2&envId=union-find
  const len = row.length
  const n = len / 2
  const uf = new UnionFind(n)
  // 一对情侣的编号，其中一个一定是偶数，另一个一定是奇数
  // 并且偶数的值+1 = 奇数的值。
  // 并且这两个数除以2（下取整）得到的数是相等的。
  for (let i = 0; i < len; i += 2) {
    // 连通情侣
    uf.union(Math.floor(row[i] / 2), Math.floor(row[i + 1] / 2))
  }
  // 一个连通分量的N对情侣，如果要拆开，至少要交换N-1次
  // 至少交换的次数 = 所有情侣的对数 - 并查集里连通分量的个数
  return n - uf.count
}
class UnionFind {
  constructor(n) {
    this.count = n
    this.parent = Array.from({ length: n }, (_, i) => i)
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x])
    }
    return this.parent[x]
  }
  union(x, y) {
    const px = this.find(x)
    const py = this.find(y)
    if (px === py) return
    this.parent[px] = py
    this.count--
  }
}
// @lc code=end
