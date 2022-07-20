/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
function eraseOverlapIntervals(intervals) {
  // https://leetcode.com/problems/non-overlapping-intervals/discuss/91713/Java%3A-Least-is-Most
  // https://leetcode.cn/problems/non-overlapping-intervals/solution/-by-1105389168-ku0o/
  if (intervals.length < 2) return 0
  intervals.sort((a, b) => a[1] - b[1]) // 区间结尾排序
  const n = intervals.length
  let ans = 1
  let pos = intervals[0][1] // 前一个区间的结尾
  for (let i = 1; i < n; i += 1) {
    if (intervals[i][0] >= pos) {
      pos = intervals[i][1]
      ans++
    }
  }
  return n - ans
}
// function eraseOverlapIntervals(intervals) {
//   // dp 超时
//   // dp[i] 表示以区间i为最后一个区间，可以选出的区间数量的最大值
//   if (intervals.length < 2) {
//     return 0
//   }
//   intervals.sort((a, b) => a[0] - b[0])
//   const n = intervals.length
//   const dp = new Array(n).fill(1)
//   for (let i = 1; i < n; i++) {
//     for (let j = 0; j < i; j++) {
//       // [lj, rj] <= [li, ri]
//       if (intervals[i][0] >= intervals[j][1]) {
//         dp[i] = Math.max(dp[i], dp[j] + 1)
//       }
//     }
//   }
//   return n - Math.max(...dp)
// }
// @lc code=end

const assert = require('assert').strict

const res1 = eraseOverlapIntervals([
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 3],
])
assert.equal(res1, 1)

const res2 = eraseOverlapIntervals([
  [1, 2],
  [1, 2],
  [1, 2],
])
assert.equal(res2, 2)

const res3 = eraseOverlapIntervals([
  [1, 2],
  [2, 3],
])
assert.equal(res3, 0)

const res4 = eraseOverlapIntervals([[1, 2]])
assert.equal(res4, 0)
