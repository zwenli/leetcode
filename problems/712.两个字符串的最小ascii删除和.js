/*
 * @lc app=leetcode.cn id=712 lang=javascript
 *
 * [712] 两个字符串的最小ASCII删除和
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
// var minimumDeleteSum = function (s1, s2) {
//   const m = s1.length
//   const n = s2.length
//   // dp[i][j] 表示使 s1[0,i]，s2[0,j]两个子串相同的最小ASCII删除和。
//   const dp = new Array(m + 1).fill(0).map(
//     () => new Array(n + 1).fill(0)
//   )
//   // base case
//   // 当i = j = 0 时，两个子串都为空字符串，相等，不需要删除任何字符，因此dp[0][0] = 1
//   // 当i = 0, 1 <= j <= n 时，由于s1[0,i]为空字符串，s2[0,j]不为空，要将空字符串和任何字符串变成相等
//   // 只有将s[0,j]字符串的所有字符删除，因此有任意dp[0][j] = dp[0][j-1] + s2[i-1]
//   for (let j = 1; j <= n; j++) {
//     dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1)
//   }
//   // 当j = 0, 1 <= i <= m 时，证明同上，也是 dp[i][0] = dp[i-1][0] + s1[i-1]
//   for (let i = 1; i <= m; i++) {
//     dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1)
//   }

//   // 当 i > 0 && j > 0 时，考虑如下计算：
//   // 1. 当s1[i-1] === s2[j-1]时，两个字符相同，考虑使s1[0,i-1]，s2[0,j-1]的最小ASCII删除和，
//   // 增加一个相同字符，最小ASCII删除和不变，因此 dp[i][j] = dp[i-1][j-1]
//   // 2. 当 s1[i-1] !== s2[j-1]时，有两种情况
//   //   a. s1[0,i-1]和s2[0,j]的最小ASCII删除和，加上删除s1[i-1]的ASCII值
//   //   b. s1[0,i]和s2[0,j-1]的最小ASCII删除和，加上删除s2[j-1]的ASCII值
//   // 两者取最小值，即dp[i][j] = min(dp[i-1][j] + s1[i-1], dp[i][j-1] + s2[j-1])
//   for (let i = 1; i <= m; i++) {
//     const code1 = s1.charCodeAt(i - 1)
//     for (let j = 1; j <= n; j++) {
//       const code2 = s2.charCodeAt(j - 1)
//       if (code1 === code2) {
//         dp[i][j] = dp[i - 1][j - 1]
//       } else {
//         dp[i][j] = Math.min(dp[i - 1][j] + code1, dp[i][j - 1] + code2)
//       }
//     }
//   }
//   return dp[m][n]
// }

var minimumDeleteSum = function (s1, s2) {
  const m = s1.length
  const n = s2.length
  const memo = new Array(m + 1).fill(-1).map(
    () => new Array(n + 1).fill(-1)
  )
  return dfs(0, 0)
  function dfs(i, j) {
    if (i === m && j === n) return 0
    if (i === m) return endSum(s2, j)
    if (j === n) return endSum(s1, i)
    if (memo[i][j] === -1) {
      const code1 = s1.charCodeAt(i)
      const code2 = s2.charCodeAt(j)
      if (code1 === code2) {
        memo[i][j] = dfs(i + 1, j + 1)
      } else {
        memo[i][j] = Math.min(dfs(i + 1, j) + code1, dfs(i, j + 1) + code2)
      }
    }
    return memo[i][j]
  }
  function endSum(s, i) {
    let sum = 0
    for (let l = s.length; i < l; i++) {
      sum += s.charCodeAt(i)
    }
    return sum
  }
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = minimumDeleteSum('sea', 'eat')
assert.equal(res1, 231)

const res2 = minimumDeleteSum('delete', 'leet')
assert.equal(res2, 403)

/**
相似题目 1143.最长公共子序列
 */
