/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */

// function solveNQueens(n) {
//   // 位运算回溯
//   // 时间复杂度(n!): 遍历棋盘的时间为O(n!)
//   // 第一个皇后有N个选择，第二个皇后最多N-1个选择，因此总的选择最多不超过N!
//   // 空间复杂度O(n): 递归的空间复杂度取决于n
//   if (n < 1) return [];
//   const solutions = [];
//   const queens = new Array(n).fill(-1);
//   solve(queens, n, 0, 0, 0, 0);
//   return solutions;
//   // columns表示列方向是否有皇后，1表示已放置皇后
//   // diagonals1 表示对角线撇方向是否有皇后
//   // diagonals2 表示对角线捺方向是否有皇后
//   function solve(queens, n, row, columns, diagonals1, diagonals2) {
//     if (row === n) {
//       solutions.push(generateBoard(queens, n));
//       return;
//     }
//     // 位运算得出可以放置皇后的位置（该结果的值为1的位置表示可以放置皇后的位置）
//     // (1 << n) - 1 表示为n个为1的二进制数，
//     // ~(columns | diagonals1 | diagonals2) 表示对三个反向已放置皇后之和的取反，也就是可以放置皇后的位置
//     let availablePositions = ((1 << n) - 1) & (~(columns | diagonals1 | diagonals2));
//     while (availablePositions !== 0) {
//       // x & (-x) 可以获得 x 的二进制表示中的最低位的 1 的位置，
//       // x & (x - 1) 可以将 xx 的二进制表示中的最低位的 1 置成 0
//       const position = availablePositions & (-availablePositions);
//       availablePositions &= (availablePositions - 1);
//       const column = bitCount(position - 1); // 0b1000 - 0b0001 = 0b0111，也就计算出列的位置了
//       queens[row] = column;
//       // 在当前行放置皇后后，如果放在第i位，则分别将三个整数的第i位置位1
//       solve(
//         queens,
//         n,
//         row + 1,
//         columns | position, // 进入下一个行时，无需位移，保持不变
//         (diagonals1 | position) << 1, // 撇方向需要右位移一位
//         (diagonals2 | position) >> 1, // 捺方向需要左位移一位
//       );
//       queens[row] = -1; // 回溯
//     }
//   }
//   // 生成棋局
//   function generateBoard(queens, n) {
//     const board = [];
//     for (let i = 0; i < n; i += 1) {
//       const row = new Array(n).fill('.');
//       row[queens[i]] = 'Q';
//       board.push(row.join(''));
//     }
//     return board;
//   }
//   // 计算二进制数中1的个数
//   function bitCount(number) {
//     let count = 0;
//     for (let i = 0; i < 32; i += 1) {
//       if ((number >> i) & 1) count += 1;
//     }
//     return count;
//   }
// }

// function solveNQueens(n) {
//   // 哈希+回溯
//   // 时间复杂度(n!): 遍历棋盘的时间为O(n!)
//   // 空间复杂度O(n): 递归的空间复杂度取决于n
//   if (n < 1) return [];
//   const solutions = [];
//   const queens = new Array(n).fill(-1);
//   const columns = new Set();
//   const diagonals1 = new Set(); // 撇 y + x
//   const diagonals2 = new Set(); // 捺 y - x
//   backtrack(queens, n, 0, columns, diagonals1, diagonals2);
//   return solutions;
//   function backtrack(queens, n, row, columns, diagonals1, diagonals2) {
//     if (row === n) {
//       solutions.push(generateBoard(queens, n));
//       return;
//     }
//     for (let i = 0; i < n; i += 1) {
//       if (
//         columns.has(i)
//         | diagonals1.has(row + i)
//         | diagonals2.has(row - i)
//       ) continue;
//       queens[row] = i;
//       columns.add(i);
//       diagonals1.add(row + i);
//       diagonals2.add(row - i);
//       backtrack(queens, n, row + 1, columns, diagonals1, diagonals2);
//       queens[row] = -1;
//       columns.delete(i);
//       diagonals1.delete(row + i);
//       diagonals2.delete(row - i);
//     }
//   }

//   // 生成棋局
//   function generateBoard(queens, n) {
//     const board = [];
//     for (let i = 0; i < n; i += 1) {
//       const row = new Array(n).fill('.');
//       row[queens[i]] = 'Q';
//       board.push(row.join(''));
//     }
//     return board;
//   }
// }

function solveNQueens(n) {
  // 回溯
  // 时间复杂度(n! * n): 遍历棋盘的时间为O(n!) 每次判断位置有效性的时间复杂度为O(n)
  // 空间复杂度O(n): 递归的空间复杂度取决于n
  if (n < 1) return [];
  const solutions = [];
  const board = new Array(n).fill(null).map(() => new Array(n).fill('.'));
  backtrack(board, n, 0);
  return solutions;
  function backtrack(board, n, row) {
    if (row === n) {
      const solution = board.map((item) => item.join(''));
      solutions.push([...solution]);
      return;
    }
    for (let i = 0; i < n; i += 1) {
      if (isVaild(board, row, i)) {
        board[row][i] = 'Q';
        backtrack(board, n, row + 1);
        board[row][i] = '.';
      }
    }
  }
  function isVaild(board, row, column) {
    // 列
    for (let i = row - 1; i >= 0; i -= 1) {
      if (board[i][column] === 'Q') return false;
    }
    // 捺
    for (let i = row - 1, j = column - 1; i >= 0 && j >= 0; i -= 1, j -= 1) {
      if (board[i][j] === 'Q') return false;
    }
    // 撇
    for (let i = row - 1, j = column + 1; i >= 0 && j < board.length; i -= 1, j += 1) {
      if (board[i][j] === 'Q') return false;
    }
    return true;
  }
}
//------
// function solveNQueens(n) {
//   // 回溯，用哈希表记录已占用的竖撇捺的，
//   // 时间复杂度(n!*n): 遍历棋盘的时间为O(n!)，将当前答案复制到答案数组中需要O(n)
//   // 第一个皇后有N个选择，第二个皇后最多N-1个选择，因此总的选择最多不超过N!
//   // 空间复杂度O(n): 递归的空间复杂度取决于n
//   if (n < 1) return [];
//   const ans = [];
//   const row = [];
//   const col = new Set();
//   const pie = new Set();
//   const na = new Set();
//   backtrack(0);
//   return ans;
//   function backtrack(level) {
//     if (level === n) {
//       ans.push(formatRow(row));
//     }
//     for (let i = 0; i < n; i += 1) {
//       if (col.has(i) || pie.has(level + i) || na.has(level - i)) {
//         continue;
//       }
//       row.push(i);
//       col.add(i);
//       pie.add(level + i);
//       na.add(level - i);
//       backtrack(level + 1);
//       row.pop();
//       col.delete(i);
//       pie.delete(level + i);
//       na.delete(level - i);
//     }
//   }
//   function formatRow(row) {
//     const res = [];
//     for (const num of row) {
//       let str = '';
//       for (let i = 0; i < n; i += 1) {
//         str += num === i ? 'Q' : '.';
//       }
//       res.push(str);
//     }
//     return res;
//   }
// }
// @lc code=end

const res1 = solveNQueens(4);
// [[".Q..","...Q","Q...","..Q."],
//  ["..Q.","Q...","...Q",".Q.."]]

/**
  皇后的攻击方式是横竖撇捺，彼此不能攻击，那相互之间就不能落在攻击区域内
  row 行，横
  column 列，竖
  pie 撇
  na 捺
  直线的方程式为 y = ax + b (a为斜率，b为常量)，这里a为正负一，
  撇捺是否一占用，只需求出b即可
  对撇 b = y + x => col + row
  捺 b = y - x => row - col
 */
