/*
 * @lc app=leetcode.cn id=764 lang=javascript
 *
 * [764] 最大加号标志
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} mines
 * @return {number}
 */

function orderOfLargestPlusSign(n, mines) {
  // dp https://leetcode.cn/problems/largest-plus-sign/solution/by-lcbin-m7yb/
  // dp[i][j][k]: 表示以(i,j)为起点在方向k上连续1的最大数目，(k = 0,1,2,3 分别表示上下左右)
  // 以其为中心构成的加号标志的最大阶数L = min(dp[i][j][0-3])
  // 答案取最大的L即可
  // 观察得出，用dp[j][j]即可，保存最小值，即上诉所说的L
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(n))
  for (const [i, j] of mines) {
    dp[i][j] = 0
  }
  // 预处理各个方向的连续1的数量，（思路和求前缀和是一样的）
  for (let i = 0; i < n; i++) {
    let left = 0
    let right = 0
    let up = 0
    let down = 0
    for (let j = 0, k = n - 1; j < n; j++, k--) {
      left = dp[i][j] > 0 ? left + 1 : 0
      right = dp[i][k] > 0 ? right + 1 : 0
      up = dp[j][i] > 0 ? up + 1 : 0
      down = dp[k][i] > 0 ? down + 1 : 0
      dp[i][j] = Math.min(dp[i][j], left)
      dp[i][k] = Math.min(dp[i][k], right)
      dp[j][i] = Math.min(dp[j][i], up)
      dp[k][i] = Math.min(dp[k][i], down)
    }
  }
  let ans = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      ans = Math.max(ans, dp[i][j])
    }
  }
  return ans
}

// function orderOfLargestPlusSign(n, mines) {
//   const dirs = [
//     [1, 0],
//     [0, 1],
//     [-1, 0],
//     [0, -1],
//   ]
//   const mineSet = new Set(mines.map(([r, c]) => r * n + c))
//   let ans = 0
//   for (let r = 0; r < n; r++) {
//     for (let c = 0; c < n; c++) {
//       if (mineSet.has(r * n + c)) continue
//       ans = Math.max(ans, bfs(r, c))
//     }
//   }
//   return ans

//   function bfs(r, c) {
//     let k = 0
//     const queue = new Array(4).fill(0).map(() => [r, c])
//     while (true) {
//       let isEnd = false
//       for (let i = 0; i < 4; i++) {
//         const [cr, cc] = queue[i]
//         if (
//           cr < 0 ||
//           cr >= n ||
//           cc < 0 ||
//           cc >= n ||
//           mineSet.has(cr * n + cc)
//         ) {
//           isEnd = true
//           break
//         }
//         queue[i] = [cr + dirs[i][0], cc + dirs[i][1]]
//       }
//       if (isEnd) break
//       k += 1
//     }
//     return k
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = orderOfLargestPlusSign(5, [[4, 2]])
assert.equal(res1, 2)

const res2 = orderOfLargestPlusSign(1, [[0, 0]])
assert.equal(res2, 0)
