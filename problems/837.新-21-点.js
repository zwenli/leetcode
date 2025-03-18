/*
 * @lc app=leetcode.cn id=837 lang=javascript
 *
 * [837] 新 21 点
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @param {number} maxPts
 * @return {number}
 */
var new21Game = function (n, k, maxPts) {
  // https://leetcode.com/problems/new-21-game/solutions/132334/one-pass-dp-o-n/?envType=problem-list-v2&envId=dynamic-programming
  // 当N大于等于K + W时，游戏必然会在K到N之间结束，概率为1。
  // 当K为0时，游戏一开始就结束，概率也为1.
  if (k === 0 || n >= k + maxPts) return 1
  // dp[i] 表示得到点数i的概率
  // 那么要求 [k, n] 的概率等于 1 - dp[k - 1]
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1 // base case
  let wSum = 1.0 // 最近 maxPts 个dp值之和
  let res = 0
  for (let i = 1; i <= n; i++) {
    // 维护一个大小为 maxPts 的滑动窗口
    // 快速计算dp[i] = 最近 maxPts 个dp值之和 / maxPts
    // 这是因为每次抽牌的点数在1到maxPts之间均匀分布，所以当前点的概率是前面maxPts个点的概率和的平均值。
    dp[i] = wSum / maxPts
    if (i < k) {
      // 加入滑动窗口
      // 说明玩家还会继续抽牌，所以当前点的概率需要被加入到wSum中，以供后续点数的计算使用。
      wSum += dp[i]
    } else {
      // 加入结果
      // 玩家会停止抽牌，这时将dp[i]累加到结果res中，因为这些点数都是有效的成功情况。
      res += dp[i]
    }
    if (i - maxPts >= 0) {
      // 将 i - maxPts 移出滑动窗口，保持窗口内的元素数量不超过maxPts
      // 这样可以确保每次计算dp[i]时，wSum只包含最近的maxPts个值，避免重复计算，从而优化时间复杂度。
      wSum -= dp[i - maxPts]
    }
  }
  return res
}
// var new21Game = function (n, k, maxPts) {
//   // https://leetcode.cn/problems/new-21-game/solutions/272352/xin-21dian-by-leetcode-solution/?envType=problem-list-v2&envId=dynamic-programming
//   if (k === 0) return 1
//   const dp = new Array(k + maxPts).fill(0)
//   for (let i = k; i <= n && i < k + maxPts; i++) {
//     dp[i] = 1
//   }
//   dp[k - 1] = Math.min(n - k + 1, maxPts) / maxPts
//   for (let i = k - 2; i >= 0; i--) {
//     dp[i] = dp[i + 1] - (dp[i + maxPts + 1] - dp[i + 1]) / maxPts
//   }
//   return dp[0]
// }
// var new21Game = function (n, k, maxPts) {
//   // 超时
//   if (k === 0) return 1
//   const dp = new Array(k + maxPts).fill(0)
//   for (let i = k; i <= n && i < k + maxPts; i++) {
//     dp[i] = 1
//   }
//   for (let i = k - 1; i >= 0; i--) {
//     for (let j = 1; j <= maxPts; j++) {
//       dp[i] += dp[i + j] / maxPts
//     }
//   }
//   return dp[0]
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = new21Game(6, 1, 10)
assert.equal(res1, 0.6)

const res2 = new21Game(21, 17, 10)
assert.equal(Number(res2.toFixed(5)), 0.73278)
