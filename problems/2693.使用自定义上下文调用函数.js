/*
 * @lc app=leetcode.cn id=2693 lang=javascript
 *
 * [2693] 使用自定义上下文调用函数

 */

// @lc code=start
/**
 * @param {Record<any, any>} context
 * @param {any[]} args
 * @return {any}
 */
Function.prototype.callPolyfill = function (context, ...args) {
  context ||= window
  const key = Symbol.for(this)
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}

// Function.prototype.callPolyfill = function (context, ...args) {
//   context ||= window
//   return this.apply(context, args)
// }
// @lc code=end

const assert = require('node:assert/strict')

const fn1 = function add(b) {
  return this.a + b
}
assert.equal(fn1.callPolyfill({ a: 5 }, 7), 12)

const fn2 = function tax(price, taxRate) {
  return `The cost of the ${this.item} is ${price * taxRate}`
}
assert.equal(
  fn2.callPolyfill({ item: 'burger' }, 10, 1.1),
  'The cost of the burger is 11'
)
