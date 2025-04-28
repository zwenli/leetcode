/*
 * @lc app=leetcode.cn id=224 lang=javascript
 *
 * [224] 基本计算器
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  const n = s.length
  const stack = []
  let sign = 1
  let res = 0
  for (let i = 0; i < n; i++) {
    if (isNumber(s[i])) {
      let sum = Number(s[i])
      while (i + 1 < n && isNumber(s[i + 1])) {
        sum = sum * 10 + Number(s[i + 1])
        i++
      }
      res += sign * sum
    } else if (s[i] === '+') {
      sign = 1
    } else if (s[i] === '-') {
      sign = -1
    } else if (s[i] === '(') {
      stack.push(res)
      stack.push(sign)
      res = 0
      sign = 1
    } else if (s[i] === ')') {
      res = res * stack.pop() + stack.pop()
    }
  }
  return res
}
function isNumber(c) {
  return /[0-9]/.test(c)
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = calculate(' 2-1 + 2 ')
assert.equal(res1, 3)

const res2 = calculate('(1+(4+5+2)-3)+(6+8)')
assert.equal(res2, 23)

const res3 = calculate('2147483647')
assert.equal(res3, 2147483647)

const res4 = calculate('1-(     -2)')
assert.equal(res4, 3)
