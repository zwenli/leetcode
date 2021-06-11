/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start

class Trie {
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.children = {};
  }

  /**
   * Inserts a word into the trie.
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let node = this.children;
    for (const char of word) {
      if (!node[char]) node[char] = {};
      node = node[char];
    }
    node.isEnd = true;
  }

  /**
   * Return the node if prefix in the trie
   * @param {*} prefix
   * @return {object}
   */
  searchPrefix(prefix) {
    let node = this.children;
    for (const char of prefix) {
      if (!node[char]) return undefined;
      node = node[char];
    }
    return node;
  }

  /**
   * Returns node if the word is in the trie.
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd === true;
  }

  /**
   * Returns if there is any word in the trie that starts with the given prefix.
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    return this.searchPrefix(prefix) !== undefined;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

const trie = new Trie();
console.log(trie.insert('apple'));
console.log(trie.search('apple')); // 返回 True
console.log(trie.search('app')); // 返回 False
console.log(trie.startsWith('app')); // 返回 True
console.log(trie.insert('app'));
console.log(trie.search('app')); // 返回 True
