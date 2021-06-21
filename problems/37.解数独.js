/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=37 lang=javascript
 *
 * [37] 解数独
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

function solveSudoku(board) {
  // 回溯 + 位运算优化
  const spaces = [];
  const rows = new Array(9).fill(0);
  const cols = new Array(9).fill(0);
  const blocks = new Array(9).fill(0);
  let valid = false;

  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (board[i][j] === '.') {
        spaces.push([i, j]);
      } else {
        flip(i, j, board[i][j] - 1);
      }
    }
  }

  backtrack(0);

  function backtrack(pos) {
    if (pos === spaces.length) {
      valid = true;
      return;
    }
    const [i, j] = spaces[pos];
    const k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
    let mask = ~(rows[i] | cols[j] | blocks[k]) & 0x1ff; // 取反
    // mask &= (mask - 1) 去掉最后的一位1
    // mask & (-mask) 表示获取最后的一位1对应的二进制数
    for (; !valid && mask; mask &= (mask - 1)) {
      const digitMask = mask & (-mask);
      const digit = bitCnt(digitMask - 1);
      flip(i, j, digit);
      board[i][j] = String(digit + 1);
      backtrack(pos + 1);
      flip(i, j, digit);
    }
  }

  // 对第digit位进行异或处理
  function flip(i, j, digit) {
    const k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
    rows[i] ^= (1 << digit);
    cols[j] ^= (1 << digit);
    blocks[k] ^= (1 << digit);
  }
  function bitCnt(num) {
    let cnt = 0;
    for (let i = 0; i < 32; i += 1) {
      if ((num >> i) & 1) {
        cnt += 1;
      }
    }
    return cnt;
  }
}

// function solveSudoku(board) {
//   // 回溯
//   const spaces = []; // 存放空格坐标
//   const rows = new Array(9).fill(0).map(() => new Array(9).fill(false));
//   const cols = new Array(9).fill(0).map(() => new Array(9).fill(false));
//   const blocks = new Array(9).fill(0).map(() => new Array(9).fill(false));
//   let valid = false;

//   for (let i = 0; i < 9; i += 1) {
//     for (let j = 0; j < 9; j += 1) {
//       if (board[i][j] === '.') {
//         spaces.push([i, j]);
//       } else {
//         const digit = board[i][j] - 1;
//         const k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
//         rows[i][digit] = true;
//         cols[j][digit] = true;
//         blocks[k][digit] = true;
//       }
//     }
//   }
//   backtrack(0);
//   return board;

//   function backtrack(pos) {
//     if (pos === spaces.length) {
//       valid = true;
//       return;
//     }
//     const space = spaces[pos];
//     const i = space[0];
//     const j = space[1];
//     const k = Math.floor(i / 3) * 3 + Math.floor(j / 3);
//     for (let digit = 0; digit < 9 && !valid; digit += 1) {
//       if (!rows[i][digit] && !cols[j][digit] && !blocks[k][digit]) {
//         rows[i][digit] = true;
//         cols[j][digit] = true;
//         blocks[k][digit] = true;
//         board[i][j] = String(digit + 1);
//         backtrack(pos + 1);
//         rows[i][digit] = false;
//         cols[j][digit] = false;
//         blocks[k][digit] = false;
//       }
//     }
//   }
// }

// function solveSudoku(board) {
//   // 回溯+哈希表
//   // time complexity O(9^(9*9)): 把无效情况也考虑进去的话，状态树就是个9叉树，深度为81
//   // 每个格子有九个数字可以填写，总共有81个格子
//   // space complexity O(9*9): 3个哈希表，每个哈希表的空间复杂度为O(9*9)
//   const rows = new Array(9).fill(0).map(() => new Set());
//   const cols = new Array(9).fill(0).map(() => new Set());
//   const blocks = new Array(9).fill(0).map(() => new Set());
//   // 预扫描矩阵
//   for (let i = 0; i < 9; i += 1) {
//     for (let j = 0; j < 9; j += 1) {
//       const num = board[i][j];
//       if (num === '.') continue;
//       rows[i].add(num);
//       cols[j].add(num);
//       blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(num);
//     }
//   }
//   backtrack(0);
//   return board;
//   // [r,c]尝试填1-9，填入数字后棋盘仍是有效的话，递归下一个节点，
//   // 如果递归过程中，结果无效，则返回false，进行回溯
//   // 可以最后一个位置，则返回true，不用在回溯了
//   function backtrack(pos) {
//     const r = Math.floor(pos / 9);
//     const c = pos % 9;
//     // 都填写完，说明填写的是有效的，返回true
//     if (pos === 9 * 9) return true;
//     // 非空格跳过，继续下一个格子的处理
//     if (board[r][c] !== '.') return backtrack(pos + 1);
//     for (let num = 1; num <= 9; num += 1) {
//       const numStr = String(num);
//       const k = Math.floor(r / 3) * 3 + Math.floor(c / 3);
//       if (
//         rows[r].has(numStr)
//         || cols[c].has(numStr)
//         || blocks[k].has(numStr)
//       ) continue;
//       board[r][c] = numStr;
//       rows[r].add(numStr);
//       cols[c].add(numStr);
//       blocks[k].add(numStr);
//       // 递归的结果为true，说明填写的数字不会导致之后的棋局为无效，直接返回true无需再递归
//       if (backtrack(pos + 1)) return true;
//       board[r][c] = '.';
//       rows[r].delete(numStr);
//       cols[c].delete(numStr);
//       blocks[k].delete(numStr);
//     }
//     // 都没找到合适的，说明之前的选择是无效，返回false
//     return false;
//   }
// }
// @lc code=end

const res1 = solveSudoku([
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]);
// [
//   ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
//   ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
//   ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
//   ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
//   ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
//   ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
//   ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
//   ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
//   ['3', '4', '5', '2', '8', '6', '1', '7', '9'],
// ];

// 解法
// 1. 回溯+哈希表，rows, cols, blocks
// [r,c]尝试填1-9，填入数字后棋盘仍是有效的话，递归下一个节点，
// 如果递归过程中，结果无效，则返回false，进行回溯
// 可以最后一个位置，则返回true，不用在回溯了
// 2. 对1的优化，哈希表优化成位运算处理
// 3. 对2的继续优化
// 如果一个空白格只有唯一的数可以填入，也就是其对应的b值和b-1进行按位与运算后得到0
// （即b中只有一个二进制位为1）此时，我们就可以确定这个空白格填入的数，而不用等到递归时再去处理它。
// 这样一来，我们可以不断地对整个数独进行遍历，将可以唯一确定的空白格全部填入对应的数。随后我们再使用与方法二相同的方法对剩余无法唯一确定的空白格进行递归 + 回溯。
