/*
 * @lc app=leetcode.cn id=486 lang=javascript
 *
 * [486] 预测赢家
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
 
var PredictTheWinner = function(nums) {
  // dp
  // https://leetcode.cn/problems/predict-the-winner/solution/shou-hua-tu-jie-san-chong-xie-fa-di-gui-ji-yi-hua-/
  const n = nums.length
  const dp = new Array(n).fill(0).map(
    () => new Array(n).fill(0)
  )
  for (let i = 0; i < n; i++) {
    dp[i][i] = nums[i]
  }
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = Math.max(
        nums[i] - dp[i + 1][j],
        nums[j] - dp[i][j - 1]
      )
    }
  }
  return dp[0][n - 1] >= 0
};
// var PredictTheWinner = function(nums) {
//   // 记忆化搜索
//   const length = nums.length
//   let memo = new Array(length).fill(null).map(() => new Array(length))
//   return play(0, length - 1) >= 0
//   function play(start, end) {
//     if (start === end) return nums[start]
//     if (memo[start][end] == undefined) {
//       const planA = nums[start] - play(start + 1, end)
//       const planB = nums[end] - play(start, end - 1)
//       memo[start][end] = Math.max(planA, planB)
//     }
//     return memo[start][end]
//   }
// };
// var PredictTheWinner = function(nums) {
//   // 递归
//   // A先进行决策
//   return play(0, nums.length - 1) >= 0
//   function play(start, end) {
//     // 对于A，B决策时，都是会选择最大化自己的收益，同时间接最小化了对方的收益
//     // 对决策者而言，选择自己收益最大的即可
//     if (start === end) return nums[start]
//     const planA = nums[start] - play(start + 1, end)
//     const planB = nums[end] - play(start, end - 1)
//     return Math.max(planA, planB)
//   }
// };
// @lc code=end

const assert = require('node:assert').strict

const res1 = PredictTheWinner([1,5,2])
assert.equal(res1, false)

const res2 = PredictTheWinner([1,5,233,7])
assert.equal(res2, true)
