/*
 * @lc app=leetcode.cn id=166 lang=javascript
 *
 * [166] 分数到小数
 */

// @lc code=start
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function (numerator, denominator) {
  // 可以整除
  if (numerator % denominator === 0) {
    return String(numerator / denominator)
  }

  const cb = []
  // 符号
  if ((numerator < 0) ^ (denominator < 0)) {
    cb.push('-')
  }

  // 整数部分
  numerator = Math.abs(numerator)
  denominator = Math.abs(denominator)
  cb.push(Math.floor(numerator / denominator))
  cb.push('.')

  // 小数部分
  // 如何判断是否找到循环节？
  // 注意到对于相同的余数，计算得到的小数的下一位数字一定是相同的，
  // 因此如果计算过程中发现某一位的余数在之前已经出现过，则为找到循环节。
  // 为了记录每个余数是否已经出现过，需要使用哈希表存储每个余数在小数部分第一次出现的下标。
  const fractionPart = []
  const remainderIndex = new Map()
  let remainder = numerator % denominator
  let index = 0
  while (remainder !== 0 && !remainderIndex.has(remainder)) {
    remainderIndex.set(remainder, index)
    remainder *= 10
    fractionPart.push(Math.floor(remainder / denominator))
    remainder %= denominator
    index += 1
  }

  // 有循环节
  if (remainder) {
    const index = remainderIndex.get(remainder)
    fractionPart.splice(index, 0, '(')
    fractionPart.push(')')
  }

  cb.push(fractionPart.join(''))
  return cb.join('')
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = fractionToDecimal(4, 333)
assert.equal(res1, '0.(012)')

const res2 = fractionToDecimal(2, 1)
assert.equal(res2, '2')
const res3 = fractionToDecimal(1, 2)
assert.equal(res3, '0.5')
const res4 = fractionToDecimal(1, 6)
assert.equal(res4, '0.1(6)')
