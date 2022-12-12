/*
 * @lc app=leetcode.cn id=374 lang=javascript
 *
 * [374] 猜数字大小
 */

// @lc code=start
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let left = 1
  let right = n
  while (left <= right) {
    const mid = ((right - left) >> 1) + left
    const guessRes = guess(mid)
    if (guessRes === -1) {
      right = mid - 1
    } else if (guessRes === 1) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}
// @lc code=end
const assert = require('node:assert').strict

let pick

function guess(num) {
  if (pick < num) return -1
  if (pick > num) return 1
  return 0
}

pick = 6
const res1 = guessNumber(10)
assert.equal(res1, pick)

pick = 1
const res2 = guessNumber(1)
assert.equal(res2, pick)

pick = 1
const res3 = guessNumber(2)
assert.equal(res3, pick)

pick = 2
const res4 = guessNumber(2)
assert.equal(res4, pick)
