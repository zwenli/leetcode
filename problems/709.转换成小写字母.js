/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/*
 * @lc app=leetcode.cn id=709 lang=javascript
 *
 * [709] 转换成小写字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

// function toLowerCase(s) {
//   // 另一种参考，基于位运算
//   // ‘Z’ ASCII的二进制数为 0b01011010
//   // ‘z’ ASCII的二进制数为 0b01111010
//   // 对于字母都是第七位bit有区别，其他是一样的，
//   // 也就说我们对于任何字母只要或上 0b01000000即可，也就是32
//   const arr = s.split('').map((v) => (v >= 'A' && v <= 'Z' ? v.charCodeAt(0) | 32 : v.charCodeAt(0)));
//   return arr.map((v) => String.fromCharCode(v)).join('');
// }

function toLowerCase(s) {
  const arr = s.split('');
  for (let i = 0; i <= arr.length; i++) {
    const charCode = s.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      arr[i] = String.fromCharCode(charCode + 32);
    }
  }
  return arr.join('');
}
// @lc code=end

const res1 = toLowerCase('Hello');
// hello

const res2 = toLowerCase('here');
// here

const res3 = toLowerCase('LOVELY');
// lovely
