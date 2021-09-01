/*
 * @lc app=leetcode.cn id=205 lang=javascript
 *
 * [205] 同构字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

function isIsomorphic(s, t) {
  // 哈希
  // time complexity O(n): 字符串的长度为n
  // space complexity O(R): R指字母表大小，26，两个哈希表分别的空间为O(R)
  const n = s.length
  const s2t = {}
  const t2s = {}
  for (let i = 0; i < n; i += 1) {
    const x = s[i]
    const y = t[i]
    if ((s2t[x] && s2t[x] !== y) || (t2s[y] && t2s[y] !== x)) {
      return false
    }
    s2t[x] = y
    t2s[y] = x
  }
  return true
}
// @lc code=end

const assert = require('assert').strict

const res1 = isIsomorphic('egg', 'add')
assert.equal(res1, true)

const res2 = isIsomorphic('foo', 'bar')
assert.equal(res2, false)

const res3 = isIsomorphic('paper', 'title')
assert.equal(res3, true)

const res4 = isIsomorphic('badc', 'baba')
assert.equal(res4, false)

/**

相关题目：
https://leetcode-cn.com/problems/word-pattern/

题解：

需要判断s和t的每个位置上的字符是否都一一对应，即s的任意一个字符
被t中的唯一的字符对应，同时t的任意一个字符被s中的唯一的字符对应，

所以需要维护两个哈希表，一个s2t哈希表，以s的字符为key，t的字符为value，
一个t2s哈希表，以t的字符为key，s的字符为value。

从左至右遍历两个字符串的字符，不断更新两张哈希表，
如果出现冲突（即当前下标i对应的字符s[i]已经存在映射且不为t[i]
或当前下标i对应的字符t[i]已经存在映射且不为s[i]时说明两个字符串无法构成同构，
返回 false。

 */
