/*
 * @lc app=leetcode.cn id=935 lang=javascript
 *
 * [935] 骑士拨号器
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var knightDialer = function (n) {
  const mod = 1e9 + 7
  const moves = [
    [4, 6],
    [6, 8],
    [7, 9],
    [4, 8],
    [3, 9, 0],
    [],
    [1, 7, 0],
    [2, 6],
    [1, 3],
    [2, 4],
  ]
  const d = Array.from({ length: 2 }, () => Array(10).fill(0))
  d[1].fill(1)
  for (let i = 2; i <= n; i++) {
    const x = i & 1
    for (let j = 0; j < 10; j++) {
      d[x][j] = 0
      for (const k of moves[j]) {
        d[x][j] = (d[x][j] + d[x ^ 1][k]) % mod
      }
    }
  }
  return d[n % 2].reduce((res, x) => (res + x) % mod, 0)
}

// var knightDialer = function (n) {
//   if (n === 1) return 10
//   const MOD = 1e9 + 7
//   const map = {
//     0: [4, 6],
//     1: [6, 8],
//     2: [7, 9],
//     3: [4, 8],
//     4: [0, 3, 9],
//     6: [0, 1, 7],
//     7: [2, 6],
//     8: [1, 3],
//     9: [2, 4],
//   }
//   // dp[i][j] 长度为i，结尾为j的组合数量
//   const dp = new Array(n + 1).fill(0).map(() => new Array(10).fill(0))
//   dp[1].fill(1)
//   for (let i = 2; i <= n; i++) {
//     for (let j in map) {
//       for (let k of map[j]) {
//         dp[i][j] = (dp[i][j] + dp[i - 1][k]) % MOD
//       }
//     }
//   }
//   let ans = 0
//   for (let i = 0; i < 10; i++) {
//     if (i === 5) continue
//     ans = (ans + dp[n][i]) % MOD
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = knightDialer(2)
assert.equal(res1, 20)

const res2 = knightDialer(3131)
assert.equal(res2, 136006598)
