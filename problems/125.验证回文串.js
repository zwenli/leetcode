/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */

function isPalindrome(str) {
  // 双指针，原地对比
  // time complexity O(n): n为str的长度，只遍历一次
  // space complexity O(1)
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    // 直到遇到一个字母或数字就停止移动
    while (left < right && !isLetterOrDigit(str[left])) {
      left += 1;
    }
    while (left < right && !isLetterOrDigit(str[right])) {
      right -= 1;
    }
    // 判断两个指针对应的字符是否相等
    if (str[left].toLowerCase() !== str[right].toLowerCase()) {
      // 不相等直接返回false
      return false;
    }
    // 相等则位移一位，继续对比
    left += 1;
    right -= 1;
  }
  return true;
  function isLetterOrDigit(ch) {
    return /[a-zA-Z0-9]/.test(ch);
  }
}

// function isPalindrome(str) {
//   // 双指针
//   let sgood = '';
//   // 处理有效字符
//   for (let i = 0; i < str.length; i += 1) {
//     const char = str.charAt(i);
//     if (/[a-zA-Z0-9]/.test(char)) {
//       sgood += char.toLowerCase();
//     }
//   }
//   let left = 0;
//   let right = sgood.length - 1;
//   while (left < right) {
//     if (sgood.charAt(left) !== sgood.charAt(right)) {
//       return false;
//     }
//     left += 1;
//     right -= 1;
//   }
//   return true;
// }
// function isPalindrome(str) {
//   const { length } = str;
//   let sgood = '';
//   for (let i = 0; i < length; i += 1) {
//     const char = str.charAt(i);
//     if (/[a-zA-Z0-9]/.test(char)) {
//       sgood += char.toLowerCase();
//     }
//   }
//   return sgood === sgood.split('').reverse().join('');
// }
// @lc code=end

const assert = require('assert').strict;
const res1 = isPalindrome('A man, a plan, a canal: Panama');
assert.equal(res1, true);
const res2 = isPalindrome('race a car');
assert.equal(res2, false);
