/*
 * @lc app=leetcode.cn id=880 lang=javascript
 *
 * [880] 索引处的解码字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var decodeAtIndex = function (s, k) {
  let i
  let N = 0
  for (i = 0; N < k; i++) {
    N = isdigit(s[i]) ? N * s[i] : N + 1
  }
  for (i--; i > 0; i--) {
    if (isdigit(s[i])) {
      N = Math.floor(N / s[i])
      k %= N
    } else {
      if (k % N === 0) {
        break
      }
      N -= 1
    }
  }
  return s[i]
}
function isdigit(c) {
  return /[0-9]/.test(c)
}
function isalpha(c) {
  return /[a-zA-Z]/.test(c)
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = decodeAtIndex('leet2code3', 10)
assert.equal(res1, 'o')

const res2 = decodeAtIndex('ha22', 5)
assert.equal(res2, 'h')

const res3 = decodeAtIndex('a2345678999999999999999', 1)
assert.equal(res3, 'a')

const res4 = decodeAtIndex(
  'jb8dis8msunncn92o7o45iq7jrkkmx8q24vesm6i4jdtweq6gxccrb7p2fhxsqke7njwcul4y9cd3rpmrhq3ve6prifmt7aa89tt',
  731963130
)
assert.equal(res4, 'b')
