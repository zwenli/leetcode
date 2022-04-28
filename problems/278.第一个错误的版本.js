/*
 * @lc app=leetcode.cn id=278 lang=javascript
 *
 * [278] 第一个错误的版本
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1
    let right = n
    while (left < right) { // // 循环直至区间左右端点相同
      const mid = left + ((right - left) >> 1) // 防止溢出
      if (isBadVersion(mid)) {
        // 答案在区间 [left, mid] 中
        right = mid
      } else {
        // 答案在区间 [mid+1, right] 
        left = mid + 1
      }
    }
    return left
  }
}
// @lc code=end

const assert = require('assert').strict

function buildIsBadVersionFn(bad) {
  return function (n) {
    return n >= bad
  }
}

const res1 = solution(buildIsBadVersionFn(4))(5)
assert(res1, 4)
const res2 = solution(buildIsBadVersionFn(1702766719))(2126753390)
assert(res2, 1702766719)