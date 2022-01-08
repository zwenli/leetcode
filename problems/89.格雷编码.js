/*
 * @lc app=leetcode.cn id=89 lang=javascript
 *
 * [89] 格雷编码
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
function grayCode(n) {
  const ret = [0] // base case
  for (let i = 1; i <= n; i += 1) {
    const m = ret.length
    for (let j = m - 1; j >= 0; j -= 1) {
      ret.push(ret[j] | (1 << (i - 1)))
    }
  }
  return ret
}
// @lc code=end

const assert = require('assert').strict

const res1 = grayCode(2)
assert.deepEqual(res1, [0, 1, 3, 2])

const res2 = grayCode(1)
assert.deepEqual(res2, [0, 1])

/**

x ^ (1 << i) 表示将 x 的第i位取反， 0 <= i < n

1. 回溯

 */
