/*
 * @lc app=leetcode.cn id=831 lang=javascript
 *
 * [831] 隐藏个人信息
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var maskPII = function (s) {
  if (s.indexOf('@') !== -1) {
    return maskEmail(s)
  }
  return maskPhone(s)
}

function maskEmail(s) {
  s = s.toLowerCase()
  const index = s.indexOf('@')
  return s[0] + '*****' + s.substring(index - 1)
}

const country = ['', '+*-', '+**-', '+***-']

function maskPhone(s) {
  let sb = ''
  for (const ch of s) {
    if ('0' <= ch && ch <= '9') {
      sb += ch
    }
  }
  return country[sb.length - 10] + '***-***-' + sb.substring(sb.length - 4)
  // s = s.replace(/[\+\-\(\)\s]/g, '')
  // if (s.length === 10) {
  //   return '***-***-' + s.slice(s.length - 4)
  // }
  // if (s.length === 11) {
  //   return '+*-***-***-' + s.slice(s.length - 4)
  // }
  // if (s.length === 12) {
  //   return '+**-***-***-' + s.slice(s.length - 4)
  // }
  // if (s.length === 13) {
  //   return '+***-***-***-' + s.slice(s.length - 4)
  // }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = maskPII('LeetCode@LeetCode.com')
assert.equal(res1, 'l*****e@leetcode.com')

const res2 = maskPII('AB@qq.com')
assert.equal(res2, 'a*****b@qq.com')

const res3 = maskPII('1(234)567-890')
assert.equal(res3, '***-***-7890')
