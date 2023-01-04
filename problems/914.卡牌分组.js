/*
 * @lc app=leetcode.cn id=914 lang=javascript
 *
 * [914] 卡牌分组
 */

// @lc code=start
/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
  const map = {}
  const N = deck.length
  for (const num of deck) {
    map[num] = (map[num] ?? 0) + 1
  }
  // 枚举X
  for (let X = 2; X <= N; X++) {
    if (N % X === 0) {
      let flag = true
      for (let num in map) {
        if (map[num] % X) {
          flag = false
          break
        }
      }
      if (flag) return true
    }
  }
  return false
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = hasGroupsSizeX([1, 2, 3, 4, 4, 3, 2, 1])
assert.equal(res1, true)

const res2 = hasGroupsSizeX([1, 1, 1, 2, 2, 2, 3, 3])
assert.equal(res2, false)

const res3 = hasGroupsSizeX([1, 1, 2, 2, 2, 2])
assert.equal(res3, true)

const res4 = hasGroupsSizeX([1, 1, 1, 1, 2, 2, 2, 2, 2, 2])
assert.equal(res4, true)
