/*
 * @lc app=leetcode.cn id=85 lang=javascript
 *
 * [85] 最大矩形
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  // https://leetcode.cn/problems/maximal-rectangle/solutions/1861698/by-ac_oier-k02i/?envType=problem-list-v2&envId=dynamic-programming
  // sums[i] 表示以第i行为基准线，统计每一列中基准线及以上连续 1 的个数
  // 从而将问题转化为 84.柱状图中最大的矩形.js
  const m = matrix.length
  const n = matrix[0].length
  const sums = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      sums[i][j] = matrix[i - 1][j - 1] === '0' ? 0 : sums[i - 1][j] + 1
    }
  }
  const l = new Array(n + 1).fill(0)
  const r = new Array(n + 1).fill(n + 1)
  const stack = []
  let ans = 0
  for (let i = 1; i <= m; i++) {
    const sum = sums[i]
    l.fill(0)
    r.fill(n + 1)
    stack.length = 0
    // l[j] 记录第j个柱子左侧第一个比它矮的柱子下标
    for (let j = 1; j <= n; j++) {
      while (stack.length && sum[j] <= sum[stack[stack.length - 1]]) {
        // 当前柱子比栈顶矮，不符要求，弹出栈顶，
        stack.pop()
      }
      // 栈为空，说明柱子左侧没有比它矮的柱子下标，取0方便计算
      l[j] = stack.length === 0 ? 0 : stack[stack.length - 1]
      stack.push(j)
    }
    stack.length = 0
    // r[j] 原理同上
    for (let j = n; j > 0; j--) {
      while (stack.length && sum[j] <= sum[stack[stack.length - 1]]) {
        stack.pop()
      }
      r[j] = stack.length === 0 ? n + 1 : stack[stack.length - 1]
      stack.push(j)
    }
    // 计算面积
    for (let j = 1; j <= n; j++) {
      ans = Math.max(ans, (r[j] - l[j] - 1) * sum[j])
    }
  }
  return ans
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = maximalRectangle([
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0'],
])

assert.equal(res1, 6)
