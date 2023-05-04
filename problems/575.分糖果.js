/*
 * @lc app=leetcode.cn id=575 lang=javascript
 *
 * [575] 分糖果
 */

// @lc code=start
/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  const max = candyType.length / 2
  const set = new Set(candyType)
  return Math.min(set.size, max)
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = distributeCandies([1, 1, 2, 2, 3, 3])
assert.equal(res1, 3)

const res2 = distributeCandies([1, 1, 2, 3])
assert.equal(res2, 2)
