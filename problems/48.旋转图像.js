/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// function rotate(matrix) {
//   // 2. 原地旋转
//   // time complexity: O(n^2)
//   // space complexity: O(1)
//   const n = matrix.length
//   for (let row = 0; row < Math.floor(n / 2); row += 1) {
//     for (let col = 0; col < Math.floor((n + 1) / 2); col += 1) {
//       const temp = matrix[row][col]
//       matrix[row][col] = matrix[n - col - 1][row]
//       matrix[n - col - 1][row] = matrix[n - row - 1][n - col - 1]
//       matrix[n - row - 1][n - col - 1] = matrix[col][n - row - 1]
//       matrix[col][n - row - 1] = temp
//     }
//   }
// }

function rotate(matrix) {
  // 3. 翻转替代旋转
  // time complexity: O(n^2)
  // space complexity: O(1)
  const n = matrix.length
  // 水平翻转
  for (let i = 0; i < Math.floor(n / 2); i += 1) {
    for (let j = 0; j < n; j += 1) {
      ;[matrix[i][j], matrix[n - i - 1][j]] = [
        matrix[n - i - 1][j],
        matrix[i][j],
      ]
    }
  }
  // 主对角线翻转
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
}
// @lc code=end

const assert = require('assert')

const param1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
rotate(param1)
assert.deepEqual(param1, [
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
])

const param2 = [
  [5, 1, 9, 11],
  [2, 4, 8, 10],
  [13, 3, 6, 7],
  [15, 14, 12, 16],
]
rotate(param2)
assert.deepEqual(param2, [
  [15, 13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7, 10, 11],
])

/**

1. 辅助数组

第i行第j个的元素旋转90度后，会出现在倒数第i列的第j个元素
m[i][j] --旋转90--> m[j][n-i-1]

a. 用辅助数组存储旋转后的结果
b. 将临时数组的结果复制到原数组

2. 原地旋转
m[row][col]         --->   m[col][n - row - 1]
  ^                            |
  |                            |
  |                            ⌄
m[n - col - 1][row] <---   m[n - row - 1][n - col - 1]

用临时变量temp完成四项的原地交换
temp = m[row][col]
m[row][col] = m[n-col-1][row]
m[n-col-1][row] = m[n-row-1][n-col-1]
m[n-row-1][n-col-1] = m[col][n-row-1]
m[col][n-row-1] = temp

知道如何原地旋转矩阵之后，还有一个重要的问题：我们应该枚举哪些位置 (row,col) 进行上述的原地交换操作呢
1. 当n为偶数时，需要枚举 n^2/4=(n/2)(n/2)个位置，可以将图形分成四块
🟥🟥🟩🟩
🟥🟥🟩🟩
🟨🟨🟦🟦
🟨🟨🟦🟦

2. 当n为奇数时，
🟥🟥🟥🟩🟩
🟥🟥🟥🟩🟩
🟨🟨⬜️🟩🟩
🟨🟨🟦🟦🟦
🟨🟨🟦🟦🟦

矩阵正中央的点无需旋转。

0 < row < Math.floor(n / 2)
0 < col < Math.floor((n + 1) / 2)


3. 反转替代旋转
旋转90度等于 = 水平翻转 + 主对角线翻转（"\"）

m[row][col] --水平翻转--> m[n-row-1][col]
m[row][col] --主对角线翻转--> m[col][row]
 */
