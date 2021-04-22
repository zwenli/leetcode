/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=529 lang=javascript
 *
 * [529] 扫雷游戏
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */

function updateBoard(board, click) {
  // bfs, 不加缓存会超时
  // 时间复杂度O(mn): m，n分别为长和宽，最坏情况下会遍历整个面板
  // 空间复杂度O(mn): 需要额外空间记录访问记录，大小为面板的大小O(mn)
  if (!board || !board.length || !board[0].length) return board;
  const xSize = board.length;
  const ySize = board[0].length;
  const xDir = [-1, 0, 1, 0, 1, 1, -1, -1];
  const yDir = [0, -1, 0, 1, 1, -1, 1, -1];
  const [x, y] = click;
  if (board[x][y] === 'M') {
    // 规则1
    board[x][y] = 'X';
  } else {
    bfs(x, y);
  }
  return board;

  function bfs(x, y) {
    const queue = [[x, y]];
    const visited = new Array(xSize).fill(null).map(() => new Array(ySize).fill(false));
    visited[x][y] = true;
    while (queue.length) {
      const [cx, cy] = queue.shift();
      let cnt = 0;
      for (let i = 0; i < 8; i += 1) {
        const tx = cx + xDir[i];
        const ty = cy + yDir[i];
        if (tx < 0 || tx >= xSize || ty < 0 || ty >= ySize) {
          continue;
        }
        if (board[tx][ty] === 'M') {
          cnt += 1;
        }
      }
      if (cnt > 0) {
        // 规则3
        board[cx][cy] = String(cnt);
      } else {
        // 规则2
        board[cx][cy] = 'B';
        for (let i = 0; i < 8; i += 1) {
          const tx = cx + xDir[i];
          const ty = cy + yDir[i];
          if (tx < 0 || tx >= xSize || ty < 0 || ty >= ySize || board[tx][ty] !== 'E' || visited[tx][ty]) {
            continue;
          }
          queue.push([tx, ty]);
          visited[tx][ty] = true;
        }
      }
    }
  }
}
// function updateBoard(board, click) {
//   // dfs
//   // 时间复杂度O(mn): m，n分别为长和宽，最坏情况下会遍历整个面板
//   // 空间复杂度O(mn): 空间复杂度取决与递归调用栈的大小，最坏情况下要遍历整个面板（3*3点击中间）
//   if (!board || !board.length || !board[0].length) return board;
//   const xSize = board.length;
//   const ySize = board[0].length;
//   const xDir = [-1, 0, 1, 0, 1, 1, -1, -1];
//   const yDir = [0, -1, 0, 1, 1, -1, 1, -1];
//   const [x, y] = click;
//   if (board[x][y] === 'M') {
//     // 规则1
//     board[x][y] = 'X';
//   } else {
//     dfs(x, y);
//   }
//   return board;

//   function dfs(x, y) {
//     let cnt = 0;
//     for (let i = 0; i < 8; i += 1) {
//       const tx = x + xDir[i];
//       const ty = y + yDir[i];
//       if (tx < 0 || tx >= xSize || ty < 0 || ty >= ySize) {
//         continue;
//       }
//       if (board[tx][ty] === 'M') {
//         cnt += 1;
//       }
//     }
//     if (cnt > 0) {
//       // 规则3
//       board[x][y] = String(cnt);
//     } else {
//       // 规则2
//       board[x][y] = 'B';
//       for (let i = 0; i < 8; i += 1) {
//         const tx = x + xDir[i];
//         const ty = y + yDir[i];
//         if (tx < 0 || tx >= xSize || ty < 0 || ty >= ySize || board[tx][ty] !== 'E') {
//           // 越界或 不是 未挖出的空方块E，无需递归
//           continue;
//         }
//         dfs(tx, ty);
//       }
//     }
//   }
// }
// @lc code=end

const res1 = updateBoard(
  [['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'M', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E']],
  [3, 0],
);
// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'M', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]

const res2 = updateBoard(
  [['B', '1', 'E', '1', 'B'],
    ['B', '1', 'M', '1', 'B'],
    ['B', '1', '1', '1', 'B'],
    ['B', 'B', 'B', 'B', 'B']],
  [1, 2],
);
// [['B', '1', 'E', '1', 'B'],
//  ['B', '1', 'X', '1', 'B'],
//  ['B', '1', '1', '1', 'B'],
//  ['B', 'B', 'B', 'B', 'B']]

// dfs
// bfs
