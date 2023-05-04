/*
 * @lc app=leetcode.cn id=292 lang=javascript
 *
 * [292] Nim 游戏
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function (n) {
  // 博弈论要么是特定情况下先手必赢，要么是分先手,后手进行状态转移。
  return n % 4 !== 0
  // 1 2 3 4 5 6 7 8 ...
  // true true true false true true true false ...
  // 观察可知，n为4的整数倍时不存在赢的可能
}

// var canWinNim = function (n) {
//   // 超时
//   const cache = new Map()
//   return dfs(n)
//   function dfs(n) {
//     if (n <= 3) return true
//     if (!cache.has(n)) {
//       let res = false
//       for (let i = n - 1; i > 0 && i >= n - 3; i--) {
//         if (!dfs(i)) {
//           res = true
//           break
//         }
//       }
//       cache.set(n, res)
//     }
//     return cache.get(n)
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = canWinNim(4)
assert.equal(res1, false)

const res2 = canWinNim(1)
assert.equal(res2, true)

const res3 = canWinNim(40)
assert.equal(res3, false)

const res4 = canWinNim(1348820612)
assert.equal(res4, false)
