/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=191 lang=javascript
 *
 * [191] 位1的个数
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number}
 */

function hammingWeight(n) {
  // 位运算优化
  // x = x & (x - 1) 会清空最低位的1
  // time complexity O(logn):
  // space complexity O(1)
  let cnt = 0;
  while (n) {
    cnt += 1;
    n &= n - 1;
  }
  return cnt;
}

// function hammingWeight(n) {
//   // 暴力，循环检查
//   // time complexity O(k): k为int的二进制位数，k = 32
//   // space complexity O(1)
//   let cnt = 0;
//   for (let i = 0; i < 32; i += 1) {
//     if (n & 1) {
//       cnt += 1;
//     }
//     n >>= 1;
//   }
//   return cnt;
// }

// function hammingWeight(n) {
//   let cnt = 0;
//   for (let i = 0; i < 32; i += 1) {
//     if ((n >> i) & 1) {
//       cnt += 1;
//     }
//   }
//   return cnt;
// }
// @lc code=end

const res1 = hammingWeight(0b00000000000000000000000010000000);
// 1
const res2 = hammingWeight(0b11111111111111111111111111111101);
// 31
const res3 = hammingWeight(0b00000000000000000000000000001011);
// 3

/**
解法

1. 暴力 通过右移，不断累计x的数量
2. 通过 x & (x - 1) 消去最低位的1，直到为0
3. https://baike.baidu.com/item/%E6%B1%89%E6%98%8E%E9%87%8D%E9%87%8F
汉明重量是有O(1)的解法，看百科介绍
 */
