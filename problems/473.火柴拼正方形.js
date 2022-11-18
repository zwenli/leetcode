/*
 * @lc app=leetcode.cn id=473 lang=javascript
 *
 * [473] 火柴拼正方形
 */

// @lc code=start
/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
// var makesquare = function (matchsticks) {
//   // 动态规划 + 状态压缩
//   // totalLen 为火柴总长，如果 totalLen不是4的倍数，那么不可能拼成正方形的
//   // 当 totalLen是4的倍数时，每条边的边长为 totalLen，设为 len。
//   // 我们给正方形的四条边进行编号，分别为 1，2，3 和 4。
//   // 按照编号顺序依次将火柴放入正方形的四条边，只有前一条边被放满后，才能将火柴放入后一条边。
//   // 用状态 s 记录哪些火柴已经被放入（s的第k位为1表示第k根火柴已放入），
//   // dp[s] 表示正方形未放满的边的当前长度，计算如下：
//   // 当 s = 0时，没有火柴放入，因此dp[0] = 0
//   // 当 s != 0时，如果去掉它的第k根火柴得到的状态s1满足 dp[s1]>=0 && dp[s1] + matchsticks[k] <= len,
//   // 那么 dp[s] = (dp[s1] + matchsticks[k]) % len（（因为放满前一条边后，我们开始放后一条边，
//   // 此时未放满的边的长度为0，所以需要对 len 取余），否则 dp[s] = -1，表示状态 s 对应的火柴集合不可能按上述规则放入正方形的边。
//   const totalLen = matchsticks.reduce((sum, num) => sum + num, 0)
//   if (totalLen % 4 !== 0) return false
//   const len = totalLen / 4
//   const n = matchsticks.length
//   const dp = new Array(1 << n).fill(-1)
//   dp[0] = 0
//   for (let s = 1; s < (1 << n); s++) {
//     for (let k = 0; k < n; k++) {
//       if ((s & (1 << k)) === 0) {
//         // 状态s没有放入第k根火柴
//         continue
//       }
//       const s1 = s & ~(1 << k)
//       if (dp[s1] >= 0 && dp[s1] + matchsticks[k] <= len) {
//         dp[s] = (dp[s1] + matchsticks[k]) % len
//         break
//       }
//     }
//   }
//   return dp[(1 << n) - 1] === 0
// }

var makesquare = function (matchsticks) {
  // 回溯
  const totalLen = matchsticks.reduce((sum, num) => sum + num, 0)
  if (totalLen % 4) return false
  matchsticks.sort((a, b) => b - a)
  const edgs = new Array(4).fill(0)
  return dfs(0, edgs, totalLen / 4)
  function dfs(index, edgs, len) {
    if (index === matchsticks.length) {
      return (
        edgs[0] === len && edgs[1] === len && edgs[2] === len && edgs[3] === len
      )
    }
    for (let i = 0; i < edgs.length; i++) {
      if (edgs[i] + matchsticks[index] > len) {
        continue
      }
      edgs[i] += matchsticks[index]
      if (dfs(index + 1, edgs, len)) {
        return true
      }
      edgs[i] -= matchsticks[index]
    }
    return false
  }
}

// var makesquare = function (matchsticks) {
//   // 回溯
//   // time complexity O(4^n)
//   const totalLen = matchsticks.reduce((sum, num) => sum + num, 0)
//   if (totalLen % 4 !== 0) return false
//   // 从大到小排序，减少搜索量
//   matchsticks.sort((a, b) => b - a)
//   const edges = new Array(4).fill(0)
//   return dfs(0, edges, totalLen / 4)
//   function dfs(index, edges, len) {
//     if (index === matchsticks.length) {
//       return true
//     }
//     for (let i = 0; i < edges.length; i++) {
//       edges[i] += matchsticks[index]
//       if (edges[i] <= len && dfs(index + 1, edges, len)) {
//         return true
//       }
//       edges[i] -= matchsticks[index]
//     }
//     return false
//   }
// }
// var makesquare = function (matchsticks) {
//   // 不通过，数字超过大小
//   const n = matchsticks.length
//   if (n < 4) return false
//   const cache = new Map()
//   return dfs(0, 0, 0, 0, 0)
//   // return res
//   function dfs(index, a, b, c, d) {
//     if (index === n) {
//       return a === b && b === c && c === d
//     }
//     const hash = [a, b, c, d].sort((a, b) => a - b).join('')
//     if (!cache.has(hash)) {
//       const matchstick = matchsticks[index]
//       const res =
//         dfs(index + 1, a + matchstick, b, c, d) ||
//         dfs(index + 1, a, b + matchstick, c, d) ||
//         dfs(index + 1, a, b, c + matchstick, d) ||
//         dfs(index + 1, a, b, c, d + matchstick)
//       cache.set(hash, res)
//     }
//     return cache.get(hash)
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = makesquare([1, 1, 2, 2, 2])
assert.equal(res1, true)

const res2 = makesquare([3, 3, 3, 3, 4])
assert.equal(res2, false)
