/*
 * @lc app=leetcode.cn id=836 lang=javascript
 *
 * [836] 矩形重叠
 */

// @lc code=start
/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function (rec1, rec2) {
  // 区域重叠判断
  const { max, min } = Math
  return (
    min(rec1[2], rec2[2]) > max(rec1[0], rec2[0]) &&
    min(rec1[3], rec2[3]) > max(rec1[1], rec2[1])
  )
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3])
assert.equal(res1, true)

const res2 = isRectangleOverlap([0, 0, 1, 1], [1, 0, 2, 1])
assert.equal(res2, false)

const res3 = isRectangleOverlap([0, 0, 1, 1], [2, 2, 3, 3])
assert.equal(res3, false)
