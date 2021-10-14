/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

function isSubsequence(s, t) {
  // 双指针
  if (!s || !s.length) return true
  if (!t || !t.length) return false
  const m = s.length
  const n = t.length
  let i = 0; // s的指针
  let j = 0; // t的指针
  while (i < m && j < n) {
    if (s[i] === t[j]) {
      i += 1; // 匹配成功，i向右移一位，
    }
    j += 1; // j无论是否匹配，每次对比之后都要右移一位
  }
  return i === m;
}

// function isSubsequence(s, t) {
//   // dp
//   // time complexity O(mn): m、n分别为字符串s、t的长度
//   // space complexity O(mn): dp的空间大小
//   if (!s || !s.length) return true
//   if (!t || !t.length) return false
//   const m = s.length
//   const n = t.length
//   const dp = new Array(m + 1)
//     .fill(false)
//     .map(() => new Array(n + 1).fill(false))
//   for (let j = 0; j <= n; j += 1) {
//     dp[0][j] = true
//   }
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       if (s[i - 1] === t[j - 1]) {
//         dp[i][j] = dp[i - 1][j - 1]
//       } else {
//         dp[i][j] = dp[i][j - 1]
//       }
//     }
//   }
//   return dp[m][n]
// }
// @lc code=end

const assert = require('assert').strict;

const res1 = isSubsequence('abc', 'ahbgdc');
assert.equal(res1, true);

const res2 = isSubsequence('axc', 'ahbgdc');
assert.equal(res2, false);
