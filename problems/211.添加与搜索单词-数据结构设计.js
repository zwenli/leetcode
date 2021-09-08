/*
 * @lc app=leetcode.cn id=211 lang=javascript
 *
 * [211] 添加与搜索单词 - 数据结构设计
 */

// @lc code=start

class WordDictionary {
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.root = {}
  }

  /**
   * @param {string} word
   * @return {void}
   */
  addWord(word) {
    let node = this.root
    for (const char of word) {
      if (node[char] === undefined) {
        node[char] = {}
      }
      node = node[char]
    }
    node.isEnd = true
  }
  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    let node = this.root
    // return this._search(word, node)
    return this.dfs(word, 0, node)
  }
  dfs(word, index, node) {
    if (index === word.length) return Boolean(node.isEnd)
    if (word[index] !== '.') {
      const next = node[word[index]]
      return next !== undefined && this.dfs(word, index + 1, next)
    } else {
      for (const key in node) {
        if (key === 'isEnd') continue
        if (this.dfs(word, index + 1, node[key])) {
          return true
        }
      }
    }
    return false
  }
  // _search(word, node) {
  //   for (let i = 0; i < word.length; i += 1) {
  //     const char = word[i]
  //     if (node[char]) {
  //       node = node[char]
  //     } else if (char === '.') {
  //       for (let next in node) {
  //         if (this._search(word.substring(i + 1), node[next])) {
  //           return true
  //         }
  //       }
  //       return false
  //     } else {
  //       return false
  //     }
  //   }
  //   return node.isEnd ? true : false
  // }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
// @lc code=end

const assert = require('assert').strict

const wordDictionary1 = new WordDictionary()
wordDictionary1.addWord('bad')
wordDictionary1.addWord('dad')
wordDictionary1.addWord('mad')
assert.equal(wordDictionary1.search('pad'), false)
assert.equal(wordDictionary1.search('bad'), true)
assert.equal(wordDictionary1.search('.ad'), true)
assert.equal(wordDictionary1.search('b..'), true)

const wordDictionary2 = new WordDictionary()
wordDictionary2.addWord('at')
wordDictionary2.addWord('and')
wordDictionary2.addWord('an')
wordDictionary2.addWord('add')
assert.equal(wordDictionary2.search('a'), false)
assert.equal(wordDictionary2.search('.at'), false)
wordDictionary2.addWord('bat')

assert.equal(wordDictionary2.search('.at'), true)
assert.equal(wordDictionary2.search('an.'), true)
assert.equal(wordDictionary2.search('a.d.'), false)
assert.equal(wordDictionary2.search('b.'), false)
assert.equal(wordDictionary2.search('a.d'), true)
assert.equal(wordDictionary2.search('.'), false)
