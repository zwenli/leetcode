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
  // 状态机
  if (!s || !s.length) return s;
  const words = [];
  let token = '';
  let stat = beforeWordStat
  for (const ch of s) {
    stat = stat(ch);
  }
  stat(' '); // end
  return words.reverse().join(' ');
  function beforeWordStat(c) {
    if (/\s/.test(c)) {
      return beforeWordStat;
    }
    return wordStat(c);
  }
  function wordStat(c) {
    if (/\s/.test(c)) {
      words.push(token);
      token = '';
      return beforeWordStat;
    }
    token += c;
    return wordStat;
  }
};

// function reverseWords(s) {
//   if (!s || !s.length) {
//     return '';
//   }
//   const words = [];
//   let token = '';
//   // 用状态机解析字符串
//   function beforeWordStat(char) {
//     if (/\s/.test(char)) {
//       return beforeWordStat;
//     }
//     return wordStat(char);
//   }
//   function wordStat(char) {
//     if (/\s/.test(char)) {
//       words.push(token);
//       token = '';
//       return beforeWordStat(char);
//     }
//     token += char;
//     return wordStat;
//   }
//   let stat = beforeWordStat;
//   const n = s.length;
//   for (let i = 0; i < n; i += 1) {
//     const char = s.charAt(i);
//     stat = stat(char);
//   }
//   stat = stat(' '); // 结束
//   const count = words.length;
//   let res = '';
//   for (let j = count - 1; j >= 0; j -= 1) {
//     res = `${res} ${words[j]}`;
//   }
//   return res.substr(1);
// }

// function reverseWords(s) {
//   // 一次迭代
//   // time complexity O(n): 字符串的长度，只遍历一次
//   if (!s || !s.length) {
//     return '';
//   }
//   let res = '';
//   for (let i = 0; i < s.length; i += 1) {
//     if (s.charAt(i) === ' ') continue;
//     let j = i + 1;
//     while (j < s.length && s.charAt(j) !== ' ') j++;
//     res = `${s.substring(i, j)} ${res}`;
//     i = j;
//   }
//   return res.substr(0, res.length - 1);
// }
// @lc code=end

// function reverseWords(s) {
//   // 用JavaScript原生方法，太作弊了
//   return s.trim().split(/\s+/).reverse().join(' ');
// }

const assert = require('assert').strict;

const res1 = reverseWords('the sky is blue');
assert.equal(res1, 'blue is sky the');
const res2 = reverseWords('  hello world  ');
assert.equal(res2, 'world hello');

/**
解法，

另外一种可以是两次翻转，
第一次先翻转整个字符串，
第二次再一次翻转每个单词
 */
