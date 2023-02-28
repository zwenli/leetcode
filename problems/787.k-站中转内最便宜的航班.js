/*
 * @lc app=leetcode.cn id=787 lang=javascript
 *
 * [787] K 站中转内最便宜的航班
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
// function findCheapestPrice(n, flights, src, dst, k) {
//   // TODO: 优化，滚动数组
//   // dp[t][i] 表示通过t次航班从src出发到i所需要的最小费用
//   // base case: dp[0][src] = 0，dp[0][非src] = Infinity
//   // 转移方程：dp[t][i] = min(dp[t-1][j]+price(j,i)), [t, i]属于一个航班
//   const dp = new Array(k + 2).fill(0).map(() => new Array(n).fill(Infinity))
//   dp[0][src] = 0
//   let ans = Infinity
//   for (let t = 1; t <= k + 1; t++) {
//     for (const flight of flights) {
//       const [j, i, price] = flight
//       dp[t][i] = Math.min(dp[t][i], dp[t - 1][j] + price)
//     }
//     ans = Math.min(ans, dp[t][dst])
//   }
//   return ans === Infinity ? -1 : ans
// }
function findCheapestPrice(n, flights, src, dst, k) {
  // bfs
  const edges = new Array(n).fill(0).map(() => [])
  for (const [f, t, p] of flights) {
    edges[f].push([t, p])
  }
  // minCost[t] 表示从src到t的最小开销
  const minCost = new Array(n).fill(Infinity)
  const queue = [[src, 0]]
  let steps = 0
  while (queue.length && steps <= k) {
    for (let i = queue.length; i > 0; i--) {
      const curr = queue.shift()
      for (const neighbor of edges[curr[0]]) {
        const cost = curr[1] + neighbor[1]
        // 剪枝，对于超出当前最小开销的无需再遍历
        if (cost >= minCost[neighbor[0]]) continue
        minCost[neighbor[0]] = cost
        queue.push([neighbor[0], cost])
      }
    }
    steps += 1
  }
  return minCost[dst] === Infinity ? -1 : minCost[dst]
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = findCheapestPrice(
  3,
  [
    [0, 1, 100],
    [1, 2, 100],
    [0, 2, 500],
  ],
  0,
  2,
  1
)
assert.equal(res1, 200)

const res2 = findCheapestPrice(
  3,
  [
    [0, 1, 100],
    [1, 2, 100],
    [0, 2, 500],
  ],
  0,
  2,
  0
)
assert.equal(res2, 500)

const res3 = findCheapestPrice(
  5,
  [
    [4, 1, 1],
    [1, 2, 3],
    [0, 3, 2],
    [0, 4, 10],
    [3, 1, 1],
    [1, 4, 3],
  ],
  2,
  1,
  1
)
assert.equal(res3, -1)
