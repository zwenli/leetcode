/*
 * @lc app=leetcode.cn id=821 lang=javascript
 *
 * [821] 字符的最短距离
 */

// @lc code=start
/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
function shortestToChar(s, c) {
  // 左右遍历
  const n = s.length
  let ans = new Array(n)
  let prev = -n; 
  // -> 当前位置i，往左边最近的距离
  for (let i = 0; i < n; i += 1) {
    if (s[i] === c) prev = i
    ans[i] = i - prev
  }
  // <- 当前i，往右边最近的距离，两者最小值即为所求答案
  for (let i = prev - 1; i >= 0; i -= 1) {
    if (s[i] === c) prev = i
    ans[i] = Math.min(ans[i], prev - i)
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = shortestToChar('loveleetcode', 'e')
assert.deepEqual(res1, [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0])
