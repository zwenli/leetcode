/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=231 lang=javascript
 *
 * [231] 2 的幂
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */

// function isPowerOfTwo(n) {
//   // n & (n - 1) 清除最低位的1，如果只有一个1，结果会是0
//   // time complexity O(1)
//   return n > 0 && (n & (n - 1)) === 0;
// }

function isPowerOfTwo(n) {
  // n & (-n) 等到n二进制表示的最低位的1，如果是2的幂
  // 那么n就只有一个1，结果还是n
  return n > 0 && (n & -n) === n;
}

// @lc code=end

const res1 = isPowerOfTwo(-2147483648);
// false
const res2 = isPowerOfTwo(16);
// true
const res3 = isPowerOfTwo(3);
// false

/**
1. 暴力，循环
2. 通过 n & (n - 1)判断
 */
