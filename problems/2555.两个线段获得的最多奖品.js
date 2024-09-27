/*
 * @lc app=leetcode.cn id=2555 lang=javascript
 *
 * [2555] 两个线段获得的最多奖品
 */

// @lc code=start
/**
 * @param {number[]} prizePositions
 * @param {number} k
 * @return {number}
 */
var maximizeWin = function(prizePositions, k) {
  // https://leetcode.cn/problems/maximize-win-from-two-segments/solutions/2913227/hua-dong-chuang-kou-dong-tai-gui-hua-by-yyy4f
  let ans = 0
  const n = prizePositions.length
  const f = new Array(n).fill(0) // 以下标i为结尾的最大覆盖
  const g = new Array(n).fill(0) // 以0到i下标结尾的最大覆盖的最大值
  for (let l = 0, r = 0; r < n; r++) {
    while (prizePositions[r] - prizePositions[l] > k) {
      l++
    }
    f[r] = r - l + 1
    if (r === 0) {
      g[r] = f[r]
    } else {
      g[r] = Math.max(g[r - 1], f[r])
    }
    if (r - f[r] >= 0) {
      ans = Math.max(ans, f[r] + g[r - f[r]])
    }
  }
  ans = Math.max(ans, g[n - 1])
  return ans
};
// @lc code=end
