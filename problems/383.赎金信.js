/*
 * @lc app=leetcode.cn id=383 lang=javascript
 *
 * [383] 赎金信
 */

// @lc code=start
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
  const BASE = 'a'.charCodeAt(0)
  const cnt = new Array(26).fill(0)
  for (let i = 0; i < magazine.length; i++) {
    cnt[magazine.charCodeAt(i) - BASE] += 1
  }
  for (let i = 0; i < ransomNote.length; i++) {
    const code = ransomNote.charCodeAt(i) - BASE
    cnt[code] -= 1
    if (cnt[code] < 0) return false
  }
  return true
};
// @lc code=end
