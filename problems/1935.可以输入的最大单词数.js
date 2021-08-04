/*
 * @lc app=leetcode.cn id=1935 lang=javascript
 *
 * [1935] 可以输入的最大单词数
 */

// @lc code=start
/**
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */

function canBeTypedWords(text, brokenLetters) {
  // time complexity O(m+n): n为test的长度，m为brokenLetters
  // sapce complexity O(m): 哈希集合的大小
  const brokenSet = new Set(Array.from(brokenLetters));
  let ans = 0;
  let flag = true; // 当前单词是否可以完全输入
  for (const ch of text) {
    if (ch === ' ') {
      // 当前字符为空格，检查上个单词的状态
      if (flag) {
        ans += 1;
      }
      flag = true;
    } else if (brokenSet.has(ch)) {
      // 当前字符不可被输入，所在单词无法被完全输入，更新flag
      flag = false;
    }
  }
  // 检查最后一个单词的状态
  if (flag) ans +=1;
  return ans;
}

// function canBeTypedWords(text, brokenLetters) {
//   const words = text.split(' ');
//   if (!brokenLetters) return words.length;
//   let ans = words.length;
//   const brokenSet = new Set(Array.from(brokenLetters));
//   for (const word of words) {
//     for (const ch of word) {
//       if (brokenSet.has(ch)) {
//         ans -= 1;
//         break;
//       }
//     }
//   }
//   return ans;
// }
// @lc code=end

const assert = require('assert').strict;

const res1 = canBeTypedWords('hello world', 'ad');
assert.equal(res1, 1);

const res2 = canBeTypedWords('leet code', 'lt');
assert.equal(res2, 1);

const res3 = canBeTypedWords('leet code', 'e');
assert.equal(res3, 0);