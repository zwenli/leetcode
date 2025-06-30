/*
 * @lc app=leetcode.cn id=1024 lang=javascript
 *
 * [1024] 视频拼接
 */

// @lc code=start
/**
 * @param {number[][]} clips
 * @param {number} time
 * @return {number}
 */
function videoStitching(clips, time) {
  clips.sort((a, b) => a[0] - b[0])
  // dp[i] 表示区间 [0, i) 覆盖所需的最少子区间的数量
  const dp = new Array(time + 1).fill(Infinity)
  dp[0] = 0 // 基准情况：0时刻不需要任何片段
  for (let i = 1; i <= time; i++) {
    for (const [start, end] of clips) {
      if (i <= start) break // i 不落在片段，提前终止无效循环
      if (i > start && i <= end) { // 当前片段能覆盖时刻i
        // 说明区间可以通过 [0, a) + [a, b) 进行覆盖
        dp[i] = Math.min(dp[i], dp[start] + 1)
      }
    }
  }

  return dp[time] === Infinity ? -1 : dp[time]
}
// @lc code=end
