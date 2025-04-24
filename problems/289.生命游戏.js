/*
 * @lc app=leetcode.cn id=289 lang=javascript
 *
 * [289] 生命游戏
 */

// @lc code=start
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

// TODO: https://leetcode.com/problems/game-of-life/solutions/73223/easiest-java-solution-with-explanation/?envType=study-plan-v2&envId=top-interview-150
// 位运算优化

var gameOfLife = function (board) {
  // 原数组修改，通过增加额外的状态
  // 在原来基础上增加两个复合状态
  // -1: 代表这个细胞过去是活的现在死了 1 -> 0
  // 2: 代表这个细胞过去是死的现在活了  0 -> 1
  const neighbors = [1, 0, -1]
  const m = board.length
  const n = board[0].length

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let liveNeighbors = 0
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (neighbors[i] === 0 && neighbors[j] === 0) continue

          const nr = r + neighbors[i]
          const nc = c + neighbors[j]

          if (
            nr >= 0 &&
            nr < m &&
            nc >= 0 &&
            nc < n &&
            Math.abs(board[nr][nc]) === 1
          ) {
            liveNeighbors += 1
          }
        }
      }

      if (board[r][c] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        board[r][c] = -1
      }
      if (board[r][c] === 0 && liveNeighbors === 3) {
        board[r][c] = 2
      }
    }
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] > 0) {
        board[r][c] = 1
      } else {
        board[r][c] = 0
      }
    }
  }
}

// var gameOfLife = function (board) {
//   const neighbors = [1, 0, -1]
//   const m = board.length
//   const n = board[0].length
//   const copyBoard = Array.from({ length: m }, () => Array.from({ length: n }))
//   for (let r = 0; r < m; r++) {
//     for (let c = 0; c < n; c++) {
//       copyBoard[r][c] = board[r][c]
//     }
//   }
//   for (let r = 0; r < m; r++) {
//     for (let c = 0; c < n; c++) {

//       // 统计相邻位置里的活细胞数量
//       let liveNeighbors = 0

//       for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//           if (neighbors[i] === 0 && neighbors[j] === 0) continue

//           const nr = r + neighbors[i]
//           const nc = c + neighbors[j]
//           if (nr >= 0 && nr < m && nc >= 0 && nc < n && copyBoard[nr][nc] === 1) {
//             liveNeighbors++
//           }
//         }
//       }

//       // 判断规则
//       // rule 1. 3
//       if (copyBoard[r][c] === 1 && (liveNeighbors > 3 || liveNeighbors < 2)) {
//         board[r][c] = 0
//       }
//       // rule 4
//       if (copyBoard[r][c] === 0 && liveNeighbors === 3) {
//         board[r][c] = 1
//       }
//     }
//   }
// }
// @lc code=end
