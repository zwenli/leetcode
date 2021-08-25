/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 外观数列
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
function countAndSay(n) {
  let res = '1'
  if (n === 1) return res;
  for (let i = 2; i <= n; i += 1) {
    let next = ''
    for (let left = 0, right = 0; right < res.length; right += 1) {
      if (right + 1 >= res.length || res[right] !== res[right + 1]) {
        next += String(right - left + 1) + res[left]
        left = right + 1
      }
    }
    res = next
  }
  return res
}
// @lc code=end

const assert = require('assert').strict

const res1 = countAndSay(1)
assert.equal(res1, '1')

const res2 = countAndSay(4)
assert.equal(res2, '1211')
