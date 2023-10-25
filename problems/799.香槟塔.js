/*
 * @lc app=leetcode.cn id=799 lang=javascript
 *
 * [799] 香槟塔
 */

// @lc code=start
/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
var champagneTower = function (poured, query_row, query_glass) {
  // 模拟，算是dp？
  // 中文：https://leetcode.cn/problems/champagne-tower/solutions/1979893/xiang-bin-ta-by-leetcode-solution-y87c/
  // 英文：https://leetcode.com/problems/champagne-tower/solutions/1818599/full-visual-explanation-dp-beginner-friendly-easy-and-simple-c/
  
  // 第0层，所有香槟倒入第0个杯子
  let row = [poured]
  for (let i = 1; i <= query_row; i++) {
    // 遍历求出下一层各个杯子的香槟体积
    const nextRow = new Array(i + 1).fill(0)
    for (let j = 0; j < i; j++) {
      // 体积小于等于1，没有溢出
      if (row[j] <= 1) continue
      // 溢出的体积，扣除自身的1，分给下层的两个相邻杯子
      // 注意下下层杯子是要累计上当前层溢出的体积
      nextRow[j] += (row[j] - 1) / 2
      nextRow[j + 1] += (row[j] - 1) / 2
      // 当前杯子处理完成后，体积置为1。这一步也可以不处理
      row[j] = 1
    }

    row = nextRow
  }

  return Math.min(1, row[query_glass])
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = champagneTower(1, 1, 1)
assert.equal(res1, 0)

const res2 = champagneTower(2, 1, 1)
assert.equal(res2, 0.5)

const res3 = champagneTower(100000009, 33, 17)
assert.equal(res3, 1)
