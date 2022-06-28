/*
 * @lc app=leetcode.cn id=397 lang=javascript
 *
 * [397] 整数替换
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
function integerReplacement(n) {
  if (n === 2 ** 32 - 1) return 32
  let count = 0
  while (n > 1) {
    if (n % 2 === 0) {
      n /= 2
    } else {
      // n + 1 能被4整除，选择 + 1是更优解，
      // 除了n = 3，需要选择 -1
      if ((n + 1) % 4 === 0 && n - 1 != 2) {
        n++
      } else {
        n--
      }
    }
    count += 1
  }
  return count
}
// function integerReplacement(n) {
//   // 记忆化搜索
//   const memo = Object.create(null)
//   const recursive = (n) => {
//     if (n === 1) return 0
//     if (memo[n]) return memo[n]
//     if (n % 2 === 0) {
//       memo[n] = 1 + recursive(n / 2)
//     } else {
//       memo[n] = 2 + Math.min(recursive((n + 1) / 2), recursive((n - 1) / 2))
//     }
//     return memo[n]
//   }
//   return recursive(n)
// }
// function integerReplacement(n) {
//   // 栈溢出
//   const dp = new Array(n + 1).fill(0)
//   for (let i = 2; i <= n; i += 1) {
//     if (i % 2 === 0) {
//       dp[i] = dp[i / 2] + 1;
//     } else {
//       dp[i] = 2 + Math.min(dp[(i - 1) / 2], dp[(i + 1) / 2]);
//     }
//   }
//   return dp[n]
// }
// @lc code=end
const assert = require('assert').strict

const res1 = integerReplacement(8)
assert.equal(res1, 3)

const res2 = integerReplacement(7)
assert.equal(res2, 4)

/**
base case
n = 1, 1,  0次
n = 2, 2 -> 1, 1次
n = 3, 3 -> 2 -> 1, 2次
n = 4, 4 -> 2 -> 1, 2次
n = 5  5 -> 4 -> 2 -> 1, 3次
n = 6, 6 -> 3 -> 2 -> 1, 3
n = 7, 7 -> 6 -> 3 -> 2 -> 1, 4
n = 8, 8 -> 4 -> 2 -> 1, 3

 */
