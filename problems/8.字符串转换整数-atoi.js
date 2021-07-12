/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function myAtoi(s) {
  let sign = 1;
  let total = 0;
  let i = 0;
  while (i < s.length && s[i] === ' ') {
    i += 1;
  }
  if (['-', '+'].includes(s[i])) {
    sign = s[i] === '-' ? -1 : 1;
    i += 1;
  }
  while (i < s.length && s[i] !== ' ' && !isNaN(Number(s[i]))) {
    total = total * 10 + Number(s[i]);
    i += 1;
  }
  total *= sign;
  if (total < (-2) ** 31) return (-2) ** 31;
  if (total > 2 ** 31 - 1) return 2 ** 31 -1;
  return total;
}
// @lc code=end

const res1 = myAtoi('42');
// 42
const res2 = myAtoi('    -42');
// -42
const res3 = myAtoi('4193 with words');
// 4193
const res4 = myAtoi('words and 987');
// 0
const res5 = myAtoi('-91283472332');
// -2147483648

/**

 */
