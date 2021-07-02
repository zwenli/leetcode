/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=338 lang=javascript
 *
 * [338] 比特位计数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */

function countBits(n) {
  // dp2
  // time complexity O(n)
  const bits = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i += 1) {
    bits[i] = bits[i >> 1] + (i & 1);
  }
  return bits;
}

// function countBits(n) {
//   // dp，最低设置位
//   // dp[i] = dp[i & (i - 1)] + 1
//   // time complexity O(n)
//   const bits = new Array(n + 1).fill(0);
//   for (let i = 1; i <= n; i += 1) {
//     bits[i] = bits[i & (i - 1)] + 1;
//   }
//   return bits;
// }

// function countBits(n) {
//   // brute-fource
//   // time complexityO O(nlogn): 对于每一个整数计算一比特数的时间不超过O(logn)
//   function countBit(n) {
//     let cnt = 0;
//     while (n !== 0) {
//       cnt += 1;
//       n &= n - 1;
//     }
//     return cnt;
//   }
//   const bits = new Array(n + 1).fill(0);
//   for (let i = 1; i <= n; i += 1) {
//     bits[i] = countBit(i);
//   }
//   return bits;
// }
// @lc code=end

const res1 = countBits(2);
// [0,1,1]
const res2 = countBits(5);
// [0,1,1,2,1,2]

/**

1. 暴力, 对每个数字都计算1的个数
2. dp，最低设置位，
   dp[i] = dp[i & (i - 1)] + 1
   定义正整数 x 的「最低设置位」为x的二进制表示中的最低的1所在位。
   例如，10的二进制表示是`1010`，其最低设置位为2，对应的二进制表示是`10`
   令 y = x & (x - 1), 则y为将x的最低设置位从1变为0之后的数，
   显然 0 <= y < x(也就是说y之前已经求解过了), bits[x] = bits[y] + 1
   因此对任意整数x, 都有bits[x] = bits[x & (x - 1)] + 1
3. 另一种dp，按照奇偶性处理
奇数：二进制表示中，奇数一定比前面那个偶数多一个 1，因为多的就是最低位的 1。
偶数：二进制表示中，偶数中 1 的个数一定和除以 2 之后的那个数一样多。
     因为最低位是 0，除以 2 就是右移一位，也就是把那个 0 抹掉而已，所以 1 的个数是不变的。
  故： dp[i] = dp[i-1] + 1 , while i & 1 === 0
      dp[i] = dp[i >> 1], otherwise
    两个可以整理为: dp[i] = dp[i >> 1] + (i & 1)
    因为通过观察，其实能发现，其实奇数，也是向左移一位加上1
    也就是官方解的 动态规划——最低有效位
 */
