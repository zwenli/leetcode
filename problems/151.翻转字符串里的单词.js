/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 翻转字符串里的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
  if (!s || !s.length) {
    return '';
  }
  const words = [];
  let token = '';
  // 用状态机解析字符串
  function beforeWordStat(char) {
    if (/\s/.test(char)) {
      return beforeWordStat;
    }
    // eslint-disable-next-line no-use-before-define
    return wordStat(char);
  }
  function wordStat(char) {
    if (/\s/.test(char)) {
      words.push(token);
      token = '';
      return beforeWordStat(char);
    }
    token += char;
    return wordStat;
  }
  let stat = beforeWordStat;
  const n = s.length;
  for (let i = 0; i < n; i += 1) {
    const char = s.charAt(i);
    stat = stat(char);
  }
  stat = stat(' '); // 结束
  const count = words.length;
  let res = '';
  for (let j = count - 1; j >= 0; j -= 1) {
    res = `${res} ${words[j]}`;
  }
  return res.substr(1);
}
// @lc code=end

// function reverseWords(s) {
//   // 用JavaScript原生方法，太作弊了
//   return s.trim().split(/\s+/).reverse().join(' ');
// }
const res1 = reverseWords('the sky is blue');
const res2 = reverseWords('  hello world!  ');
console.log(res2);
console.log(res1);
