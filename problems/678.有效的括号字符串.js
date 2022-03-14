/*
 * @lc app=leetcode.cn id=678 lang=javascript
 *
 * [678] 有效的括号字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */

function checkValidString(s) {
  // dp
  // dp[i][j] 前i个字符（i从1开始），能否与j个右括号形成有效的括号字符串，j <= i
  // dp[n][0] 即为所求答案
  let cmin = 0
  let cmax = 0
  for (let char of s) {
    if (char === '(') {
      cmin += 1
      cmax += 1
    } else if (char === ')') {
      cmin -= 1
      cmax -= 1
    } else {
      cmin -= 1
      cmax += 1
    }
    if (cmax < 0) return false
    cmin = Math.max(cmin, 0)
  }
  return cmin === 0
}
// function checkValidString(s) {
//   // dp
//   // dp[i][j] 前i个字符（i从1开始），能否与j个右括号形成有效的括号字符串，j <= i
//   // dp[n][0] 即为所求答案
//   const n = s.length;
//   const dp = new Array(n + 1).fill(false).map(
//     () => new Array(n + 1).fill(false)
//   )
//   dp[0][0] = true
//   for (let i = 1; i <= n; i += 1) {
//     const char = s[i - 1]
//     for (let j = 0; j <= i; j += 1) {
//       if (char === '(' && j - 1 >= 0) {
//         dp[i][j] = dp[i - 1][j - 1]
//       } else if (char === ')' && j + 1 <= i) {
//         dp[i][j] = dp[i - 1][j + 1]
//       } else if (char === '*') {
//         dp[i][j] = dp[i - 1][j] // empty
//         if (j - 1 >= 0) dp[i][j] = dp[i][j] || dp[i - 1][j - 1]
//         if (j + 1 <= i) dp[i][j] = dp[i][j] || dp[i - 1][j + 1]
//       }
//     }
//   }
//   return dp[n][0]
// }
// function checkValidString(s) {
//   // 会超时
//   return dfs(s, 0, 0)
//   function dfs(s, start, left) {
//     if (start >= s.length) {
//       return left === 0
//     }
//     for (let i = start; i < s.length; i += 1) {
//       const char = s[i]
//       if (char === '(') {
//         left += 1
//       } else if (char === ')') {
//         if (left <= 0) return false
//         left -= 1
//       } else if (char === '*') {
//         const leftRes = dfs(s, i + 1, left + 1)
//         const rightRes = left - 1 >= 0 && dfs(s, i + 1, left - 1)
//         const emptyRes = dfs(s, i + 1, left)
//         return leftRes || rightRes || emptyRes
//       }
//     }
//     return left === 0
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = checkValidString('()')
assert.equal(res1, true)

const res2 = checkValidString('(*)')
assert.equal(res2, true)

const res3 = checkValidString('(*))')
assert.equal(res3, true)

const res4 = checkValidString('(*()))*(')
assert.equal(res4, false)

const res5 = checkValidString(
  '**************************************************))))))))))))))))))))))))))))))))))))))))))))))))))'
)
assert.equal(res5, true)
