/*
 * @lc app=leetcode.cn id=393 lang=javascript
 *
 * [393] UTF-8 编码验证
 */

// @lc code=start
/**
 * @param {number[]} data
 * @return {boolean}
 */
var validUtf8 = function (data) {
  let count = 0
  for (const num of data) {
    if (count === 0) {
      if (num >> 5 === 0b110) {
        count = 1
      } else if (num >> 4 === 0b1110) {
        count = 2
      } else if (num >> 3 === 0b11110) {
        count = 3
      } else if (num >> 7) {
        return false
      }
    } else {
      if (num >> 6 != 0b10) return false
      count -= 1
    }
  }
  return count === 0
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = validUtf8([197, 130, 1])
assert.equal(res1, true)
