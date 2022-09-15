/*
 * @lc app=leetcode.cn id=826 lang=javascript
 *
 * [826] 安排工作以达到最大收益
 */

// @lc code=start
/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */

// TODO: dp
// https://leetcode.com/problems/most-profit-assigning-work/discuss/175676/Java-Memorization-without-sortBeat-99.85

var maxProfitAssignment = function (difficulty, profit, worker) {
  // 排序
  // 如果我们先访问低难度的工作，那么收益一定是截至目前最好的。
  const n = difficulty.length
  const jobs = new Array(n)
  for (let i = 0; i < n; i++) {
    jobs[i] = [difficulty[i], profit[i]]
  }
  jobs.sort((a, b) => a[0] - b[0])
  worker.sort((a, b) => a - b)
  let ans = 0
  let best = 0 // 最大可用利润
  let i = 0
  for (const skill of worker) {
    while (i < n && skill >= jobs[i][0]) {
      best = Math.max(best, jobs[i++][1])
    }
    ans += best
  }
  return ans
}

// var maxProfitAssignment = function (difficulty, profit, worker) {
//   // 暴力
//   let ans = 0
//   for (const w of worker) {
//     let p = 0
//     for (let i = 0, l = difficulty.length; i < l; i++) {
//       if (w >= difficulty[i]) {
//         p = Math.max(p, profit[i])
//       }
//     }
//     ans += p
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = maxProfitAssignment([2,4,6,8,10], [10,20,30,40,50], [4,5,6,7])
assert.equal(res1, 100)

const res2 = maxProfitAssignment([85,47,57], [24,66,99], [40,25,25])

assert.equal(res2, 0)