/*
 * @lc app=leetcode.cn id=304 lang=javascript
 *
 * [304] 二维区域和检索 - 矩阵不可变
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 */
class NumMatrix {
  /**
   * 二维前缀和，
   * 初始化前缀和矩阵的时间复杂度为O(mn), 检索的时间复杂度为O(1)
   * 需要O(mn)的空间存储前缀和矩阵
   * @param {number[][]} matrix
   */
  constructor(matrix) {
    const m = matrix.length
    const n = matrix[0].length
    this.sums = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
    /**
     * 设f(i,j)为起点(0,0)到坐标(i,j)的矩阵的元素和，
     * 在计算f(i,j)时,f(i-1,j),f(i,j-1),f(i-1,j-1)是已知的
     * f(i,j)的计算为：(画图理解)
     * f(i,j) = f(i-1,j) + f(i,j-1) - f(i-1,j-1) + m(i,j)
     */
    for (let i = 0; i < m; i += 1) {
      for (let j = 0; j < n; j += 1) {
        this.sums[i + 1][j + 1] =
          this.sums[i + 1][j] +
          this.sums[i][j + 1] -
          this.sums[i][j] +
          matrix[i][j]
      }
    }
  }
  /**
   *
   * @param {number} row1
   * @param {number} col1
   * @param {number} row2
   * @param {number} col2
   */
  sumRegion(row1, col1, row2, col2) {
    // 画图理解
    return (
      this.sums[row2 + 1][col2 + 1] -
      this.sums[row1][col2 + 1] -
      this.sums[row2 + 1][col1] +
      this.sums[row1][col1]
    )
  }
}

// class NumMatrix {
//   /**
//    *
//    * @param {number[][]} matrix
//    */
//   constructor(matrix) {
//     this.matrix = matrix
//     this.m = matrix.length
//     this.n = matrix[0].length
//   }
//   /**
//    *
//    * @param {number} row1
//    * @param {number} col1
//    * @param {number} row2
//    * @param {number} col2
//    */
//   sumRegion(row1, col1, row2, col2) {
//     let sum = 0
//     for (let i = row1; i <= row2; i += 1) {
//       for (let j = col1; j <= col2; j += 1) {
//         sum += this.matrix[i][j]
//       }
//     }
//     return sum
//   }
// }

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end

const assert = require('assert').strict

const p1 = new NumMatrix([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
])
assert.equal(p1.sumRegion(2, 1, 4, 3), 8)
assert.equal(p1.sumRegion(1, 1, 2, 2), 11)
assert.equal(p1.sumRegion(1, 2, 2, 4), 12)

/**
解法：
1. 暴力，时间复杂度为O(mn)

用前缀和的思路，
2. 一维前缀和，但时间复杂度仍要O(m)
相似题目https://leetcode-cn.com/problems/range-sum-query-immutable/

3. 二维度前缀和，时间复杂度为O(1)
 */
