/*
 * @lc app=leetcode.cn id=820 lang=javascript
 *
 * [820] 单词的压缩编码
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */

class Trie {
  constructor() {
    this.children = {}
  }
  insert(word) {
    // 倒序插入单词
    let node = this.children
    let isNew = false
    for (let i = word.length - 1; i >= 0; i--) {
      const c = word[i]
      if (!node[c]) {
        isNew = true
        node[c] = {}
      }
      node = node[c]
    }
    // 如果是新单词的话编码长度增加新单词的长度+1，否则不变。
    return isNew ? word.length + 1 : 0
  }
}
function minimumLengthEncoding(words) {
  // 字典树
  let ans = 0
  const trie = new Trie()
  // 先对单词列表根据单词长度由长到短排序
  words.sort((a, b) => b.length - a.length)
  // 单词插入trie，返回该单词增加的编码长度
  for (const word of words) {
    ans += trie.insert(word)
  }
  return ans
}

// function minimumLengthEncoding(words) {
//   // 哈希，存储后缀
//   // https://leetcode.cn/problems/short-encoding-of-words/solutions/173709/dan-ci-de-ya-suo-bian-ma-by-leetcode-solution/
//   // 如果单词X是单词Y的后缀，那么单词X不需要考虑，因为编码Y的时候就同时将X编码了
//   // 如果单词X不是任何单词的后缀，那么X一定是编码字符串的一部分
//   // 因此，目标就是保留所有不是其他单词后缀的单词，最后的结果就是这些单词长度加一的总和，
//   // 因为每个单词编码后后面还需要跟一个 # 符号。
//   const good = new Set(words)
//   for (const word of words) {
//     for (let i = 1; i < word.length; i++) {
//       good.delete(word.slice(i))
//     }
//   }
//   let ans = 0
//   for (const word of good) {
//     ans += word.length + 1
//   }
//   return ans
// }
// @lc code=end
