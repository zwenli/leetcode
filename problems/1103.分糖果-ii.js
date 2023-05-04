/*
 * @lc app=leetcode.cn id=1103 lang=javascript
 *
 * [1103] 分糖果 II
 */

// @lc code=start
/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function (candies, num_people) {
  // 等差数列求和，推导过程见：
  // https://leetcode.cn/problems/distribute-candies-to-people/solution/fen-tang-guo-ii-by-leetcode-solution/
  const p = (Math.sqrt(2 * candies + 0.25) - 0.5) >> 0
  const remaining = (candies - (p * (p + 1)) / 2) >> 0
  const rows = (p / num_people) >> 0
  const cols = p % num_people

  const d = new Array(num_people).fill(0)
  for (let i = 0; i < num_people; i++) {
    d[i] = ((i + 1) * rows + (num_people * rows * (rows - 1)) / 2) >> 0
    if (i < cols) {
      d[i] += (i + 1) + rows * num_people
    }
  }
  d[cols] += remaining
  return d
}

// var distributeCandies = function (candies, num_people) {
//   const arr = new Array(num_people).fill(0)
//   let i = 0
//   while (candies > 0) {
//     arr[i % num_people] += Math.min(i + 1, candies)
//     candies -= Math.min(i + 1, candies)
//     i += 1
//   }
//   return arr
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = distributeCandies(7, 4)
assert.deepEqual(res1, [1, 2, 3, 1])

const res2 = distributeCandies(10, 3)
assert.deepEqual(res2, [5, 2, 3])
