/*
 * @lc app=leetcode.cn id=290 lang=javascript
 *
 * [290] 单词规律
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */

function wordPattern(pattern, s) {
  // 哈希
  // time complexity O(m+n): n为pattern的长度，m为s的长度
  // 插入和查询哈希表的均摊时间复杂度为O(m+n)，每个字符至多只被遍历一遍。
  // space complexity O(m+n): 需要存储pattern的每个字符和s中的每一个单词
  const words = s.split(' ')
  if (pattern.length !== words.length) {
    return false
  }
  const p2w = new Map()
  const w2p = new Map()
  const n = pattern.length
  for (let i = 0; i < n; i += 1) {
    const char = pattern[i]
    const word = words[i]
    if (
      (p2w.has(char) && p2w.get(char) !== word) ||
      (w2p.has(word) && w2p.get(word) !== char)
    ) {
      return false
    }
    p2w.set(char, word)
    w2p.set(word, char)
  }
  return true
}
// @lc code=end

const assert = require('assert').strict

const res1 = wordPattern('abba', 'dog cat cat dog')
assert.equal(res1, true)

const res2 = wordPattern('abba', 'dog cat cat fish')
assert.equal(res2, false)

const res3 = wordPattern('aaaa', 'dog cat cat dog')
assert.equal(res3, false)

const res4 = wordPattern('abba', 'dog dog dog dog')
assert.equal(res4, false)

// 狗屎测试用例，直接用 object 存，遇到constructor会出问题
const res5 = wordPattern('abba', 'dog constructor constructor dog')
assert.equal(res5, true)
