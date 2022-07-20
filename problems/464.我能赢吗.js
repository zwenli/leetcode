/*
 * @lc app=leetcode.cn id=464 lang=javascript
 *
 * [464] 我能赢吗
 */

// @lc code=start
/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
var canIWin = function(maxChoosableInteger, desiredTotal) {
  // 博弈论
  // time complexity O(2^n * n)
  if (maxChoosableInteger >= desiredTotal) {
    return true
  }
  if ((1 + maxChoosableInteger) * maxChoosableInteger / 2 < desiredTotal) {
    return false
  }
  return dfs(maxChoosableInteger, 0, desiredTotal, 0, new Map())
  function dfs(maxChoosableInteger, state, desiredTotal, currentTotal, map) {
    if (!map.has(state)) {
      let res = false
      for (let i = 0; i < maxChoosableInteger; i += 1) {
        if (((state >> i) & 1) === 0) {
          if (i + 1 + currentTotal >= desiredTotal) {
            res = true
            break
          }
          if (!dfs(maxChoosableInteger, state | (1 << i), desiredTotal, i + 1 + currentTotal, map)) {
            res = true
            break
          }
        }
      }
      map.set(state, res)
    }
    return map.get(state)
  }
};
// @lc code=end

const assert = require('node:assert').strict

const res1 = canIWin(10, 11)
assert.equal(res1, false)

const res2 = canIWin(10, 0)
assert.equal(res2, true)

const res3 = canIWin(10, 1)
assert.equal(res3, true)
