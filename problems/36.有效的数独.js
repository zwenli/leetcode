/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=36 lang=javascript
 *
 * [36] 有效的数独
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {boolean}
 */

function isValidSudoku(board) {
  // 一次迭代+哈希+位运算
  // time complexity O(n^2): 遍历一次矩阵的时间
  // space complexiyt O(n): 3个数组，每个数组的空间为O(n)
  if (!board || !board.length) return false;
  const n = board.length;
  const rows = new Array(n).fill(0);
  const cols = new Array(n).fill(0);
  const blocks = new Array(n).fill(0); // 3*3
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      let num = board[i][j];
      if (num === '.') continue;
      num -= 0;
      const bIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if (((rows[i] >> num) & 1)
        || ((cols[j] >> num) & 1)
        || ((blocks[bIdx] >> num) & 1)) {
        return false;
      }
      rows[i] |= 1 << num;
      cols[j] |= 1 << num;
      blocks[bIdx] |= 1 << num;
    }
  }
  return true;
}
// function isValidSudoku(board) {
//   // 一次迭代+哈希
//   // time complexity O(n^2): 遍历一次矩阵的时间
//   // space complexiyt O(n^2): 三个哈希表，每个哈希表的空间为O(n^3)
//   if (!board || !board.length) return false;
//   const n = board.length;
//   const rows = new Array(n).fill(0).map(() => new Set());
//   const cols = new Array(n).fill(0).map(() => new Set());
//   const blocks = new Array(n).fill(0).map(() => new Set()); // 3*3
//   for (let i = 0; i < n; i += 1) {
//     for (let j = 0; j < n; j += 1) {
//       const num = board[i][j];
//       if (num === '.') continue;
//       // 在第i行，或第j列，或第i/3*3+ j/3区块内已填写了这个数字，
//       // 说明重复了，返回false
//       if (rows[i].has(num)
//         || cols[j].has(num)
//         || blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)].has(num)) {
//         return false;
//       }
//       // 没有重复数字的话，将数字填写在对应行，列，块中，继续迭代
//       rows[i].add(num);
//       cols[j].add(num);
//       blocks[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(num);
//     }
//   }
//   return true;
// }
// @lc code=end

const res1 = isValidSudoku([
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
// true

const res2 = isValidSudoku([
  ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]);
// false
