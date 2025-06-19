/*
 * @lc app=leetcode.cn id=1027 lang=javascript
 *
 * [1027] 最长等差数列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestArithSeqLength = function (nums) {
  let maxv = -Infinity
  let minv = Infinity
  for (const num of nums) {
    maxv = Math.max(maxv, num)
    minv = Math.min(minv, num)
  }
  const diff = maxv - minv
  let ans = 1
  for (let d = -diff; d <= diff; d++) {
    const f = new Array(maxv + 1).fill(-1)
    for (const num of nums) {
      const prev = num - d
      if (prev >= minv && prev <= maxv && f[prev] !== -1) {
        f[num] = Math.max(f[num], f[prev] + 1)
        ans = Math.max(ans, f[num])
      }
      f[num] = Math.max(f[num], 1)
    }
  }

  return ans
}
// @lc code=end
