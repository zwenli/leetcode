/*
 * @lc app=leetcode.cn id=557 lang=javascript
 *
 * [557] 反转字符串中的单词 III
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
  const ans = [];
  const n = s.length;
  let i = 0;
  while (i < n) {
    const start = i;
    while (i < n && s.charAt(i) !== ' ') {
      i += 1;
    }
    for (let j = start; j < i; j += 1) {
      ans.push(s.charAt(start + i - 1 - j));
    }
    while (i < n && s.charAt(i) === ' ') {
      i += 1;
      ans.push(' ');
    }
  }
  return ans.join('');
}
// @lc code=end
const res1 = reverseWords("Let's take LeetCode contest");
