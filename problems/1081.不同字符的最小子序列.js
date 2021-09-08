/*
 * @lc app=leetcode.cn id=1081 lang=javascript
 *
 * [1081] 不同字符的最小子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

function smallestSubsequence(s) {
  const stk = []
  const inStk = {}
  const count = {}
  for (const ch of s) {
    if (!count[ch]) {
      count[ch] = 0
    }
    count[ch] += 1
  }
  for (const ch of s) {
    count[ch] -= 1
    if (inStk[ch]) {
      continue
    }
    while (stk.length && stk[stk.length - 1] > ch) {
      if (count[stk[stk.length - 1]] === 0) {
        break
      }
      inStk[stk.pop()] = false
    }
    stk.push(ch)
    inStk[ch] = true
  }
  return stk.join('')
}
// @lc code=end

const assert = require('assert').strict

const res1 = smallestSubsequence('bcabc')
assert.equal(res1, 'abc')

const res2 = smallestSubsequence('cbacdcbc')
assert.equal(res2, 'acdb')

/**
该题与 316 https://leetcode.com/problems/remove-duplicate-letters/ 相同

 */
