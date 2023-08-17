/*
 * @lc app=leetcode.cn id=2637 lang=javascript
 *
 * [2637] 有时间限制的Promise对象

 */

// @lc code=start
/**
 * @typedef Fn
 * @type {(...params: any[]) => Promise<any>}
 * @param {Fn} fn
 * @param {number} t
 * @returns {Fn}
 */
function timeLimit(fn, t) {
  return async function (...args) {
    let timer
    let timePromise = new Promise((resolve, reject) => {
      timer = setTimeout(() => reject('Time Limit Exceeded'), t)
    })

    return Promise.race([fn(...args), timePromise]).then((res) => {
      clearTimeout(timer)
      return res
    })
  }
}
// @lc code=end
