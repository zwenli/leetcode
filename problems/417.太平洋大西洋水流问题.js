/*
 * @lc app=leetcode.cn id=417 lang=javascript
 *
 * [417] 太平洋大西洋水流问题
 */

// @lc code=start
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
// TODO: 并查集


var pacificAtlantic = function (heights) {
  // bfs
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const res = []
  const m = heights.length
  const n = heights[0].length
  // 左上
  const pacific = new Array(m).fill(false).map(() => new Array(n).fill(false))
  const pQueue = []
  // 右下
  const altantic = new Array(m).fill(false).map(() => new Array(n).fill(false))
  const aQueue = []
  // 收集上下边界节点
  for (let i = 0; i < m; i++) {
    if (!pacific[i][0]) {
      pacific[i][0] = true
      pQueue.push([i, 0])
    }
    if (!altantic[i][n - 1]) {
      altantic[i][n - 1] = true
      aQueue.push([i, n - 1])
    }
  }
  // 收集左右边界节点
  for (let j = 0; j < n; j++) {
    if (!pacific[0][j]) {
      pacific[0][j] = true
      pQueue.push([0, j])
    }
    if (!altantic[m - 1][j]) {
      altantic[m - 1][j] = true
      aQueue.push([m - 1, j])
    }
  }
  bfs(pacific, pQueue)
  bfs(altantic, aQueue)
  // 找交集
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && altantic[i][j]) {
        res.push([i, j])
      }
    }
  }
  return res
  function bfs(ocean, queue) {
    while (queue.length) {
      const [x, y] = queue.shift()
      for (const d of dir) {
        const dx = x + d[0]
        const dy = y + d[1]
        if (
          dx < 0 ||
          dx >= m ||
          dy < 0 ||
          dy >= n ||
          ocean[dx][dy] ||
          heights[dx][dy] < heights[x][y]
        ) {
          continue
        }
        ocean[dx][dy] = true
        queue.push([dx, dy])
      }
    }
  }
}
// var pacificAtlantic = function (heights) {
//   // dfs
//   // time complexity O(mn): dfs最多每个节点2次。
//   // space complexity O(mn): 递归深度最大可为mn，
//   const dir = [
//     [-1, 0],
//     [1, 0],
//     [0, -1],
//     [0, 1],
//   ]
//   const res = []
//   const m = heights.length
//   const n = heights[0].length
//   // 左上，可流向太平洋的节点设置为true
//   const pacific = new Array(m).fill(false).map(() => new Array(n).fill(false))
//   // 右下，可流向大西洋的节点设置为true
//   const altantic = new Array(m).fill(false).map(() => new Array(n).fill(false))
//   // 从边界反向搜索寻找雨水流向边界的单元格，反向搜索时，每次只能移动到高度相同或更大的单元格
//   // 上下遍历
//   for (let i = 0; i < m; i++) {
//     dfs(pacific, i, 0)
//     dfs(altantic, i, n - 1)
//   }
//   // 左右遍历
//   for (let j = 0; j < n; j++) {
//     dfs(pacific, 0, j)
//     dfs(altantic, m - 1, j)
//   }
//   // 找交集，即同时满足流向太平洋和大西洋
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (pacific[i][j] && altantic[i][j]) {
//         res.push([i, j])
//       }
//     }
//   }
//   return res
//   function dfs(ocean, x, y) {
//     if (ocean[x][y]) return
//     ocean[x][y] = true
//     for (const d of dir) {
//       const nx = x + d[0]
//       const ny = y + d[1]
//       if (
//         nx >= 0 &&
//         nx < m &&
//         ny >= 0 &&
//         ny < n &&
//         heights[nx][ny] >= heights[x][y]
//       ) {
//         dfs(ocean, nx, ny)
//       }
//     }
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
])
assert.deepEqual(res1, [
  [0, 4],
  [1, 3],
  [1, 4],
  [2, 2],
  [3, 0],
  [3, 1],
  [4, 0],
])

const res2 = pacificAtlantic([
  [2, 1],
  [1, 2],
])
assert.deepEqual(res2, [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
])
