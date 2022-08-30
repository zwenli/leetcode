/*
 * @lc app=leetcode.cn id=806 lang=javascript
 *
 * [806] 写字符串需要的行数
 */

const { AssertionError } = require('node:assert')

// @lc code=start
/**
 * @param {number[]} widths
 * @param {string} s
 * @return {number[]}
 */
var numberOfLines = function (widths, s) {
  const BASE = 'a'.charCodeAt()
  const LIMIT = 100
  let line = 1 // 行
  let cur = 0 // 当前行宽度
  for (let i = 0, l = s.length; i < l; i++) {
    const width = widths[s.charCodeAt(i) - BASE]
    if (cur + width <= LIMIT) {
      cur += width
    } else {
      line += 1
      cur = width
    }
  }
  return [line, cur]
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = numberOfLines(
  [
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10,
  ],
  'abcdefghijklmnopqrstuvwxyz'
)
assert.deepEqual(res1, [3, 60])
const res2 = numberOfLines(
  [
    4, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10,
  ],
  'bbbcccdddaaa'
)
assert.deepEqual(res2, [2, 4])
