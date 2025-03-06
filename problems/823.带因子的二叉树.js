/*
 * @lc app=leetcode.cn id=823 lang=javascript
 *
 * [823] 带因子的二叉树
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var numFactoredBinaryTrees = function (arr) {
  const mod = 1e9 + 7
  const n = arr.length
  const dp = new Array(n).fill(1)
  let res = 0
  arr.sort((a, b) => a - b)

  for (let i = 0; i < n; i++) {
    for (let left = 0, right = i - 1; left <= right; left++) {
      while (left <= right && arr[left] * arr[right] > arr[i]) {
        right--
      }
      if (left <= right && arr[left] * arr[right] === arr[i]) {
        if (left !== right) {
          dp[i] = (dp[i] + dp[left] * dp[right] * 2) % mod
        } else {
          dp[i] = (dp[i] + dp[left] * dp[right]) % mod
        }
      }
    }
    res = (res + dp[i]) % mod
  }

  return res
}
// @lc code=end
