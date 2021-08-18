/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */

function addBinary(a, b) {
  // 模拟
  // time complexity O(max(|a|, |b|))
  let res = ''
  let carry = 0
  for (
    let i = a.length - 1, j = b.length - 1;
    i >= 0 || j >= 0 || carry > 0;
    i--, j--
  ) {
    const x = i < 0 ? 0 : Number(a[i])
    const y = j < 0 ? 0 : Number(b[j])
    const sum = x + y + carry
    res = (sum % 2) + res
    carry = Math.floor(sum / 2)
  }
  return res
}

// function addBinary(a, b) {
//   // 利用JS的API
//   return (parseInt(a, 2) + parseInt(b, 2)).toString(2)
// }
// @lc code=end

const assert = require('assert').strict

const res1 = addBinary('11', '1')
assert.equal(res1, '100')

const res2 = addBinary('1010', '1011')
assert.equal(res2, '10101')
