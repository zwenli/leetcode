/*
 * @lc app=leetcode.cn id=135 lang=javascript
 *
 * [135] 分发糖果
 */

// @lc code=start
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  // 「相邻的孩子中，评分高的孩子必须获得更多的糖果」这句话拆分为两个规则，分别处理。
  // 左规则: 当 ratings[i] > ratings[i - 1] 时，第i号学生的糖果要比i-1号学生的糖果多
  // 右规则: 当 ratings[i] > ratings[i + 1] 时，第i号学生的糖果要比i+1号学生的糖果多
  const n = ratings.length
  const dp = new Array(n).fill(1)
  for (let i = 1; i < n; i++) {
    // //从左向右遍历 如果相邻右边孩子评分大于左边 则右边孩子糖果数等于左边孩子的糖果数量加一
    if (ratings[i] > ratings[i - 1]) {
      dp[i] = dp[i - 1] + 1
    }
  }
  for (let i = n - 2; i >= 0; i--) {
    // //第二次遍历 从右向左遍历
    // 如果相邻左边孩子评分大于右边 并且拥有的糖果数还低于右边
    // 则要在右边孩子的糖果数上加一作为左边孩子应该获得的糖果数
    if (ratings[i] > ratings[i + 1]) {
      dp[i] = Math.max(dp[i], dp[i + 1] + 1)
    }
  }

  return dp.reduce((acc, cur) => acc + cur, 0)
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = candy([1, 0, 2])
assert.equal(res1, 5)

const res2 = candy([1, 2, 2])
assert.equal(res2, 4)
