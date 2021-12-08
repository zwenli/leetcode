/*
 * @lc app=leetcode.cn id=516 lang=javascript
 *
 * [516] 最长回文子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function longestPalindromeSubseq(s) {
  // 动态规划，空间优化
  // time compelxity O(n^2): 动态规划需要计算的状态数是O(n^2)
  // space complexity O(n):
  const n = s.length
  const dp = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i -= 1) {
    dp[i] = 1 // dp[i][i] = 1;
    let prev = 0 // dp[i+1][j-1], 此时i+1>j-1，结果为0
    for (let j = i + 1; j < n; j += 1) {
      const temp = dp[j] // dp[i+1][j]的值
      if (s[i] === s[j]) {
        dp[j] = 2 + prev
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1])
      }
      prev = temp
    }
  }
  return dp[n - 1]
}

// function longestPalindromeSubseq(s) {
//   // 动态规划
//   // time compelxity O(n^2): 动态规划需要计算的状态数是O(n^2)
//   // space complexity O(n^2): 二维数组dp的空间为O(n^2)
//   const n = s.length
//   const dp = new Array(n).fill(0).map(() => new Array(n).fill(0))
//   for (let i = n - 1; i >= 0; i -= 1) {
//     dp[i][i] = 1
//     const ci = s[i]
//     for (let j = i + 1; j < n; j += 1) {
//       const cj = s[j]
//       if (ci === cj) {
//         dp[i][j] = 2 + dp[i + 1][j - 1]
//       } else {
//         dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1])
//       }
//     }
//   }
//   return dp[0][n - 1]
// }
// @lc code=end

const assert = require('assert').strict

const res1 = longestPalindromeSubseq('bbbab')
assert.equal(res1, 4)

const res2 = longestPalindromeSubseq('cbbd')
assert.equal(res2, 2)

/**

1. 动态规划
对于一个子序列而言，如果它是回文子序列，并且长度大于2，
那么将它首尾的两个字符去除之后，它仍然是个回文子序列。
因此可以用动态规划的方法计算给定字符串的最长回文子序列。

dp[i][j]表示字符串s的下标范围[i,j]内的最长回文子序列的长度。
设s的长度为n，则只有当0 <= i <= j < n时，才会有dp[i][j] > 0，否则dp[i][j] = 0

由于任何长度为1的子序列都是回文子序列，因此动态规划的边界情况是，
对任意0 <= i < n, dp[i][i] = 1。

当i < j的情况下，计算dp[i][j]需要考虑s[i]和s[j]相等和不相等的情况：
1. 如果s[i] === s[j]，则首先得到s的下标范围[i+1,j−1]内的最长回文子序列，
然后在该子序列的首尾分别添加s[i]和s[j]，即可得到s的下标范围[i,j]内的最长回文子序列，
因此 dp[i][j] = 2 + dp[i+1][j-1]

2. 如果s[i] !== s[j]，s[i]和s[j]不可能同时作为同一个回文子序列的首尾，
因此 dp[i][j] = max(dp[i+1][j], dp[i][j-1])

由于状态转移方程都是从长度较短的子序列向长度较长的子序列转移，因此需要注意动态规划的循环顺序。
最终得到 dp[0][n-1] 即为字符串s的最长回文子序列的长度。

 */
