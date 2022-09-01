/*
 * @lc app=leetcode.cn id=819 lang=javascript
 *
 * [819] 最常见的单词
 */

// @lc code=start
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  let word = ''
  const dict = {}
  paragraph = paragraph.toLocaleLowerCase() + ' '
  for (let i = 0, l = paragraph.length; i < l; i++) {
    if (['.', ',', ' ', '!', '?', ';', '\''].includes(paragraph[i])) {
      if (word && !banned.includes(word)) {
        dict[word] = dict[word] ? dict[word] + 1 : 1
      }
      word = ''
    } else {
      word += paragraph[i]
    }
  }
  let ans = ''
  let max = 0
  Object.entries(dict).forEach(([word, count]) => {
    if (count > max) {
      ans = word
      max = count
    }
  })
  return ans
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = mostCommonWord('Bob hit a ball, the hit BALL flew far after it was hit.', ["hit"])
assert.equal(res1, 'ball')

const res2 = mostCommonWord('Bob', [])
assert.equal(res2, 'bob')
