/*
 * @lc app=leetcode.cn id=650 lang=javascript
 *
 * [650] 只有两个键的键盘
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function(n) {
  // dp, 优化
  // time complexity O(n^(3/2))
  // space complexity O(n)
  // 在枚举i和j时，可以直接在O(i)的时间内依次枚举[1, i)
  // 由于i肯定同时拥有因数j和i/j，两者必有一个小于√i。因此，一种时间复杂度更低的方法是，
  // 在[1, √i]的范围内枚举j，并用j和i/j分别作为因数进行状态转移，时间复杂度为O(√i)
  const dp = new Array(n + 1).fill(0)
  for (let i = 2; i <= n; i++) {
    dp[i] = Number.MAX_SAFE_INTEGER
    for (let j = 1; j * j <= i; j++) {
      if (i % j === 0) {
        dp[i] = Math.min(dp[i], dp[j] + i / j)
        dp[i] = Math.min(dp[i], dp[i / j] + j)
      }
    }
  }
  return dp[n]
};
// var minSteps = function(n) {
//   // dp
//   // time complexity O(n^2)
//   // space complexity O(n)
//   const dp = new Array(n + 1).fill(0)
//   for (let i = 2; i <= n; i++) {
//     dp[i] = i
//     for (let j = 2; j * 2 < i; j++) {
//       if (i % j === 0) {
//         dp[i] = Math.min(dp[i], dp[j] + i / j)
//       }
//     }
//   }
//   return dp[n]
// };
// @lc code=end

const assert = require('node:assert').strict

const res1 = minSteps(3)
assert.equal(res1, 3)

const res2 = minSteps(1)
assert.equal(res2, 0)

/**
dp[1] = 0
dp[2] = 2, copy -> paste
dp[3] = 3, copy -> paste -> paste
dp[4] = 4, copy -> paste -> copy -> paste
dp[5] = 5, copy -> paste -> paste -> paste -> paste
dp[6] = 5, copy paste paste copy paste
dp[9] = 6, copy paste paste copy paste paste
// i 为质数， dp[i] = i
i % j === 0 , dp[i] = dp[j] + i / j, j = [1, i)

要得到i个A，必须要首先拥有j个A，再使用一次「复制全部」操作，
再使用若干个「粘贴」操作得到i个A，
因此这里的j必须是i的因子，「粘贴」操作的使用次数为 i/j-1，
因此可得出上面的状态转移方程式
 */
