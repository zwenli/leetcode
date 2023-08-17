/*
 * @lc app=leetcode.cn id=2666 lang=javascript
 *
 * [2666] 只允许一次函数调用

 */

// @lc code=start
/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function (fn) {
  let called = false
  return function (...args) {
    if (!called) {
      called = true
      return fn.apply(this, args)
    }
    return undefined
  }
}

// @lc code=end
