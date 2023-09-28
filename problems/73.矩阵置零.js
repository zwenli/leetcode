/*
 * @lc app=leetcode.cn id=73 lang=javascript
 *
 * [73] 矩阵置零
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const m = matrix.length
  const n = matrix[0].length
  let flagCol0 = false
  let flagRow0 = false
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      flagCol0 = true
    }
  }
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      flagRow0 = true
    }
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = matrix[0][j] = 0
      }
    }
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0
      }
    }
  }
  if (flagCol0) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0
    }
  }
  if (flagRow0) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0
    }
  }
}

// var setZeroes = function (matrix) {
//   // 使用标记数组, 用两个标记数组分别记录每一行和每一列是否有零出现。
//   // time complexity O(m*n)
//   // space complexity O(m+n)
//   const m = matrix.length
//   const n = matrix[0].length
//   const row = new Array(m).fill(false)
//   const col = new Array(n).fill(false)
//   // 首先遍历该数组一次，如果某个元素为0，那么就将该元素所在的行和列所对应标记数组的位置置为 true。
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (matrix[i][j] === 0) {
//         row[i] = col[j] = true
//       }
//     }
//   }
//   // 再次遍历该数组，用标记数组更新原数组即可。
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (row[i] || col[j]) {
//         matrix[i][j] = 0
//       }
//     }
//   }
// }
// @lc code=end
const assert = require('node:assert/strict')

const res1 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
]
setZeroes(res1)
assert.deepEqual(res1, [
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1],
])

const res2 = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
]
setZeroes(res2)
assert.deepEqual(res2, [
  [0, 0, 0, 0],
  [0, 4, 5, 0],
  [0, 3, 1, 0],
])
