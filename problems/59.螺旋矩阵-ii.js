/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const res = Array.from({ length: n }, () => Array.from({ length: n }))
  let cur = 1
  let r0 = 0
  let r1 = n - 1
  let c0 = 0
  let c1 = n - 1
  while (r0 <= r1 && c0 <= c1) {
    // 上
    for (let i = c0; i <= c1; i++) {
      res[r0][i] = cur++
    }
    // 右
    for (let i = r0 + 1; i <= r1; i++) {
      res[i][c1] = cur++
    }
    // 下
    for (let i = c1 - 1; i >= c0; i--) {
      res[r1][i] = cur++
    }
    // 左
    for (let i = r1 - 1; i > r0; i--) {
      res[i][c0] = cur++
    }

    r0++
    r1--
    c0++
    c1--
  }
  return res
}
// @lc code=end
