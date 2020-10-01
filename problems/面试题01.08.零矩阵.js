/* eslint-disable no-param-reassign */
/**
 * 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。
 * https://leetcode-cn.com/problems/zero-matrix-lcci/
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix) {
  // 记录需要清空的行和列
  const rows = matrix.length;
  const cols = matrix[0].length;
  const clearRow = [];
  const clearCol = [];
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (matrix[i][j] === 0) {
        if (!clearRow.includes(i)) {
          clearRow.push(i);
        }
        if (!clearCol.includes(j)) {
          clearCol.push(j);
        }
      }
    }
  }
  // 行
  clearRow.forEach((i) => {
    for (let j = 0; j < cols; j += 1) {
      matrix[i][j] = 0;
    }
  });
  // 列
  clearCol.forEach((j) => {
    for (let i = 0; i < rows; i += 1) {
      matrix[i][j] = 0;
    }
  });
}

// function setZeroes(matrix) {
//   // 暴力破解
//   const hasSet = new Set();
//   const rows = matrix.length;
//   const cols = matrix[0].length;
//   for (let i = 0; i < rows; i += 1) {
//     for (let j = 0; j < cols; j += 1) {
//       if (hasSet.has([i, j].toString())) {
//         continue;
//       }
//       if (matrix[i][j] !== 0) {
//         continue;
//       }
//       // 遇到0
//       // 行
//       for (let sj = 0; sj < cols; sj += 1) {
//         if (sj === j) continue;
//         if (hasSet.has([i, sj].toString())) {
//           continue;
//         }
//         if (matrix[i][sj] !== 0) {
//           matrix[i][sj] = 0;
//           hasSet.add([i, sj].toString());
//         }
//       }
//       // 列
//       for (let si = 0; si < rows; si += 1) {
//         if (si === i) continue;
//         if (hasSet.has([si, j].toString())) {
//           continue;
//         }
//         if (matrix[si][j] !== 0) {
//           matrix[si][j] = 0;
//           hasSet.add([si, j].toString());
//         }
//       }
//     }
//   }
// }

const res1 = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];

setZeroes(res1);
console.log(res1);
