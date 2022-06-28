/*
 * @lc app=leetcode.cn id=521 lang=javascript
 *
 * [521] 最长特殊序列 Ⅰ
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */

function findLUSlength(a, b) {
  // 两字符串相等时，那么任意字符串的子序列均会出现在两个字符串中，因此需要返回-1
  if (a === b) return -1
  // 两字符串不相等时，选择较长的字符串当最长特殊子序列，显然它不会是较短的字符串的子序列
  // 特别的，如果两者长度相等，我们仍然可以选择其中的一个字符串作为最长特殊序列，它不会是另一个字符串的子序列。
  return Math.max(a.length, b.length)
}
// @lc code=end
