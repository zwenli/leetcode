/*
 * @lc app=leetcode.cn id=934 lang=javascript
 *
 * [934] 最短的桥
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
function shortestBridge(grid) {
  // bfs + dfs
  // time complexity O(n^2)
  // space complexity O(n^2)
  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]
  const n = grid.length
  const queue = []
  let found = false
  // dfs 找到其中一个岛屿，记录坐标
  for (let i = 0; i < n; i++) {
    if (found) break
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        dfs(i, j)
        found = true
        break
      }
    }
  }
  let step = 0
  // bfs，通过队列中的坐标向四周扩散遍历
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      const [r, c] = queue.shift()
      for (const dir of dirs) {
        const nr = r + dir[0]
        const nc = c + dir[1]
        if (!isValid(nr, nr)) continue
        if (grid[nr][nc] === 1) return step
        if (grid[nr][nc] === 0) {
          queue.push([nr, nc])
          grid[nr][nc] = -1
        }
      }
    }
    step += 1
  }
  return -1

  function dfs(r, c) {
    if (!isValid(r, c)) return
    if (grid[r][c] !== 1) return
    queue.push([r, c])
    grid[r][c] = -1 // 标记已访问
    for (const dir of dirs) {
      dfs(r + dir[0], c + dir[1])
    }
  }

  function isValid(r, c) {
    return r >= 0 && r < n && c >= 0 && c < n
  }
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = shortestBridge([
  [0, 1],
  [1, 0],
])
assert.equal(res1, 1)

const res2 = shortestBridge([
  [0, 1, 0],
  [0, 0, 0],
  [0, 0, 1],
])
assert.equal(res2, 2)

const res3 = shortestBridge([
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
])
assert.equal(res3, 1)
