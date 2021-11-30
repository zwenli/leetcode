/*
 * @lc app=leetcode.cn id=1314 lang=javascript
 *
 * [1314] 矩阵区域和
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
function matrixBlockSum(mat, k) {
  // 二维前缀和
  // time complexity O(mn): 构建前缀和矩阵的时间复杂度为O(mn), 计算答案的时间复杂度为O(mn)
  // space complexity O(mn): 构建前缀和矩阵的空间复杂度为O(mn)
  const m = mat.length
  const n = mat[0].length
  const sums = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  const ans = new Array(m).fill(0).map(() => new Array(n).fill(0))
  // 前缀和
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      sums[i + 1][j + 1] =
        sums[i + 1][j] + sums[i][j + 1] - sums[i][j] + mat[i][j]
    }
  }
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const r1 = i - k >= 0 ? i - k : 0
      const c1 = j - k >= 0 ? j - k : 0
      const r2 = i + k < m ? i + k : m - 1
      const c2 = j + k < n ? j + k : n - 1
      ans[i][j] =
        sums[r2 + 1][c2 + 1] -
        sums[r2 + 1][c1] -
        sums[r1][c2 + 1] +
        sums[r1][c1]
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert')
const res1 = matrixBlockSum(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  1
)
assert.deepEqual(res1, [
  [12, 21, 16],
  [27, 45, 33],
  [24, 39, 28],
])
const res2 = matrixBlockSum(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  2
)
assert.deepEqual(res2, [
  [45, 45, 45],
  [45, 45, 45],
  [45, 45, 45],
])

/**
相似题目：
303.
304.

构建出前缀和矩阵，
计算出矩阵边界，即可
 */
