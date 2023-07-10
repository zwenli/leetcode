/*
 * @lc app=leetcode.cn id=419 lang=javascript
 *
 * [419] 甲板上的战舰
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {number}
 */
// var countBattleships = function (board) {
//   const DIRS = [
//     [1, 0],
//     [0, 1],
//     [-1, 0],
//     [0, -1],
//   ]
//   const m = board.length
//   const n = board[0].length
//   let cnt = 0

//   const dfs = (i, j) => {
//     if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'X') {
//       return
//     }
//     board[i][j] = 'O'
//     for (let [dx, dy] of DIRS) {
//       dfs(i + dx, j + dy)
//     }
//   }

//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (board[i][j] === 'X') {
//         cnt += 1
//         dfs(i, j)
//       }
//     }
//   }

//   return cnt
// }

var countBattleships = function (board) {
  // 战舰只能是 1 * N，或者 N * 1 的子矩阵组成
  // 两艘战舰之间至少有一个水平或垂直的空位分隔，没有相邻的战舰。
  // 那我们我们只需要枚举每个战舰左上顶点即可统计战舰的个数。

  const m = board.length
  const n = board[0].length
  let cnt = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === '.') continue
      if (i > 0 && board[i - 1][j] === 'X') continue
      if (j > 0 && board[i][j - 1] === 'X') continue
      cnt += 1
    }
  }
  return cnt
}
// @lc code=end
