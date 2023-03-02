/*
 * @lc app=leetcode.cn id=884 lang=javascript
 *
 * [884] 两句话中的不常见单词
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  const map = new Map()
  for (const s of [s1, s2]) {
    for (const word of s.split(' ')) {
      map.set(word, (map.get(word) ?? 0) + 1)
    }
  }
  const ans = []
  for (const [word, cnt] of map.entries()) {
    if (cnt === 1) ans.push(word)
  }
  return ans
}
// @lc code=end

const assert = require('node:assert')

const res1 = uncommonFromSentences('this apple is sweet', 'this apple is sour')
assert.deepEqual(res1.sort(), ['sweet', 'sour'].sort())

const res2 = uncommonFromSentences('apple apple', 'banana')
assert.deepEqual(res2.sort(), ['banana'])
