/*
 * @lc app=leetcode.cn id=2630 lang=javascript
 *
 * [2630] 记忆函数II

 */

// @lc code=start
class DictNode extends Map {
  result = undefined
  save = false
  constructor() {
    super()
  }
  saveResult(result) {
    this.result = result
    this.save = true
    return result
  }
}
/**
 * @param {Function} fn
 */
function memoize(fn) {
  // 字典树
  // TODO：优化，arg为对象时，使用 weekmap
  const root = new DictNode()
  return function (...args) {
    let node = root
    for (const arg of args) {
      if (!node.has(arg)) {
        node.set(arg, new DictNode())
      }
      node = node.get(arg)
    }
    if (!node.save) {
      node.saveResult(fn.apply(this, args))
    }
    return node.result
  }
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */

// @lc code=end

const assert = require('node:assert/strict')

const fn1 = compose([(x) => x + 1, (x) => x * x, (x) => 2 * x])
assert.equal(fn1(4), 65)

const fn2 = compose([(x) => 10 * x, (x) => 10 * x, (x) => 10 * x])
assert.equal(fn2(1), 1000)

const fn3 = compose([])
assert.equal(fn3(42), 42)
