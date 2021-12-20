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
  // 官方，动态规划，也可以叫做是状态机
  // time complexity O(m * |E| + n): n为s的长度，m为t的长度，|E|为字符集，本题只包含小写字母，也就是26个字符，预处理时间复杂度 O(m)，判断子序列时间复杂度 O(n)。
  // space complexity O(m * |E|): dp数组的空间
  const BASE = 'a'.charCodeAt(0)
  const m = t.length
  const n = s.length
  if (!n) return true
  if (!m) return false
  const dp = new Array(m + 1).fill(0).map(() => new Array(26).fill(0))
  // base case
  for (let c = 0; c < 26; c += 1) {
    dp[m][c] = m
  }
  for (let i = m - 1; i >= 0; i -= 1) {
    for (let c = 0; c < 26; c += 1) {
      if (t.charCodeAt(i) - BASE === c) {
        dp[i][c] = i
      } else {
        dp[i][c] = dp[i + 1][c]
      }
    }
  }
  let add = 0
  for (let j = 0; j < n; j += 1) {
    let c = s.charCodeAt(j) - BASE;
    if (dp[add][c] === m) {
      return false;
    }
    add = dp[add][c] + 1;
  }
  return true;
}

// function isSubsequence(s, t) {
//   // 双指针
//   if (!s || !s.length) return true
//   if (!t || !t.length) return false
//   const m = s.length
//   const n = t.length
//   let i = 0; // s的指针
//   let j = 0; // t的指针
//   while (i < m && j < n) {
//     if (s[i] === t[j]) {
//       i += 1; // 匹配成功，i向右移一位，
//     }
//     j += 1; // j无论是否匹配，每次对比之后都要右移一位
//   }
//   return i === m;
// }

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

const assert = require('assert').strict

const res1 = isSubsequence('abc', 'ahbgdc')
assert.equal(res1, true)

const res2 = isSubsequence('axc', 'ahbgdc')
assert.equal(res2, false)

/**
解法

1. 动态规划
dp[i][j] 表示s子串[0,i]是否为t子串[0,j]的子序列，
当s[i] === t[j]时，s[0,i]是否t[0,j]的子序列，取决于s[0,i-1]是否为t[0,j-1]
的子序列，也就是 dp[i][j] = dp[i-1][j-1]
当s[i] !== t[j]时，s[0,i]是否t[0,j]的子序列的问题就转化为s[0,i]是否为t[0,j-1]的问题
也就是 dp[i][j] = dp[i][j-1]
边界条件：
dp[0][j] = true，空字符串是所有字符串的子序列
dp[i][0] = false, 非空字符串不是空字符串的子序列

dp的大小为(m+1)*(n+1)

2. 双指针
初始化两个指针i，j，分别指向s和t的起始位置。
每次贪婪地匹配，匹配成功则i和j同时右移，匹配s的下一个位置，
匹配失败则j右移，i不动，尝试用t的下一个字符匹配s。
最终如果i移动s的末尾，则说明s是t的子序列

3. 动态规划（成为状态机更合适）
考虑前面的双指针的做法，我们注意到我们有大量的时间用于在t中找到下一个匹配字符。
这样我们可以预处理出对于t的每一个位置，从该位置开始往后每一个字符第一次出现的位置。
我们可以使用动态规划的方法实现预处理，令f[i][j]表示字符串t从位置i开始往后j字符第一
次出现的位置。在进行状态转移时，如果t中位置i的字符就是j，那么f[i][j] = i，否则
j出现在位置i+1往后，即f[i][j] = f[i+1][j]，因此我们要到过来进行动态规划，从后往前枚举i。
这样可以写出状态方程式：
f[i][j] = i, when t[i] === j
f[i][j] = f[i+1][j], when t[i] !== j
假定下标从0开始，那么 f[i][j] 中有 0 <= i <= m - 1，对于边界状态f[m-1][...]，我们
置f[m][...]为m，让f[m-1][...]正常进行转移。这样如果f[i][j] == m，则表示从位置i开始
往后不存在字符j。
这样，我们可以利用 f 数组，每次 O(1) 地跳转到下一个位置，直到位置变为 m 或 s 中的每一个字符都匹配成功。

(PS: 个人认为不存在的设为-1，更容易理解
https://leetcode-cn.com/problems/is-subsequence/solution/ta-ren-du-zai-shuo-dpwo-lai-shuo-shuo-zh-yeln/)

 */
