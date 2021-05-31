/* eslint-disable eqeqeq */
/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function numDecodings(s) {
  // 动态规划
  // dp[i]: 前i个字符的解码方法数。
  // 1. s[i] != 0, dp[i] = dp[i-1]
  // 2. s[i-1] != 0 && 10 * s[i-1] + s[i] <= 26, dp[i] = dp[i-2]
  // i的状态只依赖到i-1,i-2，优化成三个变量存储就可以了
  // time complexity O(n)
  // space complexity O(1)
  const n = s.length;
  // a = dp[i-2], b = dp[i-1], c = dp[i]
  let a = 0;
  let b = 1; // dp[0] = 1;
  let c = 0;
  for (let i = 1; i <= n; i += 1) {
    c = 0;
    if (s[i - 1] !== '0') {
      c += b;
    }
    if (i > 1 && s[i - 2] !== '0' && 10 * Number(s[i - 2]) + Number(s[i - 1]) <= 26) {
      c += a;
    }
    a = b;
    b = c;
  }
  return c;
}

// function numDecodings(s) {
//   // 动态规划
//   // dp[i]: 前i个字符的解码方法数。
//   // 可以考虑最后一次解码使用了s中的那些字符，那么会有以下两种情况：
//   // 1. 使用了一个字符，即s[i]进行解码，只需要s[i]!= 0，就可以解码成A-I的其中一个字母
//   //    由于剩余的前i-1个字符的解码方法数为dp[i-1]，得出
//   //    s[i] != 0, dp[i] = dp[i-1]
//   // 2. 使用了两个字符，即用s[i-1]和s[i]进行解码，与第一种情况类型，s[i-1]不能为0，且
//   //    s[i-1]和s[i]组成的整数必须小于等于26，这样就可以解码成J-Z中的某个字母。
//   //    由于剩下的前i-2个字符的解法方法数为dp[i-2], 得出
//   //    s[i-1] != 0 && 10 * s[i-1] + s[i] <= 26, dp[i] = dp[i-2]
//   //    注意只有i>1的时候才能进行转移，否则s[i-1]不存在
//   // 将上面两个状态转移方程在对应条件满足时进行累加，即可得到dp[i]的值了，
//   // 特别，定义dp[0] = 1，也就是空字符串只有一种解法方法，解码成空字符串
//   // time complexity O(n)
//   // space complexity O(n)
//   const n = s.length;
//   const dp = new Array(n + 1).fill(0);
//   dp[0] = 1;
//   for (let i = 1; i <= n; i += 1) {
//     if (s[i - 1] !== '0') {
//       dp[i] += dp[i - 1];
//     }
//     if (i > 1 && s[i - 2] !== '0' && 10 * Number(s[i - 2]) + Number(s[i - 1]) <= 26) {
//       dp[i] += dp[i - 2];
//     }
//   }
//   return dp[n];
// }

// function numDecodings(s) {
//   // 回溯，会栈溢出
//   const BASE = 64;
//   const n = s.length;
//   if (n === 0) return n;
//   if (s === '0') return 0;
//   const seen = new Set();
//   let ans = 0;
//   backtrack(0);
//   return ans;
//   function backtrack(i, cur = '') {
//     if (i === n) {
//       if (!seen.has(cur)) {
//         seen.add(cur);
//         ans += 1;
//       }
//       return;
//     }
//     const num = s[i];
//     const nextNum = s[i + 1];
//     if (nextNum == undefined) {
//       backtrack(i + 1, cur + String.fromCharCode(Number(num) + BASE));
//     } else if (num >= 3 && num <= 9) {
//       backtrack(i + 1, cur + String.fromCharCode(Number(num) + BASE));
//     } else if (num == 1) {
//       backtrack(i + 2, cur + String.fromCharCode(Number(num + nextNum) + BASE));
//       if (nextNum > 0) {
//         backtrack(i + 1, cur + String.fromCharCode(Number(num) + BASE));
//       }
//     } else if (num == 2) {
//       if (nextNum >= 0 && nextNum < 7) {
//         backtrack(i + 2, cur + String.fromCharCode(Number(num + nextNum) + BASE));
//       }
//       if (nextNum > 0) {
//         backtrack(i + 1, cur + String.fromCharCode(Number(num) + BASE));
//       }
//     }
//   }
// }
// @lc code=end

// 笨方法，回溯

const res1 = numDecodings('12');
// 2
const res2 = numDecodings('226');
// 3
const res3 = numDecodings('0');
// 0;
const res4 = numDecodings('27');
// 1
const res5 = numDecodings('1');
// 1
const res6 = numDecodings('10');
// 1
