/*
 * @lc app=leetcode.cn id=319 lang=javascript
 *
 * [319] 灯泡开关
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var bulbSwitch = function (n) {
  // 1 0 0 1 0 0 0 0 1 (6个0) 1 (2i个0) 1
  // 观察可知，亮灯数量和n的平方根有关
  // n = 1, 1
  // n = 4, 2
  // n = 9, 3
  // n = 16, 4
  // 取整
  return Math.sqrt(n) >> 0
}
// var bulbSwitch = function (n) {
//   // 暴力
//   const arr = new Array(n).fill(0)
//   for (let i = 1; i <= n; i++) {
//     for (j = i; j <= n; j += i) {
//       arr[j - 1] = (arr[j - 1] + 1) % 2
//     }
//   }
//   return arr.reduce((s, n) => s + n, 0)
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = bulbSwitch(0)
assert.equal(res1, 0)

const res2 = bulbSwitch(1)
assert.equal(res2, 1)

const res3 = bulbSwitch(5)
assert.equal(res3, 2)

const res4 = bulbSwitch(55)
assert.equal(res4, 7)
