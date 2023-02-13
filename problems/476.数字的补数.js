/*
 * @lc app=leetcode.cn id=476 lang=javascript
 *
 * [476] 数字的补数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */

function findComplement(num) {
  // num xor num的掩码 = num的补码
  // 二进制最高位的1的数值，也就是一个掩码（mask）
  // 利用二进制最高位的1，运算符"|="作用于原数和它右移的数值，
  // 来保证掩码的最高位为1，其它位为0。
  // 利用了分治思想。
  let mask = num;
  mask |= mask >>> 1;
  mask |= mask >>> 2;
  mask |= mask >>> 4;
  mask |= mask >>> 8;
  mask |= mask >>> 16;
  return num ^ mask;
}
// function findComplement(num) {
//   // 位运算：找到最高位的1，构造掩码
//   // 当 i=30 时，构造 mask = 2^(i+1) - 1的过程中需要保证不会产生整数溢出
//   let highbit = 0;
//   for (let i = 1; i <= 30; i += 1) {
//     if (num >= (1 << i)) {
//       highbit = i;
//     } else {
//       break;
//     }
//   }
//   const mask = highbit === 30 ? 0x7fffffff : (1 << (highbit + 1)) - 1; 
//   return num ^ mask;
// }

// function findComplement(num) {
//   // 位运算：逐个按位取反
//   let ans = 0
//   for (let i = 0; num >> i; i += 1) {
//     ans |= ((num >> i & 1) ^ 1) << i
//   }
//   return ans
// }
// @lc code=end

const assert = require('assert').strict

const res1 = findComplement(5)
assert.equal(res1, 2)

const res2 = findComplement(1)
assert.equal(res2, 0)

/**
int mask = num;
    mask |= mask >> 1;
    mask |= mask >> 2;
    mask |= mask >> 4;
    mask |= mask >> 8;
    mask |= mask >> 16;
    return num ^ mask;
 */
