/*
 * @lc app=leetcode.cn id=57 lang=javascript
 *
 * [57] 插入区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  // https://leetcode.cn/problems/insert-interval/solutions/472151/cha-ru-qu-jian-by-leetcode-solution/?envType=study-plan-v2&envId=top-interview-150
  let [left, right] = newInterval
  let placed = false
  const ans = []
  for (const [li, ri] of intervals) {
    if (li > right) {
      if (!placed) {
        ans.push([left, right])
        placed = true
      }
      ans.push([li, ri])
    } else if (ri < left) {
      ans.push([li, ri])
    } else {
      left = Math.min(left, li)
      right = Math.max(right, ri)
    }
  }
  if (!placed) {
    ans.push([left, right])
  }
  return ans
}

// var insert = function (intervals, newInterval) {
//   // 加入
//   // 重新排序
//   // 最后再合并 56题的解法
//   // time complexity O(nlogn)
// }
// @lc code=end
