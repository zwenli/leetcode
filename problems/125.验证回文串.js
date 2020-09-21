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
  // 双指针
  let sgood = '';
  // 处理有效字符
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    if (/[a-zA-Z0-9]/.test(char)) {
      sgood += char.toLowerCase();
    }
  }
  let left = 0;
  let right = sgood.length - 1;
  while (left < right) {
    if (sgood.charAt(left) !== sgood.charAt(right)) {
      return false;
    }
    left += 1;
    right -= 1;
  }
  return true;
}
// @lc code=end

const res1 = isPalindrome('A man, a plan, a canal: Panama'); // true
const res2 = isPalindrome('race a car'); // false

console.log(res1);
console.log(res2);
