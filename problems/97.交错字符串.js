/*
 * @lc app=leetcode.cn id=97 lang=javascript
 *
 * [97] 交错字符串
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */

function isInterleave(s1, s2, s3) {
  // 动态规划, 空间优化
  // time complexity O(mn)
  // space complexity O(n)
  const m = s1.length
  const n = s2.length
  const t = s3.length
  if (m + n !== t) return false
  const dp = new Array(n + 1).fill(false)
  dp[0] = true
  for (let i = 0; i <= m; i += 1) {
    for (let j = 0; j <= n; j += 1) {
      if (i > 0) {
        dp[j] &&= s1[i - 1] === s3[i + j - 1]
      }
      if (j > 0) {
        dp[j] ||= dp[j - 1] && s2[j - 1] === s3[i + j - 1]
      }
    }
  }
  return dp[n]
}

// function isInterleave(s1, s2, s3) {
//   // 动态规划
//   // time complexity O(mn)
//   // space complexity O(mn)
//   const m = s1.length
//   const n = s2.length
//   const t = s3.length
//   if (m + n !== t) return false
//   const dp = new Array(m + 1)
//     .fill(false)
//     .map(() => new Array(n + 1).fill(false))
//   dp[0][0] = true
//   for (let i = 0; i <= m; i += 1) {
//     for (let j = 0; j <= n; j += 1) {
//       if (i > 0) {
//         dp[i][j] = dp[i][j] || (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1])
//       }
//       if (j > 0) {
//         dp[i][j] = dp[i][j] || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
//       }
//     }
//   }
//   return dp[m][n]
// }
// @lc code=end

const assert = require('assert').strict

const res1 = isInterleave('aabcc', 'dbbca', 'aadbbcbcac')
assert.equal(res1, true)

const res2 = isInterleave('aabcc', 'dbbca', 'aadbbbaccc')
assert.equal(res2, false)

/**

动态规划

首先如果是 s1.length + s2.length !== |s3|.length
那么s3必然不是由s1和s2交错组成的，
只有s1.length + s2.length === |s3|.length，可以用动态规划来求解

定义dp(i,j)表示s1的前i个元素和s2的前j个元素能否交错组成s3的前i+j个元素。
如果s1的第i个元素和s3的第i+j个元素相等，那么s1的前i个元素和s2的前j个元素能否
交错组成s3的前i+j个元素取决于s1的前i-1个元素和s2的前j个元素能否交错组成s3的前i+j-1
个元素，即此时dp(i,j)取决于dp(i-1,j)，在此情况下如果dp(i-1,j)为真，那么dp(i,j)也为
真。同样，如果s2的第j个元素和s3的第i+j个元素并且dp(i,j-1)为真，那么dp(i,j)也为真。
于是可以推到出动态转移方程式：
dp(i,j) = (dp(i-1,j) && s1[i] === s3[i+j]) || (dp(i,j-1) && s2[j] === s3[i+j])
边界条件 dp(0,0) = true;

https://leetcode.com/problems/interleaving-string/discuss/31885/Python-DP-solutions-(O(m*n)-O(n)-space)-BFS-DFS.
还可以用BFS，DFS解决
 */
