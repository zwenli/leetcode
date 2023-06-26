/*
 * @lc app=leetcode.cn id=2629 lang=javascript
 *
 * [2629] 复合函数

 */

// @lc code=start
/**
 * @typedef F
 * @type {(x: number) => number}
 * @param {F} functions
 * @return {F}
 */

function compose(functions) {
  return function (x) {
    let res = x
    for (let i = functions.length - 1; i >= 0; i--) {
      res = functions[i](res)
    }
    return res
  }
}

// function compose(functions) {
//   return function (x) {
//     return functions.reduceRight((target, fn) => fn(target), x)
//   }
// }

// @lc code=end

const assert = require('node:assert/strict')

const fn1 = compose([(x) => x + 1, (x) => x * x, (x) => 2 * x])
assert.equal(fn1(4), 65)

const fn2 = compose([(x) => 10 * x, (x) => 10 * x, (x) => 10 * x])
assert.equal(fn2(1), 1000)

const fn3 = compose([])
assert.equal(fn3(42), 42)
