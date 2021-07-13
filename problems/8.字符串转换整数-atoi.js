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
  const MAX_VALUE = 2 ** 31 - 1;
  const MIN_VALUE = (-2) ** 31;
  let sign = 1;
  let total = 0;
  let i = 0;
  // 去除前导空格
  while (i < s.length && s[i] === ' ') {
    i += 1;
  }
  // 符号字符处理
  if (['-', '+'].includes(s[i])) {
    sign = s[i] === '-' ? -1 : 1;
    i += 1;
  }
  // 数字字符处理，遇到非数字字符停止转换。
  while (i < s.length && s[i] !== ' ' && Number.isInteger(Number(s[i]))) {
    const num = Number(s[i]);
    // if (total * 10 > MAX_VALUE ||
    //   total === Math.floor(MAX_VALUE / 10) && num > MAX_VALUE % 10
    // ) return MAX_VALUE;
    // if (total * 10 < MIN_VALUE ||
    //   total === Math.ceil(MIN_VALUE / 10) && num > -(MIN_VALUE % 10)
    // ) return MIN_VALUE;
    // // 每一步都要把符号位乘上去
    // total = total * 10 + sign * num;
    // i += 1;
    if (total * 10 > MAX_VALUE || total === Math.floor(MAX_VALUE / 10) && num > MAX_VALUE % 10) {
      return sign === -1 ? MIN_VALUE : MAX_VALUE
    }
    total = total * 10 + num;
    i += 1;
  }
  // return total;
  return total * sign;
}
// function myAtoi(s) {
//   const MAX_VALUE = 2 ** 31 - 1;
//   const MIN_VALUE = (-2) ** 31;
//   let sign = 1;
//   let total = 0;
//   let i = 0;
//   // 去除前导空格
//   while (i < s.length && s[i] === ' ') {
//     i += 1;
//   }
//   // 符号字符处理
//   if (['-', '+'].includes(s[i])) {
//     sign = s[i] === '-' ? -1 : 1;
//     i += 1;
//   }
//   // 数字字符处理，遇到非数字字符停止转换。
//   while (i < s.length && s[i] !== ' ' && !isNaN(Number(s[i]))) {
//     total = total * 10 + Number(s[i]);
//     i += 1;
//   }
//   total *= sign;
//   // 优化，可以在循环过程中就判断是否超出范围
//   if (total < MIN_VALUE) return MIN_VALUE;
//   if (total > MAX_VALUE) return MAX_VALUE;
//   return total;
// }
// @lc code=end
const assert = require('assert').strict;

const res1 = myAtoi('42');
assert.equal(res1, 42);
const res2 = myAtoi('    -42');
assert.equal(res2, -42);
const res3 = myAtoi('4193 with words');
assert.equal(res3, 4193);
const res4 = myAtoi('words and 987');
assert.equal(res4, 0);
const res5 = myAtoi('-91283472332');
assert.equal(res5, -2147483648);
const res6 = myAtoi('2147483648');
assert.equal(res6, 2147483647);
const res7 = myAtoi('-2147483649');
assert.equal(res7, -2147483648);

/**

1. 普通遍历完成
2. 用状态机实现

 */
