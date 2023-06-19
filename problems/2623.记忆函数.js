/*
 * @lc app=leetcode.cn id=2623 lang=javascript
 *
 * [2623] 记忆函数

 */

// @lc code=start
/**
 * @param {function} fn
 * @return {function}
 */
function isUndef(value) {
  return value === null || value === undefined
}

function memoize(fn) {
  const cache = {}
  return function (...args) {
    const hash = JSON.stringify(args)
    if (isUndef(cache[hash])) {
      cache[hash] = fn.apply(this, args)
    }
    return cache[hash]
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const sum = (a, b) => a + b
const memoizedSum = memoize(sum)
assert.equal(memoizedSum(2, 2), 4)
assert.equal(memoizedSum(2, 2), 4)
assert.equal(memoizedSum(1, 2), 3)
assert.equal(memoizedSum(0, 0), 0)
assert.equal(memoizedSum(0, 0), 0)
