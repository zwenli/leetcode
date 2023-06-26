/*
 * @lc app=leetcode.cn id=2626 lang=javascript
 *
 * [2626] 数组归约运算

 */

// @lc code=start
/**
 * @typedef Fn
 * @type {(accum: number, curr: number) => number}
 * @param {number[]} nums
 * @param {Fn} fn
 * @param {number} init
 * @return {number}
 */
function reduce(nums, fn, init) {
  let accum = init
  for (const num of nums) {
    accum = fn(accum, num)
  }
  return accum
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = reduce([1, 2, 3, 4], (accum, curr) => accum + curr, 0)
assert.equal(res1, 10)

const res2 = reduce([1, 2, 3, 4], (accum, curr) => accum + curr * curr, 100)
assert.equal(res2, 130)
