/*
 * @lc app=leetcode.cn id=43 lang=javascript
 *
 * [43] 字符串相乘
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
 
function multiply(num1, num2) {
  // https://leetcode.com/problems/multiply-strings/discuss/17605/Easiest-JAVA-Solution-with-Graph-Explanation
  // time complexity O(m*n)
  // space complexity O(m+n)
  // 也是模拟了乘法的计算过程，两个数相乘后找到对应的位置累加进去
  // 重点是index的计算
  if (num1 === '0' || num2 === '0') return '0';
  const m = num1.length;
  const n = num2.length;
  const pos = new Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      const p1 = i + j; // 高位
      const p2 = i + j + 1; // 低位
      const sum = Number(num1[i]) * Number(num2[j]) + pos[p2];
      pos[p1] += Math.floor(sum / 10);
      pos[p2] = sum % 10;
    }
  }
  if (pos[0] === 0) pos.shift();
  return pos.join('');
}

// function multiply(num1, num2) {
//   // 模拟乘法转加法
//   if (num1 === '0' || num2 === '0') return '0';
//   const ZERO_CODE = '0'.charCodeAt();
//   const m = num1.length;
//   const n = num2.length;
//   let ans = '0';
//   for (let i = n - 1; i >= 0; i -= 1) {
//     const cur = [];
//     const y = num2.charCodeAt(i) - ZERO_CODE;
//     let carry = 0;
//     // 低位补零
//     for (let j = n - 1; j > i; j -= 1) {
//       cur.push(0);
//     }
//     for (let j = m - 1; j >= 0 || carry > 0; j -= 1) {
//       const x = j >= 0 ? num1.charCodeAt(j) - ZERO_CODE : 0;
//       const result = x * y + carry;
//       cur.push(result % 10);
//       carry = Math.floor(result / 10);
//     }
//     ans = addStrings(ans, cur.reverse().join(''));
//   }
//   return ans;
  
//   function addStrings(num1, num2) {
//     // 模拟加法过程
//     const ZERO_CODE = '0'.charCodeAt()
//     let ans = []
//     let carry = 0
//     for (
//       let i = num1.length - 1, j = num2.length - 1;
//       i >= 0 || j >= 0 || carry > 0;
//       i--, j--
//     ) {
//       const x = i >= 0 ? num1.charCodeAt(i) - ZERO_CODE : 0
//       const y = j >= 0 ? num2.charCodeAt(j) - ZERO_CODE : 0
//       const result = x + y + carry
//       ans.push(result % 10)
//       carry = Math.floor(result / 10)
//     }
//     return ans.reverse().join('')
//   }
// }

// @lc code=end

const assert = require('assert').strict

const res1 = multiply('2', '3')
assert(res1, '6')

const res2 = multiply('123', '456')
assert(res2, '56088')

const res3 = multiply('123456789', '987654321')
assert(res3, '121932631112635269')

/**
    1 9
*   2 5
-------
    9 5
+ 3 8 0
-------
= 4 7 5
 */
