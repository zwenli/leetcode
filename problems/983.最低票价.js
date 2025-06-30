/*
 * @lc app=leetcode.cn id=983 lang=javascript
 *
 * [983] 最低票价
 */

// @lc code=start
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
function mincostTickets(days, costs) {
  // 空间优化
  const lastDay = days[days.length - 1] // 获取最后出行日
  const daySet = new Set(days) // 快速查询是否出行
  const dp = new Array(30).fill(Infinity) // 只保留最近30天的记录
  dp[0] = 0 // 基准情况：第0天花费为0
  for (let i = 1; i <= lastDay; i++) {
    if (daySet.has(i)) {
      // 当天需要出行
      // 三种购票策略取最小值
      dp[i % 30] = Math.min(
        dp[Math.max(i - 1, 0) % 30] + costs[0],
        dp[Math.max(i - 7, 0) % 30] + costs[1],
        dp[Math.max(i - 30, 0) % 30] + costs[2]
      )
    } else {
      // 当天不需要出行
      dp[i % 30] = dp[(i - 1) % 30] // 延续前一天的花费
    }
  }

  return dp[lastDay % 30] // 返回最后一天的最小花费
}

// function mincostTickets(days, costs) {
//   const lastDay = days[days.length - 1] // 获取最后出行日
//   const daySet = new Set(days) // 快速查询是否出行
//   const dp = new Array(lastDay + 1).fill(Infinity)
//   dp[0] = 0 // 基准情况：第0天花费为0
//   for (let i = 1; i <= lastDay; i++) {
//     if (daySet.has(i)) {
//       // 当天需要出行
//       // 三种购票策略取最小值
//       dp[i] = Math.min(
//         dp[Math.max(i - 1, 0)] + costs[0],
//         dp[Math.max(i - 7, 0)] + costs[1],
//         dp[Math.max(i - 30, 0)] + costs[2]
//       )
//     } else {
//       // 当天不需要出行
//       dp[i] = dp[i - 1] // 延续前一天的花费
//     }
//   }

//   return dp[lastDay] // 返回最后一天的最小花费
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15])
assert.equal(res1, 11)

const res2 = mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15])
assert.equal(res2, 17)

const res3 = mincostTickets([1, 4, 6, 7, 8, 20], [7, 2, 15])
assert.equal(res3, 6)

const res4 = mincostTickets([6, 8, 9, 18, 20, 21, 23, 25], [2, 10, 41])
assert.equal(res4, 16)
