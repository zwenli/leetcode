/*
 * @lc app=leetcode.cn id=792 lang=javascript
 *
 * [792] 匹配子序列的单词数
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
  // 分桶
  // 中文讲解：https://leetcode.cn/problems/number-of-matching-subsequences/solutions/1975527/by-lcbin-gwyj/
  // 英文：https://leetcode.com/problems/number-of-matching-subsequences/solutions/117634/efficient-and-simple-go-through-words-in-parallel-with-explanation/
  const BASE = 'a'.charCodeAt()
  // 按照字母分成26个桶
  const waiting = new Array(26).fill(0).map(() => [])
  // 首先是将words中的所有单词按首字母来分桶
  for (const word of words) {
    waiting[word.charCodeAt(0) - BASE].push(word)
  }

  let ans = 0
  // 遍历s的字符
  for (const c of s) {
    // 取出s当前字符c对应的桶
    const bucket = waiting[c.charCodeAt() - BASE]
    // 依次取出桶中待匹配的单词，
    // 注意下在下面的过程中可能会将单词再添加进这个桶，因此要先确定好要取出的数量
    for (let k = bucket.length - 1; k >= 0; k--) {
      t = bucket.shift()
      if (t.length === 1) {
        // 如果单词长度为1，说明此单词已经匹配完毕，答案加1
        ans += 1
      } else {
        // 否则，去掉首字母，放到对应的桶上。
        waiting[t.charCodeAt(1) - BASE].push(t.slice(1))
      }
    }
  }
  return ans
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = numMatchingSubseq('abcde', ['a', 'bb', 'acd', 'ace'])
assert.equal(res1, 3)
