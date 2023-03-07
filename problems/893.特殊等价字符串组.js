/*
 * @lc app=leetcode.cn id=893 lang=javascript
 *
 * [893] 特殊等价字符串组
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
function numSpecialEquivGroups(words) {
  // 计数 + 哈希
  // 一对字符串都是 特殊等价 的 => 奇数位、偶数位上的字符每个字母的数量一样多
  // 总结：只要是有关字符串进行任意交换后判断相等的题目，都可以用计数的思路去解决，字母数量必定是相等的
  const BASE_CODE = 'a'.charCodeAt(0)
  const set = new Set()
  for (const word of words) {
    const cnt = new Array(2 * 26).fill(0) // 记录奇，偶位各字母的数量
    for (let i = 0; i < word.length; i++) {
      cnt[word.charCodeAt(i) - BASE_CODE + 26 * (i % 2)] += 1
    }
    // 这里相当于将数组进行hash，只要字符串是特殊等价的，其hash值也是一样的。
    set.add(cnt.toString())
  }
  return set.size
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = numSpecialEquivGroups([
  'abcd',
  'cdab',
  'cbad',
  'xyzz',
  'zzxy',
  'zzyx',
])
assert.equal(res1, 3)

const res2 = numSpecialEquivGroups(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])
assert.equal(res2, 3)
