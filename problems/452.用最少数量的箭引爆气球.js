/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
function findMinArrowShots(points) {
  if (!points.length) return 0
  const n = points.length
  points.sort((a, b) => a[1] - b[1])
  let ans = 1
  let pos = points[0][1]
  for (let i = 1; i < n; i++) {
    if (pos < points[i][0]) {
      pos = points[i][1]
      ans++
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = findMinArrowShots([
  [10, 16],
  [2, 8],
  [1, 6],
  [7, 12],
])
assert.equal(res1, 2)

const res2 = findMinArrowShots([
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
])
assert.equal(res2, 4)

const res3 = findMinArrowShots([
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
])
assert.equal(res3, 2)
