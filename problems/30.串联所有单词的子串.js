/*
 * @lc app=leetcode.cn id=30 lang=javascript
 *
 * [30] 串联所有单词的子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
function findSubstring(s, words) {
  // 哈希+窗口
  // time complexity O(m * n): m为s的长度，n为单词数量
  // space complexity O(n): 哈希表的空间大小，也就是单词数量
  const wordNum = words.length
  const wordLen = words[0].length
  if (s.length < wordNum * wordLen) return []
  const ans = []
  const allWords = new Map()
  for (const word of words) {
    allWords.set(word, (allWords.get(word) || 0) + 1)
  }
  for (let i = 0; i <= s.length - wordNum * wordLen; i += 1) {
    const subWords = new Map()
    let j = i
    while (j < i + wordNum * wordLen) {
      const word = s.substr(j, wordLen)
      if (
        allWords.has(word) &&
        (subWords.get(word) || 0) < allWords.get(word)
      ) {
        subWords.set(word, (subWords.get(word) || 0) + 1)
        j += wordLen
      } else {
        break
      }
    }
    if (j === i + wordNum * wordLen) {
      ans.push(i)
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = findSubstring('barfoothefoobarman', ['foo', 'bar'])
assert.deepEqual(res1, [0, 9])

const res2 = findSubstring('wordgoodgoodgoodbestword', [
  'word',
  'good',
  'best',
  'word',
])
assert.deepEqual(res2, [])

const res3 = findSubstring('barfoofoobarthefoobarman', ['bar', 'foo', 'the'])
assert.deepEqual(res3, [6, 9, 12])

/**
解法

1. 哈希+滑动窗口
两个哈希，
allWords存放words中的出现的单词和次数
subWords存放窗口中出现的单词与次数
wordNum单词数量，wordLen 单词长度

遍历字符串，移动长度为 wordNum * wordLen 的滑动窗口，
再在当前滑动窗口中依次比较wordLen长度的单词

当这个窗口内一旦出现不存在allWords中的单词，
或者这个单词在子串中出现的次数已经等于allWords中的次数(也就是再加入这个子串次数就要超出了)，
这个滑动窗口就不符合要求，直接break进入下一个滑动窗口的匹配

一旦完全匹配上了，把滑动窗口的起始索引加入结果中

2. AC自动机
 */
