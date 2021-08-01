/*
 * @lc app=leetcode.cn id=44 lang=javascript
 *
 * [44] 通配符匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

function isMatch(s, p) {
  // 动态规划
  // time complexity O(mn)
  // space complexity O(mn)
  let m = s.length
  let n = p.length
  const dp = new Array(m + 1)
    .fill(false)
    .map(() => new Array(n + 1).fill(false))
  // base case
  dp[0][0] = true
  for (let j = 1; j <= n; j += 1) {
    if (p[j - 1] === '*') {
      dp[0][j] = true;
    } else break;
  }
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      if (p[j - 1] === s[i - 1] || p[j - 1] === '?') {
        dp[i][j] = dp[i - 1][j - 1]
      } else if (p[j - 1] === '*') {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1]
      }
    }
  }
  return dp[m][n]
}
// @lc code=end

const assert = require('assert').strict;

const res1 = isMatch('aa', 'a');
assert.equal(res1, false);
const res2 = isMatch('aa', '*');
assert.equal(res2, true);
const res3 = isMatch('cb', '?a');
assert.equal(res3, false);
const res4 = isMatch('adceb', '*a*b');
assert.equal(res4, true);
const res5 = isMatch('acdcb', 'a*c?b');
assert.equal(res5, false);

/**
相关题目： 10.正则表达式匹配

解法

1. 动态规划
dp[i][j] 表示 子串s[0,i]、p[0,j]是否匹配
问题可以分解为当前s[i]、p[j]是否匹配，以及
s[0,i-1]、p[0,j-1]是否匹配(重复子问题)，
具体如下：
s[i] === p[j]， dp[i][j] = dp[i-1][j-1]
当前字符匹配上后，就看子串是否匹配
p[j] === '?'， dp[i][j] = dp[i-1][j-1]
p[j]为'?'时，对s[i]没任何要求，直接看子串
p[j] === '*', dp[i][j] = dp[i-1][j] || dp[i][j-1]
p[j]为'*'时，对s[i]没任何要求，但是有两种情况，使用*或者不使用
如果不使用‘*’，那么状态从dp[i][j-1]转移而来，
变成s[0,i]和p[0, j-1]的匹配问题；
如果使用'*'，那么状态从dp[i-1][j]转移而来，
变成s[0,i-1]和p[0,j]的匹配问题。

边界情况
dp[0][0] = true; 两个空字符串为匹配的
dp[i][0] = false; 空模式无法匹配非空字符串
dp[0][j] 需要分情况处理，因为星号才能匹配空字符串，
所以只有当模式p的前j个字符均为星号时，dp[0][j]才为真
 */
