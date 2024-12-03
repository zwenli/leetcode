/*
 * @lc app=leetcode.cn id=886 lang=javascript
 *
 * [886] 可能的二分法
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
// var possibleBipartition = function (n, dislikes) {
//   // 用并查集判断
//   // 由于最后只有两组，所以某一个人全部不喜欢人一定会在同一个组中，
//   // 我们可以用「并查集」进行连接，并判断这个人是否与他不喜欢的人相连，
//   // 如果相连则表示存在冲突，否则说明此人和他不喜欢的人在当前可以进行合法分组。
//   const uf = new UnionFind()
//   const g = Array.from({ length: n + 1 }, () => [])
//   for (const p of dislikes) {
//     g[p[0]].push(p[1])
//     g[p[1]].push(p[0])
//   }
//   for (let i = 1; i <= n; i++) {
//     for (let j = 0; j < g[i].length; j++) {
//       uf.union(g[i][0], g[i][j])
//       if (uf.isConnected(i, g[i][j])) return false
//     }
//   }
//   return true
// }

// class UnionFind {
//   constructor() {
//     this.parent = new Map()
//     this.count = 0
//   }
//   find(p) {
//     if (this.parent.get(p) === undefined) {
//       this.parent.set(p, p)
//       this.count++
//     }
//     if (this.parent.get(p) !== p) {
//       this.parent.set(p, this.find(this.parent.get(p)))
//     }
//     return this.parent.get(p)
//   }
//   union(i, j) {
//     const iRoot = this.find(i)
//     const jRoot = this.find(j)
//     if (iRoot === jRoot) return
//     this.parent.set(iRoot, jRoot)
//     this.count--
//   }
//   isConnected(i, j) {
//     return this.find(i) === this.find(j)
//   }
// }

var possibleBipartition = function (n, dislikes) {
  // dfs、染色法
  const UNCOLORED = 0
  const RED = 1
  // const GREEN = -1
  const color = Array.from({ length: n + 1 }, () => UNCOLORED)
  const graph = Array.from({ length: n + 1 }, () => [])
  for (const p of dislikes) {
    graph[p[0]].push(p[1])
    graph[p[1]].push(p[0])
  }
  const draw = (node, c) => {
    color[node] = c
    for (const neighbor of graph[node]) {
      if (color[neighbor] === c) {
        return false
      } else if (color[neighbor] === UNCOLORED && !draw(neighbor, -c)) {
        return false
      }
    }
    return true
  }
  for (let i = 1; i <= n; i++) {
    if (color[i] === 0 && !draw(i, RED)) {
      return false
    }
  }
  return true
}

// @lc code=end
const assert = require('node:assert/strict')

const res1 = possibleBipartition(10, [
  [1, 2],
  [3, 4],
  [5, 6],
  [6, 7],
  [8, 9],
  [7, 8],
])
assert.equal(res1, true)
