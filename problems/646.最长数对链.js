/*
 * @lc app=leetcode.cn id=646 lang=javascript
 *
 * [646] 最长数对链
 */

// @lc code=start
/**
 * @param {number[][]} pairs
 * @return {number}
 */
// var findLongestChain = function(pairs) {
//   // 贪心
//   // time complexity (nlogn)
//   // space complexity (1)
//   // 相似题目，射箭，右端排序
//   pairs.sort((a, b) => a[1] - b[1])
//   const n = pairs.length
//   let prev = pairs[0]
//   let ans = 1
//   for (let i = 1; i < n; i++) {
//     if (prev[1] < pairs[i][0]) {
//       ans++
//       prev = pairs[i]
//     }
//   }
//   return ans
// };

var findLongestChain = function(pairs) {
  // dp
  // dp[i] 表示以pairs[i]结尾的的最长链的长度，
  // 当 i < j 且 pairs[i][1] < pairs[j][0] 时，
  // 扩展数对链，更新 dp[j] = Math.max(dp[j], dp[i] + 1)
  pairs.sort((a, b) => a[0] - b[0])
  const n = pairs.length
  const dp = new Array(n).fill(1)
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < j; i++) {
      if (pairs[i][1] < pairs[j][0]) {
        dp[j] = Math.max(dp[j], dp[i] + 1)
      }
    }
  }
  return Math.max(...dp)
};
// @lc code=end

const assert = require('node:assert').strict

const res1 = findLongestChain([[1,2], [2,3], [3,4]])
assert.equal(res1, 2)
