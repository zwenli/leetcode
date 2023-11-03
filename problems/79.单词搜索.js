/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length
  const n = board[0].length
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const visited = new Array(m).fill(false).map(() => new Array(n).fill(false))

  const backtrack = (i, j, k) => {
    if (board[i][j] !== word[k]) {
      return false
    }
    if (k === word.length - 1) {
      return true
    }

    visited[i][j] = true
    let res = false
    for (let [dx, dy] of dirs) {
      const ni = i + dx
      const nj = j + dy
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj]) {
        if (backtrack(ni, nj, k + 1)) {
          res = true
          break
        }
      }
    }

    visited[i][j] = false
    return res
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (backtrack(i, j, 0)) {
        return true
      }
    }
  }
  return false
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'SEE'
)
assert.equal(res1, true)

const res2 = exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCD'
)
assert.equal(res2, false)

const res3 = exist(
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCCED'
)
assert.equal(res3, true)

const res4 = exist(
  [
    ['C', 'A', 'A'],
    ['A', 'A', 'A'],
    ['B', 'C', 'D'],
  ],
  'AAB'
)
assert.equal(res4, true)
