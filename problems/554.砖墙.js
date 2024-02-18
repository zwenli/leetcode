/*
 * @lc app=leetcode.cn id=554 lang=javascript
 *
 * [554] 砖墙
 */

// @lc code=start
/**
 * @param {number[][]} wall
 * @return {number}
 */
var leastBricks = function (wall) {
  // 问题可以转换成求「垂线穿过的砖块边缘数量的最大值」
  // https://leetcode.cn/problems/brick-wall/solutions/747349/zhuan-qiang-by-leetcode-solution-2kls/
  const cnt = new Map() // 记录砖右侧边缘到砖墙的左边缘的距离的出现次数
  for (const widths of wall) {
    const n = widths.length
    let sum = 0
    for (let i = 0; i < n - 1; i++) {
      sum += widths[i]
      cnt.set(sum, (cnt.get(sum) || 0) + 1)
    }
  }
  let maxCnt = 0
  for (const [_, c] of cnt.entries()) {
    maxCnt = Math.max(maxCnt, c)
  }
  // 该垂线经过的砖块数量即为砖墙的高度减去该垂线经过的砖块边缘的数量。
  return wall.length - maxCnt
}
// @lc code=end
