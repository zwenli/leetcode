/*
 * @lc app=leetcode.cn id=909 lang=javascript
 *
 * [909] 蛇梯棋
 */

// @lc code=start
/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
  // 广度优先搜索
  const n = board.length
  const visited = new Array(n * n + 1).fill(false)
  const queue = [[1, 0]] // [起点，移动次数]
  while (queue.length) {
    const p = queue.shift()
    for (let i = 1; i <= 6; i++) {
      let nxt = p[0] + i
      if (nxt > n * n) break // 超出边界
      const [r, c] = id2rc(nxt, n) // 得到下一步的行列
      if (board[r][c] > 0) {
        // 存在蛇或梯子
        nxt = board[r][c]
      }
      if (nxt === n * n) {
        // 到达终点
        return p[1] + 1
      }
      if (!visited[nxt]) {
        visited[nxt] = true
        queue.push([nxt, p[1] + 1]) // 扩展新状态
      }
    }
  }
  return -1
}

const id2rc = (id, n) => {
  let r = Math.floor((id - 1) / n)
  let c = (id - 1) % n
  if (r % 2 === 1) {
    c = n - 1 - c
  }
  return [n - 1 - r, c]
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = snakesAndLadders([
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1],
])

assert.equal(res1, 4)
