/*
 * @lc app=leetcode.cn id=999 lang=javascript
 *
 * [999] 可以被一步捕获的棋子数
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function (board) {
  const dfs = (x, y, dx, dy) => {
    if (x < 0 || x >= 8 || y < 0 || y >= 8 || board[x][y] === 'B') return
    if (board[x][y] === 'p') {
      ans += 1
      return
    }
    dfs(x + dx, y + dy, dx, dy)
  }

  let ans = 0
  let found = false
  for (let i = 0; i < 8 && !found; i++) {
    for (let j = 0; j < 8 && !found; j++) {
      if (board[i][j] === 'R') {
        found = true
        dfs(i + 1, j, 1, 0)
        dfs(i - 1, j, -1, 0)
        dfs(i, j + 1, 0, 1)
        dfs(i, j - 1, 0, -1)
      }
    }
  }
  return ans
}
// @lc code=end
