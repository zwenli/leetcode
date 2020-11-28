/* eslint-disable no-bitwise */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=779 lang=javascript
 *
 * [779] 第K个语法符号
 */

// TODO

// @lc code=start
/**
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
function kthGrammar(N, K) {
  // 递归（父变体）
  // 第K位，其父位为 (K+1)/2
  // 当K%2大于0，则值等于原父位的值
  // 否则，值为 1 - 原父位的值
  // 时间复杂度O(n): 找出答案需要递归N-1次
  // 空间复杂度O(1): 常量
  if (N === 1) {
    return 0;
  }
  const a = kthGrammar(N - 1, Math.floor((K + 1) / 2));
  if (K % 2 > 0) {
    return a;
  }
  return 1 - a;
}
// @lc code=end

// function kthGrammar(N, K) {
//   // 暴力法
//   // 规律：
//   // 第N行的和第N-1行，设j为第N-1的索引有如下关系：
//   // row[2*j] = row[j] // 偶数不变
//   // row[2*j+1] = 1 - row[j] // 奇数数字相反
//   // 时间复杂度O(2^n): 每次递归的时间复杂度和长度有关 2^0 + 2^1 + ... + 2^(n-1) = 2^n
//   // 空间复杂度O(2^n): 最后一行的长度。
//   // 会超时
//   const lastrow = new Array(1 << N); // 就是2^N
//   lastrow[0] = 0; // 初始化第一行
//   for (let i = 0; i < N; i += 1) {
//     for (let j = (1 << i - 1) - 1; j >= 0; j -= 1) {
//       // 倒序遍历上一行的索引
//       lastrow[2 * j] = lastrow[j];
//       lastrow[2 * j + 1] = 1 - lastrow[j];
//     }
//   }
//   return lastrow[K - 1];
// }

// function kthGrammar(N, K) {
//   // 先用递归函数生成第N行字符串，
//   // 在返回第K个字符
//   // 这种解法，调用栈会爆掉
//   // 时间复杂度O(2^n): 每次递归的时间复杂度和长度有关 2^0 + 2^1 + ... + 2^(n-1) = 2^n
//   // 空间复杂度O(2^n): 最后一行的长度。
//   const str = helper(1, N, '0');
//   function helper(i, N, str) {
//     if (i === N) {
//       return str;
//     }
//     return helper(i + 1, N, str.replace(/[01]/g, (val) => (val === '0' ? '01' : '10')));
//   }
//   return Number(str[K - 1]);
// }

const re1 = kthGrammar(1, 1); // 0
const re2 = kthGrammar(2, 1); // 0
const re3 = kthGrammar(2, 2); // 1
const re4 = kthGrammar(4, 5); // 1
const re5 = kthGrammar(30, 434991989);
