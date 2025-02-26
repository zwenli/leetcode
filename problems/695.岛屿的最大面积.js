/*
 * @lc app=leetcode.cn id=695 lang=javascript
 *
 * [695] 岛屿的最大面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
// TODO: bfs

// var maxAreaOfIsland = function (grid) {
//   // dfs
//   // time complexity O(m*n)
//   // space complexity O(m*n)
//   const m = grid.length
//   const n = grid[0].length
//   const visited = new Set()
//   const dx = [1, 0, -1, 0]
//   const dy = [0, 1, 0, -1]
//   let ans = 0
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (grid[i][j] === 1 && !visited.has(i * n + j)) {
//         ans = Math.max(ans, dfs(i, j))
//       }
//     }
//   }
//   return ans
//   function dfs(i, j) {
//     let area = 1
//     visited.add(i * n + j)
//     for (let k = 0; k < 4; k++) {
//       const ni = i + dx[k]
//       const nj = j + dy[k]
//       if (
//         ni >= 0 &&
//         ni < m &&
//         nj >= 0 &&
//         nj < n &&
//         grid[ni][nj] === 1 &&
//         !visited.has(ni * n + nj)
//       ) {
//         area += dfs(ni, nj)
//       }
//     }
//     return area
//   }
// }
// var maxAreaOfIsland = function (grid) {
//   // dfs
//   // time complexity O(m*n)
//   // space complexity O(m*n)
//   const m = grid.length
//   const n = grid[0].length
//   const visited = new Set()
//   let ans = 0
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (grid[i][j] === 1 && !visited.has(i * n + j)) {
//         ans = Math.max(ans, dfs(i, j))
//       }
//     }
//   }
//   return ans
//   function dfs(i, j) {
//     if (
//       i < 0 ||
//       j < 0 ||
//       i >= m ||
//       j >= n ||
//       grid[i][j] === 0 ||
//       visited.has(i * n + j)
//     ) {
//       return 0
//     }
//     visited.add(i * n + j)
//     return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1)
//   }
// }

function maxAreaOfIsland(grid) {
  // 并查集
  const m = grid.length
  const n = grid[0].length
  const getIdx = (i, j) => i * n + j
  const uf = new UnionFind()
  let result = grid[0][0]
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) continue
      if (i > 0 && grid[i - 1][j] === 1) {
        uf.union(getIdx(i - 1, j), getIdx(i, j))
      }
      if (j > 0 && grid[i][j - 1] === 1) {
        uf.union(getIdx(i, j - 1), getIdx(i, j))
      }
      result = Math.max(result, uf.getSize(getIdx(i, j)))
    }
  }
  return result
}

class UnionFind {
  constructor() {
    this.parent = new Map()
    this.sizes = new Map()
  }
  find(x) {
    if (!this.parent.has(x)) {
      this.parent.set(x, x)
    }
    if (!this.sizes.has(x)) {
      this.sizes.set(x, 1)
    }
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)))
    }
    return this.parent.get(x)
  }
  union(x, y) {
    const px = this.find(x)
    const py = this.find(y)
    if (px === py) return
    if (this.sizes.get(px) > this.sizes.get(py)) {
      this.parent.set(py, px)
      this.sizes.set(px, this.sizes.get(px) + this.sizes.get(py))
    } else {
      this.parent.set(px, py)
      this.sizes.set(py, this.sizes.get(px) + this.sizes.get(py))
    }
  }
  getSize(x) {
    return this.sizes.get(this.find(x))
  }
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = maxAreaOfIsland([
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
])
assert.equal(res1, 6)

const res2 = maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]])
assert.equal(res2, 0)
