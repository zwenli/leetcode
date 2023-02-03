/*
 * @lc app=leetcode.cn id=371 lang=javascript
 *
 * [371] 两整数之和
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */

var getSum = function (a, b) {
  // 位运算
  // 无进位加法结果为 a ^ b
  // 进位结果为 (a & b) << 1
  // 问题可以拆解为无进位加法结果与进位结果之和。
  // 有符号整数
  while (b != 0) {
    const carry = (a & b) << 1
    a = a ^ b
    b = carry
  }
  return a
}
// var getSum = function (a, b) {
//   // 递归
//   // 无进位加法结果为 a ^ b
//   // 进位结果为 (a & b) << 1
//   // 问题可以拆解为无进位加法结果与进位结果之和。
//   return b === 0 ? a : getSum(a ^ b, (a & b) << 1)
// }
// var getSum = function (a, b) {
//   // xor
//   let ans = 0
//   let carry = 0 // 进位
//   for (let i = 0; i < 32; i++) {
//     const x = (a >> i) & 1
//     const y = (b >> i) & 1
//     if (x === 1 && y === 1) {
//       ans |= carry << i
//       carry = 1
//     } else if (x === 1 || y === 1) {
//       ans |= (1 ^ carry) << i
//     } else {
//       ans |= carry << i
//       carry = 0
//     }
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = getSum(1, 2)
assert.equal(res1, 3)

const res2 = getSum(2, 3)
assert.equal(res2, 5)
