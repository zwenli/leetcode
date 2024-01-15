/*
 * @lc app=leetcode.cn id=1037 lang=javascript
 *
 * [1037] 有效的回旋镖
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {boolean}
 */
var isBoomerang = function (points) {
  // 三点各不相同且不在一条直线上
  // 等价于 两个向量的叉乘不为0，（为0说明两个向量平行或重合）
  const [[x0, y0], [x1, y1], [x2, y2]] = points
  const v1 = [x1 - x0, y1 - y0]
  const v2 = [x2 - x0, y2 - y0]
  return v1[0] * v2[1] - v1[1] * v2[0] != 0
}
// @lc code=end
