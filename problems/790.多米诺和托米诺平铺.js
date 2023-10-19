/*
 * @lc app=leetcode.cn id=790 lang=javascript
 *
 * [790] 多米诺和托米诺平铺
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  // 另一种dp，推导过程看
  // https://leetcode.cn/problems/domino-and-tromino-tiling/solutions/1968516/by-endlesscheng-umpp/
  // 结论为 dp[i] = 2 * dp[i - 1] + dp[i - 3], (n >= 4)
  // 设置 dp[0] = 1，方便构建dp
  if (n === 1) return 1
  const MOD = 1e9 + 7
  const dp = new Array(n + 1).fill(0)
  dp[0] = dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD
  }
  return dp[n]
}
// var numTilings = function (n) {
//   // dp, 官方解，具体看
//   // https://leetcode.cn/problems/domino-and-tromino-tiling/solutions/1962465/duo-mi-nuo-he-tuo-mi-nuo-ping-pu-by-leet-7n0j/
//   // 一个正方形都没有被覆盖，记为状态 0
//   // 只有上方的正方形被覆盖，记为状态 1
//   // 只有下方的正方形被覆盖，记为状态 2
//   // 上下两个正方形都被覆盖，记为状态 3
//   // TODO：观察只依赖到 i -1，可优化为滚动数组
//   const MOD = 1e9 + 7
//   const dp = new Array(n + 1).fill(0).map(() => new Array(4).fill(0))
//   dp[0][3] = 1
//   for (let i = 1; i <= n; i++) {
//     dp[i][0] = dp[i - 1][3]
//     dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % MOD
//     dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % MOD
//     dp[i][3] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2] + dp[i - 1][3]) % MOD
//   }
//   return dp[n][3]
// }
// @lc code=end
