/*
 * @lc app=leetcode.cn id=1030 lang=javascript
 *
 * [1030] 距离顺序排列矩阵单元格
 */

// @lc code=start
/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rCenter
 * @param {number} cCenter
 * @return {number[][]}
 */
var allCellsDistOrder = function (rows, cols, rCenter, cCenter) {
  // 桶排序
  const maxDist =
    Math.max(rCenter, rows - 1 - rCenter) +
    Math.max(cCenter, cols - 1 - cCenter)
  const bucket = new Array(maxDist + 1).fill(null).map(() => [])

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const d = dist(i, j, rCenter, cCenter)
      bucket[d].push([i, j])
    }
  }

  return bucket.flat()

  function dist(r1, c1, r2, c2) {
    return Math.abs(r1 - r2) + Math.abs(c1 - c2)
  }
}
// var allCellsDistOrder = function (rows, cols, rCenter, cCenter) {
//   // 直接排序
//   const abs = Math.abs
//   const ans = []
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       ans.push([i, j])
//     }
//   }

//   return ans.sort((a, b) => {
//     return (
//       abs(a[0] - rCenter) +
//       abs(a[1] - cCenter) -
//       (abs(b[0] - rCenter) + abs(b[1] - cCenter))
//     )
//   })
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = allCellsDistOrder(1, 2, 0, 0)
assert.deepEqual(res1, [
  [0, 0],
  [0, 1],
])

const res2 = allCellsDistOrder(2, 2, 0, 1)
assert.deepEqual(res2, [
  [0, 1],
  [0, 0],
  [1, 1],
  [1, 0],
])
