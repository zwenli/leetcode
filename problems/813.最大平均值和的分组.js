/*
 * @lc app=leetcode.cn id=813 lang=javascript
 *
 * [813] 最大平均值和的分组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumOfAverages = function (nums, k) {
  // dp优化，dp[i][j] 的计算只利用到j-1的数据，优化成一维数组
  const n = nums.length
  const prefix = new Array(n + 1).fill(0)
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i]
  }
  const dp = new Array(n + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    dp[i] = prefix[i] / i
  }
  for (let j = 2; j <= k; j++) {
    // 注意对 i 进行逆序遍历
    for (let i = n; i >= j; i--) {
      for (let x = j - 1; x < i; x++) {
        dp[i] = Math.max(dp[i], dp[x] + (prefix[i] - prefix[x]) / (i - x))
      }
    }
  }
  return dp[n]
}
// var largestSumOfAverages = function (nums, k) {
//   // https://leetcode.cn/problems/largest-sum-of-averages/solutions/1993132/zui-da-ping-jun-zhi-he-de-fen-zu-by-leet-09xt/?envType=problem-list-v2&envId=dynamic-programming
//   const n = nums.length
//   const prefix = new Array(n + 1).fill(0)
//   for (let i = 0; i < n; i++) {
//     prefix[i + 1] = prefix[i] + nums[i]
//   }
//   const dp = new Array(n + 1).fill(0).map(() => new Array(k + 1).fill(0))
//   for (let i = 1; i <= n; i++) {
//     dp[i][1] = prefix[i] / i
//   }
//   for (let j = 2; j <= k; j++) {
//     for (let i = j; i <= n; i++) {
//       for (let x = j - 1; x < i; x++) {
//         dp[i][j] = Math.max(
//           dp[i][j],
//           dp[x][j - 1] + (prefix[i] - prefix[x]) / (i - x)
//         )
//       }
//     }
//   }
//   return dp[n][k]
// }
// @lc code=end
