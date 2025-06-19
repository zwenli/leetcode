/*
 * @lc app=leetcode.cn id=1218 lang=javascript
 *
 * [1218] 最长定差子序列
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} difference
 * @return {number}
 */
var longestSubsequence = function (arr, difference) {
  // dp[v] 表示以整数v结尾的最长等差子序列的长度
  const dp = new Map()
  let ans = 0
  for (const v of arr) {
    dp.set(v, (dp.get(v - difference) ?? 0) + 1)
    ans = Math.max(ans, dp.get(v))
  }
  return ans
}

// var longestSubsequence = function (arr, difference) {
//   // time limit exceeded
//   // dp[i] 表示以 arr[i] 为尾的最长等差子序列的长度
//   const n = arr.length
//   const dp = new Array(n).fill(1)
//   let ans = 1
//   for (let i = 1; i < n; i++) {
//     for (let j = 0; j < i; j++) {
//       if (arr[i] - arr[j] === difference) {
//         dp[i] = Math.max(dp[i], dp[j] + 1)
//       }
//     }
//     ans = Math.max(ans, dp[i])
//   }

//   return ans
// }
// @lc code=end
