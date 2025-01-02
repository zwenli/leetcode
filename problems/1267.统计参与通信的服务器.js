/*
 * @lc app=leetcode.cn id=1267 lang=javascript
 *
 * [1267] 统计参与通信的服务器
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function (grid) {
  const m = grid.length
  const n = grid[0].length
  const uf = new UnionFind()
  // 行遍历合并
  for (let i = 0; i < m; i++) {
    let first = -1
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) continue
      if (first === -1) {
        first = i * n + j
      } else {
        uf.union(i * n + j, first)
      }
    }
  }
  // 列遍历合并
  for (let j = 0; j < n; j++) {
    let first = -1
    for (let i = 0; i < m; i++) {
      if (grid[i][j] === 0) continue
      if (first === -1) {
        first = i * n + j
      } else {
        uf.union(i * n + j, first)
      }
    }
  }
  let ans = 0
  Array.from(uf.sizes.values()).forEach(v => ans += v > 1 ? v : 0)
  return ans
}
class UnionFind {
  constructor() {
    this.parent = new Map()
    this.sizes = new Map()
  }
  find(i) {
    if (!this.parent.has(i)) {
      this.parent.set(i, i)
      this.sizes.set(i, 1)
    }
    if (this.parent.get(i) !== i) {
      this.parent.set(i, this.find(this.parent.get(i)))
    }
    return this.parent.get(i)
  }
  union(i, j) {
    const pi = this.find(i)
    const pj = this.find(j)
    if (pi === pj) return
    this.parent.set(pi, pj)
    this.sizes.set(pj, this.sizes.get(pi) + this.sizes.get(pj))
    this.sizes.set(pi, 0)
  }
}
// var countServers = function (grid) {
//   // 两次遍历
//   const m = grid.length
//   const n = grid[0].length
//   const rows = new Array(m).fill(0)
//   const cols = new Array(n).fill(0)
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (grid[i][j] === 1) {
//         rows[i] += 1
//         cols[j] += 1
//       }
//     }
//   }
//   let ans = 0
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (grid[i][j] === 1 && (rows[i] > 1 || cols[j] > 1)) {
//         ans += 1
//       }
//     }
//   }
//   return ans
// }

// @lc code=end

const assert = require('node:assert/strict')

const res1 = countServers([[1,0],[0,1]])
assert.equal(res1, 0)

const res2 = countServers([[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]])
assert.equal(res2, 4)