/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=190 lang=javascript
 *
 * [190] 颠倒二进制位
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */

// function reverseBits(n) {
//   // 循环颠倒
//   // 这里是无符号32位二进制数，用无符号右移动>>>
//   // time complexity O(logn)
//   let ans = 0;
//   for (let i = 0; i < 32; i += 1) {
//     ans = (ans << 1) | (n & 1);
//     n >>>= 1;
//   }
//   // 这一步很关键
//   return ans >>> 0;
// }

function reverseBits(n) {
  // 分治，
  // 将二进制数分成两部分，左右交换，
  // 然后再将两个部分再分别拆成两个部分，继续左右互换，
  // 直至最后交换顺序的时候，交换的数字只有 1 位。
  // 从低至上也可以，最低先交换所有奇偶位，
  // 倒数第二层，每两位分成一组，按组号取出所有奇数组和偶数组，
  // 然后将奇数组移到偶数组上，偶数组移到奇数组上。以此类推。
  // time complexity O(1)
  const M1 = 0b01010101010101010101010101010101;
  const M2 = 0b00110011001100110011001100110011;
  const M4 = 0b00001111000011110000111100001111;
  const M8 = 0b00000000111111110000000011111111;
  n = ((n >>> 1) & M1) | ((n & M1) << 1);
  n = ((n >>> 2) & M2) | ((n & M2) << 2);
  n = ((n >>> 4) & M4) | ((n & M4) << 4);
  n = ((n >>> 8) & M8) | ((n & M8) << 8);
  n = (n << 16) | (n >>> 16);
  return n >>> 0;
}

// function reverseBits(n) {
//   // 循环颠倒
//   // 这里是无符号32位二进制数，用无符号右移动>>>
//   // time complexity O(logn)
//   let ans = 0;
//   for (let i = 0; i < 32 && n > 0; i += 1) {
//     ans |= (n & 1) << (31 - i);
//     n >>>= 1;
//   }
//   // 这一步很关键
//   return ans >>> 0;
// }
// @lc code=end

const res1 = reverseBits(0b00000010100101000001111010011100);
// 0b00111001011110000010100101000000
// 964176192

const res2 = reverseBits(0b11111111111111111111111111111101);
// 10111111111111111111111111111111;
// 3221225471

/**

解法

1. 循环处理，逐位颠倒

 */
