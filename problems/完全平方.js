/**
 * 完全平方数
 * 
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）
 * 使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 */

/**
 * @param {number} n
 * @return {number}
 */
// var numSquares = function(n) {
//   let ans = n
//   dfs(n, Math.floor(n ** 0.5), 0)
//   return ans
  
//   function dfs(left, base, count) {
//     if (left < 0) {
//       return
//     }
//     if (left === 0) {
//       ans = Math.min(ans, count)
//       return
//     }
//     for (let i = base; i >= 1; i--) {
//       dfs(left - i ** 2, i, count + 1)
//     }
//   }
// }

/**
 * @param {number} n
 * @return {number}
 * @description numSquares(n) = min(numSquares(n - k) + 1), k 为 square numbers
 */
// var numSquares = function(n) {
//   const squareNums = []
//   for (let num = Math.floor(n ** 0.5), i = 1; i <= num; i ++) {
//     squareNums.push(i ** 2)
//   }
//   function minNumSquares(k) {
//     // base case
//     if (squareNums.indexOf(k) > -1) {
//       return 1
//     }
//     let minNum = Infinity
//     for (let square of squareNums) {
//       // k - square 小于 0 时需要停止
//       if (k < square) break
//       const newNum = minNumSquares(k - square) + 1
//       minNum = Math.min(minNum, newNum)
//     }
//     return minNum
//   }
//   return minNumSquares(n)
// }

/**
 * @param {number} n
 * @return {number}
 * @description numSquares(n) = min(numSquares(n - k) + 1), k 为 square numbers
 * 动态规划 dp
 */
var numSquares = function(n) {
  const dp = Array(n+1).fill(Infinity)
  // base case
  dp[0] = 0
  const maxSquareIndex = Math.floor(n ** 0.5) + 1
  const squareNums = Array(maxSquareIndex).fill(0).map((_, index) => index ** 2)
  // 从1开始计算完全平方数
  for (let i = 1; i <= n; i++) {
    for (let s = 1; s < maxSquareIndex; s++ ) {
      // n 小于 平方数
      if (i < squareNums[s]) break
      dp[i] = Math.min(dp[i], dp[i - squareNums[s]] + 1)
    }
  }
  return dp[n]
}

var res1 = numSquares(12)
var res2 = numSquares(4)
var res3 = numSquares(81)

console.log(res1)
console.log(res2)
console.log(res3)
