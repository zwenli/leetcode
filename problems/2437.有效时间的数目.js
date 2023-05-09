/*
 * @lc app=leetcode.cn id=2437 lang=javascript
 *
 * [2437] 有效时间的数目
 */

// @lc code=start
/**
 * @param {string} time
 * @return {number}
 */
var countTime = function (time) {
  const MARK = '?'
  let ans = 1
  // hh
  if (time.charAt(0) === MARK && time.charAt(1) === MARK) {
    ans *= 24
  } else if (time.charAt(0) === MARK) {
    ans *= time.charAt(1) < 4 ? 3 : 2
  } else if (time.charAt(1) === MARK) {
    ans *= time.charAt(0) < 2 ? 10 : 4
  }
  if (time.charAt(3) === MARK) {
    ans *= 6
  }
  if (time.charAt(4) === MARK) {
    ans *= 10
  }
  return ans
}
// @lc code=end
