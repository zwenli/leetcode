/*
 * @lc app=leetcode.cn id=583 lang=javascript
 *
 * [583] 两个字符串的删除操作
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  // 动态规划，和 1143.最长公共子序列类似

  const m = word1.length
  const n = word2.length
  // dp[i][j] 表示 word1[0,i] 和 word2[0,j] 相同的最少删除操作次数
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  // base case，空字符串的情况，另外一个字符串的字符全部删除。
  for (let i = 1; i <= m; i++) {
    dp[i][0] = i
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // 两个字符相等，word1[0,i-1], word2[0,j-1] 加上相同字符，最少删除操作次数不变
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        // 不相等时，考虑两种情况，取其最小值。
        // 1. word1[0, i] 和 word2[0,j-1]相同的最少删除操作次数，加上删除word2[j-1]字符1次操作
        // 2. word1[0, i-1] 和 word2[0,j]相同的最少删除操作次数，加上删除word1[i-1]字符1次操作
        // （简单理解就是其中一个子串保持不变，另一个子串删除字符处理）
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + 1
      }
    }
  }

  return dp[m][n]
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = minDistance('sea', 'eat')
assert.equal(res1, 2)

const res2 = minDistance('leetcode', 'etco')
assert.equal(res2, 4)
