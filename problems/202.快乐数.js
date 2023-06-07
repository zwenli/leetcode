/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
 
// 另外一种方法是通过hash记录数值，遇到重复的说明不是

var isHappy = function (n) {
  // 可能存在三种情况
  // 1. 最终得到1
  // 2. 最终会进入循环
  // 3. 值会越来越大，最后接近无穷大（不可能，具体看官方证明）
  let slow = n
  let fast = n
  do {
    slow = squareSum(slow)
    fast = squareSum(squareSum(fast))
  } while (slow !== fast)
  return fast === 1
}
function squareSum(m) {
  let sum = 0
  while (m !== 0) {
    sum += (m % 10) ** 2
    m = Math.floor(m / 10)
  }
  return sum
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = isHappy(19)
assert.equal(res1, true)

const res2 = isHappy(2)
assert.equal(res2, false)
