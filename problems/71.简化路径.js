/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const stack = []
  let value = ''
  for (const c of path) {
    if (c !== '/') {
      value += c
    } else if (value) {
      if (value === '..') {
        stack.length && stack.pop()
      } else if (value !== '.') {
        stack.push(value)
      }
      value = ''
    }
  }
  if (value === '..') {
    stack.length && stack.pop()
  } else if (value && value !== '.') {
    stack.push(value)
  }

  return '/' + stack.join('/')
}

// @lc code=end

const assert = require('node:assert/strict')

const res1 = simplifyPath('/home/user/Documents/../Pictures')
assert.equal(res1, '/home/user/Pictures')
