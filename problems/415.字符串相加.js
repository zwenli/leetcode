/*
 * @lc app=leetcode.cn id=415 lang=javascript
 *
 * [415] 字符串相加
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

function addStrings(num1, num2) {
  // 模拟加法过程
  const ZERO_CODE = '0'.charCodeAt()
  let ans = []
  let carry = 0
  for (
    let i = num1.length - 1, j = num2.length - 1;
    i >= 0 || j >= 0 || carry > 0;
    i--, j--
  ) {
    const x = i >= 0 ? num1.charCodeAt(i) - ZERO_CODE : 0
    const y = j >= 0 ? num2.charCodeAt(j) - ZERO_CODE : 0
    const result = x + y + carry
    ans.push(result % 10)
    carry = Math.floor(result / 10)
  }
  return ans.reverse().join('')
}
// @lc code=end

const assert = require('assert').strict

const res1 = addStrings('21', '358')
assert.equal(res1, '379')
const res2 = addStrings('0', '0')
assert.equal(res2, '0')

/**

模拟加法的过程

    2 1
+ 3 5 8
-------
= 3 7 9
 */
