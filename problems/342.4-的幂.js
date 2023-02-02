/*
 * @lc app=leetcode.cn id=342 lang=javascript
 *
 * [342] 4的幂
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */

var isPowerOfFour = function(n) {
  // 相关题目：231. 2的幂
  // n如果是4的幂，那么也是2的幂。因此可以首先判断是否为2的幂，再判断4的幂
  // n & (n-1) === 0  ==> n是2的幂
  // 
  // 如果n是4的幂，那么n的二进制表示中有且仅有一个1，并且这个1出现在
  // 从低位开始的第偶数个二进制位上（这是因为这个1后面必须有偶数个0）。
  // 规定第0位为最低位。如 n = 16 时，其二进制表示为 0b10000.
  // 唯一的1出现在第4位上，所以 16 为4的幂
  
  // 由于题目保证了n是一个32位有符号整数，因此可以构造一个掩码mask，其偶数位为0奇数为1。
  // 这样一来n和mask进行按位与运算时，如果结果为0，说明n二进制表示的1出现在偶数位置上，
  // 否则出现在奇数位上。
  // 掩码mask为 0b10101010101010101010101010101010
  // 16进制表示为 0xaaaaaaaa
  return n > 0 && (n & (n - 1)) === 0 && (n & 0xaaaaaaaa) === 0
};
// var isPowerOfFour = function(n) {
//   while (n >= 4) {
//     n /= 4
//   }
//   return n === 1
// };
// @lc code=end

const assert = require('node:assert').strict


const res1 = isPowerOfFour(16)
assert.equal(res1, true)

const res2 = isPowerOfFour(5)
assert.equal(res2, false)
