/*
 * @lc app=leetcode.cn id=2624 lang=javascript
 *
 * [2624] 蜗牛排序

 */

// @lc code=start
/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {number[][]}
 */
Array.prototype.snail = function (rowsCount, colsCount) {
  if (rowsCount * colsCount !== this.length) {
    return []
  }
  const ans = new Array(rowsCount)
    .fill(null)
    .map(() => new Array(colsCount).fill(null))
  let direction = 1
  let row = 0
  let col = 0
  for (let i = 0; i < this.length; i++) {
    ans[row][col] = this[i]
    row += direction
    if (row < 0 || row >= rowsCount) {
      direction *= -1
      row += direction
      col += 1
    }
  }
  return ans
}
// @lc code=end

const assert = require('node:assert/strict')

const nums1 = [
  19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15,
]
assert.deepEqual(nums1.snail(5, 4), [
  [19, 17, 16, 15],
  [10, 1, 14, 4],
  [3, 2, 12, 20],
  [7, 5, 18, 11],
  [9, 8, 6, 13],
])

const nums2 = [1, 2, 3, 4]
assert.deepEqual(nums2.snail(1, 4), [[1, 2, 3, 4]])

const nums3 = [1, 3]
assert.deepEqual(nums3.snail(2, 2), [])
