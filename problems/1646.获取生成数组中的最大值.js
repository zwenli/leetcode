/*
 * @lc app=leetcode.cn id=1646 lang=javascript
 *
 * [1646] 获取生成数组中的最大值
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
function getMaximumGenerated(n) {
  if (n < 2) return n
  const dp = new Array(n + 1).fill(0)
  dp[1] = 1
  let res = dp[1];
  for (let i = 1; 2 * i <= n; i++) {
    dp[2 * i] = dp[i]
    if (2 * i + 1 <= n) {
      dp[2 * i + 1] = dp[i] + dp[i + 1]
      res = Math.max(res, dp[2 * i + 1])
    }
  }
  return res
}
// @lc code=end

const assert = require('assert').strict

const res1 = getMaximumGenerated(7)
assert.equal(res1, 3)

const res2 = getMaximumGenerated(2)
assert.equal(res2, 1)

const res3 = getMaximumGenerated(3)
assert.equal(res3, 2)
