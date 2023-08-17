/*
 * @lc app=leetcode.cn id=2665 lang=javascript
 *
 * [2665] 计数器II

 */

// @lc code=start
/**
 * @typedef ReturnObj
 * @type {{ increment: () => number,decrement: () => number,reset: () => number,}}
 * @param {number} init
 * @return {ReturnObj}
 */
function createCounter(init) {
  let cur = init
  const increment = () => {
    return ++cur
  }
  const decrement = () => {
    return --cur
  }
  const reset = () => {
    return (cur = init)
  }
  return { increment, decrement, reset }
}

// @lc code=end
