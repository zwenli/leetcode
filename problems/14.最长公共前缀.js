/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
  if (!strs || !strs.length) return '';
  const count = strs.length;
  const { length } = strs[0];

  for (let i = 0; i < length; i += 1) {
    const char = strs[0].charAt(i);
    for (let j = 1; j < count; j += 1) {
      if (i === strs[j].length || char !== strs[j][i]) {
        return strs[0].substr(0, i);
      }
    }
  }
  // 情况为：只有一个字符串；所有字符串匹配；第一个字符串为空串等。
  return strs[0];
}
// @lc code=end

const res1 = longestCommonPrefix(['flower', 'flow', 'flight']); // fl
const res2 = longestCommonPrefix(['dog', 'racecar', 'car']); // ''
const res3 = longestCommonPrefix(['', '']); // ''
console.log(res1);
console.log(res2);
