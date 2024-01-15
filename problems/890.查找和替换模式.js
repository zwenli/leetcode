/*
 * @lc app=leetcode.cn id=890 lang=javascript
 *
 * [890] 查找和替换模式
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
var findAndReplacePattern = function (words, pattern) {
  const ans = []
  for (const word of words) {
    if (match(word, pattern)) {
      ans.push(word)
    }
  }
  return ans
}

// function match(word, pattern) {
//   // word 和 pattern 匹配说明
//   // word 的每个字母和 pattern 的每个字符，两者是相互映射的
//   // 因此一种是通过 m2p 和 p2w 两个映射进行对比，都能互相映射说明匹配
//   // 另一种是代码所示，map 记录 m2p 的映射关系，visited 记录 p 哪些字母已被映射
//   // 这样也能保证 字母间是一一映射的。
//   const map = {}
//   const visited = new Set()
//   for (let i = 0; i < word.length; i++) {
//     const w = word[i]
//     const p = pattern[i]
//     if (!map[w] && !visited.has(p)) {
//       map[w] = p
//       visited.add(p)
//     } else if (map[w] !== p) {
//       return false
//     }

//   }
//   return true
// }

function match(word, pattern) {
  const w2p = {}
  const p2w = {}
  for (let i = 0; i < word.length; i++) {
    const w = word[i]
    const p = pattern[i]

    if (!w2p[w]) {
      w2p[w] = p
    } else if (w2p[w] !== p) {
      return false
    }

    if (!p2w[p]) {
      p2w[p] = w
    } else if (p2w[p] !== w) {
      return false
    }
  }
  return true
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = findAndReplacePattern(
  ['abc', 'deq', 'mee', 'aqq', 'dkd', 'ccc'],
  'abb'
)
assert.deepEqual(res1, ['mee', 'aqq'])

const res2 = findAndReplacePattern(['ef', 'fq', 'ao', 'at', 'lx'], 'ya')
assert.deepEqual(res2, ['ef', 'fq', 'ao', 'at', 'lx'])
