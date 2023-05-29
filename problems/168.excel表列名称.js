/*
 * @lc app=leetcode.cn id=168 lang=javascript
 *
 * [168] Excel表列名称
 */

// @lc code=start
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  const BASE = 'A'.charCodeAt(0)
  let str = ''
  while (columnNumber) {
    columnNumber -= 1
    const x = columnNumber % 26
    str = String.fromCharCode(x + BASE) + str
    columnNumber = Math.floor(columnNumber / 26)
  }
  return str
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = convertToTitle(1)
assert.equal(res1, 'A')

const res2 = convertToTitle(28)
assert.equal(res2, 'AB')

const res3 = convertToTitle(701)
assert.equal(res3, 'ZY')

const res4 = convertToTitle(2147483647)
assert.equal(res4, 'FXSHRXW')
