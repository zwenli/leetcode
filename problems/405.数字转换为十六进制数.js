/*
 * @lc app=leetcode.cn id=405 lang=javascript
 *
 * [405] 数字转换为十六进制数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
const HEX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
var toHex = function (num) {
  if (num === 0) return '0'
  let ans = ''
  while (num != 0) {
    ans = HEX[num & 0b1111] + ans
    num >>>= 4
  }
  return ans
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = toHex(26)
assert.equal(res1, '1a')

const res2 = toHex(-1)
assert.equal(res2, 'ffffffff')
