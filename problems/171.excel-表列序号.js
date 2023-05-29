/*
 * @lc app=leetcode.cn id=171 lang=javascript
 *
 * [171] Excel 表列序号
 */

// @lc code=start
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  const BASE = 'A'.charCodeAt(0)
  let ans = 0
  for (let i = 0; i < columnTitle.length; i++) {
    const x = columnTitle.charCodeAt(i) - BASE + 1
    ans = ans * 26 + x
  }
  return ans
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = titleToNumber('AB')
// 1 * 26 + 2
assert.equal(res1, 28)

const res2 = titleToNumber('ZY')
assert.equal(res2, 701)
