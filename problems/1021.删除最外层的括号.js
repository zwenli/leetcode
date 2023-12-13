/*
 * @lc app=leetcode.cn id=1021 lang=javascript
 *
 * [1021] 删除最外层的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
  let diff = 0
  let ans = ''
  let left = 0
  let right = 0
  while (right < s.length) {
    const c = s[right]
    if (c === '(') {
      diff += 1
    } else {
      diff -= 1
    }
    if (diff === 0) {
      ans += s.slice(left + 1, right)
      left = right + 1
    }
    right += 1
  }
  return ans
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = removeOuterParentheses('()()')
assert.equal(res1, '')

const res2 = removeOuterParentheses('(()())(())(()(()))')
assert.equal(res2, '()()()()(())')

const res3 = removeOuterParentheses('(()())(())')
assert.equal(res3, '()()()')
