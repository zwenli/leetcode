/*
 * @lc app=leetcode.cn id=132 lang=javascript
 *
 * [132] 分割回文串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function minCut(s) {
  // 动态规划
  const n = s.length
  const g = new Array(n).fill(false).map(() => new Array(n).fill(false))
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = i; j < n; j += 1) {
      g[i][j] = s[i] === s[j] && (j - i < 2 || g[i + 1][j - 1])
    }
  }
  const f = new Array(n).fill(n)
  for (let i = 0; i < n; i += 1) {
    if (g[0][i]) {
      f[i] = 0
    } else {
      for (let j = 0; j < i; j += 1) {
        if (g[j + 1][i]) {
          f[i] = Math.min(f[i], f[j] + 1)
        }
      }
    }
  }
  return f[n - 1]
}

// function minCut(s) {
//   // 会超时
//   const n = s.length
//   const dp = new Array(n).fill(false).map(() => new Array(n).fill(false))
//   for (let i = n - 1; i >= 0; i -= 1) {
//     for (let j = i; j < n; j += 1) {
//       dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1])
//     }
//   }
//   let ans = n;
//   backtrack(0, -1);
//   function backtrack(i, time) {
//     if (i === n) {
//       ans = Math.min(ans, time);
//       return;
//     }
//     for (let j = n - 1; j >= i; j -= 1) {
//       if (dp[i][j]) {
//         backtrack(j + 1, time + 1);
//       }
//     }
//   }
//   return ans;
// }
// @lc code=end

const assert = require('assert').strict

const res1 = minCut('aab')
assert.equal(res1, 1)

const res2 = minCut('a')
assert.equal(res2, 0)

const res3 = minCut('ab')
assert.equal(res3, 1)

/**

相似题目 131.分割回文串

题解

1. 动态规划

f[i]表示字符串的前缀s[0,i]的最小分割次数。要求出f[i]的值，可以考虑
枚举s[0,i]分割出的最后一个回文串，可以写出转移方程式：
f[i] = min(f[j] + 1), 0 < j < i
其中s[j+1, i]是一个回文串

即我们枚举最后一个回文串的起始位置j+1，保证s[j+1,i]是一个回文串，
那么f[i]就可以从f[j]转移而来，附加1次额外的分割次数。

还有一种情况，即s[0,i]本身是回文串。此时无需任何切割
即：f[i] = 0;

怎么判断s[j+1, i]是否为回文串通过dp预处理判断，参考131.


https://leetcode.com/problems/palindrome-partitioning-ii/discuss/42213/Easiest-Java-DP-Solution-(97.36)

 */
