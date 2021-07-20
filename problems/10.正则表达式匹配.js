/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

function isMatch(s, p) {
  // 动态规划
  const m = s.length
  const n = p.length
  const dp = new Array(m + 1)
    .fill(false)
    .map(() => new Array(n + 1).fill(false))
  // base case
  dp[0][0] = true
  for (let i = 0; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2]
        if (matches(i, j - 1)) {
          dp[i][j] = dp[i][j] || dp[i - 1][j]
        }
      } else if (matches(i, j)) {
        dp[i][j] = dp[i - 1][j - 1]
      }
    }
  }
  return dp[m][n]
  function matches(i, j) {
    if (i === 0) return false
    if (p[j - 1] === '.') return true
    return s[i - 1] === p[j - 1]
  }
}

// function isMatch(s, p) {
//   // 动态规划
//   const m = s.length
//   const n = p.length
//   const dp = new Array(m + 1)
//     .fill(false)
//     .map(() => new Array(n + 1).fill(false))
//   // base case
//   dp[0][0] = true
//   for (let j = 2; j <= n; j += 1) {
//     if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2]
//   }
//   for (let i = 1; i <= m; i += 1) {
//     for (let j = 1; j <= n; j += 1) {
//       if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
//         dp[i][j] = dp[i - 1][j - 1]
//       } else if (p[j - 1] === '*') {
//         if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
//           // 匹配0次或匹配1次
//           dp[i][j] = dp[i][j - 2] || dp[i - 1][j]
//         } else {
//           // 匹配0次
//           dp[i][j] = dp[i][j - 2]
//         }
//       }
//     }
//   }
//   return dp[m][n]
// }

// function isMatch(s, p) {
//   // 递归分治 + cache
//   const cache = new Map()
//   const m = s.length // i
//   const n = p.length // j
//   return recursion(0, 0)
//   function recursion(i, j) {
//     const cacheKey = i * 30 + j
//     if (cache.has(cacheKey)) return cache.get(cacheKey)
//     if (j >= n) return i >= m
//     let ans = false
//     const firstMatch = i < m && [s[i], '.'].includes(p[j])
//     if (j <= n - 2 && p[j + 1] === '*') {
//       ans = recursion(i, j + 2) || (firstMatch && recursion(i + 1, j))
//     } else {
//       ans = firstMatch && recursion(i + 1, j + 1)
//     }
//     cache.set(cacheKey, ans)
//     return ans
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = isMatch('aa', 'a')
assert.equal(res1, false)
const res2 = isMatch('aa', 'a*')
assert.equal(res2, true)
const res3 = isMatch('ab', '.*')
assert.equal(res3, true)
const res4 = isMatch('aab', 'c*a*b')
assert.equal(res4, true)
const res5 = isMatch('mississippi', 'mis*is*p*.')
assert.equal(res5, false)
/**
解法

1. 递归
m为s的长度，n为p的长度
f(i,j)表示s[i,m)和p[j,n)是否匹配，不能看出可以拆分成重复子问题的
判断s[i]和p[j]是否匹配，然后继续判断剩下的子串是否匹配即可。
具体细节如下：

1. 判断首字符是否匹配，还得判断s的子串是否为空
`firstMatch = i < n && [s[i], '.'].includes(p[i])`
2. 处理‘*’情况，
2.1 如果有字符和‘*’结合， `j <= m - 2 && p[j + 1] === '*'`
有两种选择，可以匹配0次（不匹配）,跳过p[j]字符和‘*’，
继续匹配子串`f(i, j + 2)`
或者匹配1次，匹配s[i],p[j]，移动s,继续匹配
`firstMatch && f(i + 1, j)`
2.1 没有‘*’和字符结合，
`firstMath && f(i + 1, j + 1)`

边界情况，如果p的子串长度为空了，就直接返回s的子串是否为空。模板字符串已经
用完了，只需判断s是否也到尽头，是为匹配，否则相反
`if (j >= n) return i >= m`

2. 动态规划
dp[i,j] 表示s[0,i]和p[0,j]的匹配结果，转移方程如下
if p[j] !== '*'
  if s[i] === p[i] || p[i] === '.', dp[i][j] = dp[i-1][j-1]
  otherwise, dp[i][j] = false;
otherwise
  if s[i] === p[i-1] || p[i-1] === '.', dp[i][j] = dp[i-1][j] || dp[i][j-2]
  otherwise, dp[i][j] = dp[i][j-2]
思路和1类似的
终点也是对‘*’的处理，
当p[j]是'*'，无非两种情况
1. 前一个字符p[j-1]和s[i]匹配上，这时候可以选择匹配s[i]，或者不匹配（匹配0次）
匹配的话，就是从dp[i-1][j]转移，不匹配，dp[i][j-2]
2. 否则，只能是一种情况，匹配0次，dp[i][j-2]
 */
