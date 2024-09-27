/*
 * @lc app=leetcode.cn id=2414 lang=javascript
 *
 * [2414] 最长的字母序连续子字符串的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestContinuousSubstring = function(s) {
  let cur = 1
  let ans = 1
  for (let i = 1; i < s.length; i++) {
    if (s.charCodeAt(i) - s.charCodeAt(i - 1) === 1) {
      cur += 1
      ans = Math.max(ans, cur)
    } else {
      cur = 1
    }
  }
  return ans
};
// @lc code=end
