/*
 * @lc app=leetcode.cn id=892 lang=javascript
 *
 * [892] 三维形体的表面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function (grid) {
  let ans = 0
  const dx = [1, 0, -1, 0]
  const dy = [0, 1, 0, -1]
  const n = grid.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] > 0) {
        // 底 + 顶
        ans += 2
        // 四面
        for (let k = 0; k < 4; k++) {
          const ni = i + dx[k]
          const nj = j + dy[k]
          if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
            ans += Math.max(grid[i][j] - grid[ni][nj], 0)
          } else {
            ans += grid[i][j]
          }
        }
      }
    }
  }
  return ans
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = surfaceArea([[1,2],[3,4]])
assert.equal(res1, 34)

const res2 = surfaceArea([[1,1,1],[1,0,1],[1,1,1]])
assert.equal(res2, 32)

const res3 = surfaceArea([[2,2,2],[2,1,2],[2,2,2]])
assert.equal(res3, 46)
