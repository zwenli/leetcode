/*
 * @lc app=leetcode.cn id=467 lang=javascript
 *
 * [467] 环绕字符串中唯一的子字符串
 */

// @lc code=start
/**
 * @param {string} p
 * @return {number}
 */
var findSubstringInWraproundString = function (p) {
  // time complexity O(n)
  // space complexity O(e): e为字母数量，这里为26
  // 动态规划，dp[a] 表示p中以字母a结尾且在s中的子串的最长长度，
  // 对于以同一字符结尾的子串，长的必定包含短的，观察可知，字母a结尾的子串数量即为dp[a]
  // 如何计算dp[a]，在遍历p时，维护连续递增的子串长度k。
  // 遍历到p[i]时，当 p[i]是p[i-1]在字母表中的下一个字母，则k累加1，否则置为1，表示重新开始计算连续递增的子串长度。
  // 然后用k更新dp[p[i]]的最大值。
  // dp的累加即是所求答案
  // 相关知识，前缀和，后缀和
  const BASE = 'a'.charCodeAt(0)
  const dp = new Array(26).fill(0)
  let k = 0
  for (let i = 0; i < p.length; i += 1) {
    const charCode = p.charCodeAt(i)
    // a - z 的情况为-25，加上26再余都为1
    if (i > 0 && (charCode - p.charCodeAt(i - 1) + 26) % 26 === 1) {
      k += 1
    } else {
      k = 1
    }
    dp[charCode - BASE] = Math.max(dp[charCode - BASE], k)
  }
  return dp.reduce((sum, i) => sum + i, 0)
}
// @lc code=end

const assert = require('assert').strict

const res1 = findSubstringInWraproundString('zab')
assert.equal(res1, 6)