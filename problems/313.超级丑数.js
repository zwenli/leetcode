/*
 * @lc app=leetcode.cn id=313 lang=javascript
 *
 * [313] 超级丑数
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
var nthSuperUglyNumber = function (n, primes) {
  // 动态规划
  // time complexity O(mn): m为primes长度
  // space complexity O(m+n): O(n)的空间存dp，O(m)的空间存指针
  const m = primes.length
  const dp = new Array(n + 1).fill(0)
  const p = new Array(m).fill(1)
  dp[1] = 1
  for (let i = 2; i <= n; i += 1) {
    const nums = p.map((v, i) => dp[v] * primes[i])
    dp[i] = Math.min(...nums)
    for (let j = 0; j < m; j += 1) {
      if (nums[j] === dp[i]) p[j] += 1
    }
  }
  return dp[n]
}
// @lc code=end

const assert = require('assert').strict

const res1 = nthSuperUglyNumber(12, [2, 7, 13, 19])
assert.equal(res1, 32)

const res2 = nthSuperUglyNumber(1, [2, 3, 5])
assert.equal(res2, 1)

/**
相关题目：264.丑数-ii
 */
