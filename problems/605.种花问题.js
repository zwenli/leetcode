/*
 * @lc app=leetcode.cn id=605 lang=javascript
 *
 * [605] 种花问题
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  // 贪心，对下面的优化，如果此位置已经种花了，直接跳到下个位置 i+ 2
  if (n === 0) return true
  let cnt = 0
  const m = flowerbed.length
  let i = 0
  while (i < m) {
    if (flowerbed[i] === 1) {
      i += 2
    } else if (
      (i === 0 || flowerbed[i - 1] === 0) &&
      (i === m - 1 || flowerbed[i + 1] === 0)
    ) {
      cnt += 1
      if (cnt === n) return true
      i += 2
    } else {
      i += 1
    }
  }
  return false
}
// var canPlaceFlowers = function (flowerbed, n) {
//   // 贪心
//   // 左右两侧都是空位置，那么这个位置就可以种花
//   let cnt = 0
//   const m = flowerbed.length
//   for (let i = 0; i < m && cnt < n; i++) {
//     if (flowerbed[i] === 0) {
//       const prev = i === 0 ? 0 : flowerbed[i - 1]
//       const next = i === m - 1 ? 0 : flowerbed[i + 1]
//       if (prev === 0 && next === 0) {
//         flowerbed[i] = 1
//         cnt += 1
//       }
//     }
//   }
//   return cnt === n
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = canPlaceFlowers([1, 0, 0, 0, 1], 1)
assert.equal(res1, true)

const res2 = canPlaceFlowers([1, 0, 0, 0, 1], 2)
assert.equal(res2, false)
