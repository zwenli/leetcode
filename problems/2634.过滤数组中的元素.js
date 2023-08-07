/*
 * @lc app=leetcode.cn id=2634 lang=javascript
 *
 * [2634] 过滤数组中的元素

 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {(n: number, i: number) => any} fn
 * @return {number[]}
 */
function filter(arr, fn) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (Boolean(fn(arr[i], i)) === true) {
      res.push(arr[i])
    }
  }
  return res
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = filter([0, 10, 20, 30], (n) => n > 10)
assert.deepEqual(res1, [20, 30])

const res2 = filter([1, 2, 3], (n, i) => i === 0)
assert.deepEqual(res2, [1])

const res3 = filter([-2, -1, 0, 1, 2], (n) => n + 1)
assert.deepEqual(res3, [-2, 0, 1, 2])
