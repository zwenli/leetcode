/*
 * @lc app=leetcode.cn id=1130 lang=javascript
 *
 * [1130] 叶值的最小代价生成树
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */

function mctFromLeafValues(arr) {
  let res = 0
  const stack = [Infinity]
  for (const a of arr) {
    while (stack[stack.length - 1] <= a) {
      const mid = stack.pop()
      res += mid * Math.min(stack[stack.length - 1], a)
    }
    stack.push(a)
  }
  while (stack.length > 2) {
    res += stack.pop() * stack[stack.length - 1]
  }
  return res
}
// function mctFromLeafValues(arr) {
//   const n = arr.length
//   const dp = new Array(n).fill(0).map(() => new Array(n).fill(Infinity))
//   const mval = new Array(n).fill(0).map(() => new Array(n).fill(0))
//   for (let i = 0; i < n; i++) {
//     dp[i][i] = 0
//     mval[i][i] = arr[i]
//   }
//   for (let i = n - 1; i >= 0; i--) {
//     for (let j = i + 1; j < n; j++) {
//       mval[i][j] = Math.max(arr[i], mval[i + 1][j])
//       for (let k = i; k < j; k++) {
//         dp[i][j] = Math.min(
//           dp[i][j],
//           dp[i][k] + dp[k + 1][j] + mval[i][k] * mval[k + 1][j]
//         )
//       }
//     }
//   }
//   return dp[0][n - 1]
// }

// @lc code=end
