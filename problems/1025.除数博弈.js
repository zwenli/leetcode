/*
 * @lc app=leetcode.cn id=1025 lang=javascript
 *
 * [1025] 除数博弈
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
function divisorGame(n) {
  if (n < 2) return false
  const dp = new Array(n + 1).fill(false)
  dp[1] = false
  dp[2] = true
  for (let i = 3; i <= n; i += 1) {
    for (let j = 1; j < i; j += 1) {
      // 令 m = i - j，当存在m，使得bob必败，
      // 那么让alice选择一个数字使得下一步为m，就必胜了
      if (i % j === 0 && !dp[[i - j]]) {
        dp[i] = true
        break
      }
    }
  }
  return dp[n]
}

// function divisorGame(n) {
//   // 数学， https://leetcode.cn/problems/divisor-game/solution/chu-shu-bo-yi-by-leetcode-solution/
//   // 结论是 偶数先手必胜，奇数先手必败
//   return n % 2 === 0
// }
// @lc code=end
