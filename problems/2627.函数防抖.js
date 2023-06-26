/*
 * @lc app=leetcode.cn id=2627 lang=javascript
 *
 * [2627] 函数防抖

 */

// @lc code=start
/**
 * @typedef F
 * @type {(...p: any[]) => any}
 * @param {F} fn
 * @param {number} t
 * @return {F}
 */

function debounce(fn, t) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, t)
  }
}
// @lc code=end

const assert = require('node:assert/strict')
