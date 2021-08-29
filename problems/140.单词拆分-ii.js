/*
 * @lc app=leetcode.cn id=140 lang=javascript
 *
 * [140] 单词拆分 II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */

function wordBreak(s, wordDict) {
  const n = s.length
  const wordSet = new Set()
  let minLen = Infinity
  let maxLen = 0
  for (const word of wordDict) {
    if (wordSet.has(word)) {
      continue
    }
    wordSet.add(word)
    maxLen = Math.max(maxLen, word.length)
    minLen = Math.min(minLen, word.length)
  }
  const ans = []
  const path = []
  backtrack(0)
  function backtrack(i) {
    if (i === n) {
      ans.push(path.join(' '))
      return
    }
    for (let j = i + minLen; j <= i + maxLen && j <= n; j += 1) {
      const word = s.substring(i, j)
      if (wordSet.has(word)) {
        path.push(word)
        backtrack(j)
        path.pop()
      }
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = wordBreak('catsanddog', ['cat', 'cats', 'and', 'sand', 'dog'])
assert.deepEqual(res1.sort(), ['cat sand dog', 'cats and dog'].sort())

const res2 = wordBreak('pineapplepenapple', [
  'apple',
  'pen',
  'applepen',
  'pine',
  'pineapple',
])
assert.deepEqual(res2.sort(), [
  'pine apple pen apple',
  'pineapple pen apple',
  'pine applepen apple',
].sort())

const res3 = wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])
assert.deepEqual(res3, [])

/**
1. 回溯
 */
