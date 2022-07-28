/*
 * @lc app=leetcode.cn id=474 lang=javascript
 *
 * [474] 一和零
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  // dp优化
  // dp[i][][]每个元素的计算只与dp[i-1][][]的元素有关
  // 使用滚动数组的方法，优化成二维数组dp[j][k]
  
  const length = strs.length
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
  for (let i = 1; i <= length; i++) {
    const [zeros, ones] = getZerosOnes(strs[i - 1])
    for (let j = m; j >= 0; j--) {
      for (let k = n; k >= 0; k--) {
        if (j >= zeros && k >= ones) {
          dp[j][k] = Math.max(dp[j][k], dp[j - zeros][k - ones] + 1)
        }
      }
    }
  }
  return dp[m][n]
  function getZerosOnes(str) {
    let arr = new Array(2).fill(0)
    for (let c of str) {
      arr[c]++
    }
    return arr
  }
}


// var findMaxForm = function (strs, m, n) {
//   //  二维01 背包问题
//   // dp[i][j][k], 表示前i个字符串中，使用j个0和k个1的情况下最多可以得到的字符串数量
//   // 字符串长度为l，则dp[l][m][n]为最终答案
//   // base case: 当i = 0时，任意j，k都有 dp[0][j][k] = 0
//   // 当 1 < i < l 时，首先遍历该字符串得到0和1的数量，记为zeros和ones。
//   // 当 0 和 1 的背包数量为 j 和 k 时，有两种情况：
//   // 当 j < zeros or k < ones，则不能选择第i个字符串，此时dp[i][j][k] = dp[i-1][j][k]
//   // 当 j >= zeros && k >= ones，则不选择第i个字符串，有dp[i][j][k] = dp[i-1][j][k]
//   // 选择第i个字符串，有dp[i][j][k] = dp[i-1][j-zeros][k-ones]，取最大值
//   const length = strs.length
//   const dp = new Array(length + 1)
//     .fill(0)
//     .map(() => new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)))
//   for (let i = 1; i <= length; i++) {
//     const [zeros, ones] = getZerosOnes(strs[i - 1])
//     for (let j = 0; j <= m; j++) {
//       for (let k = 0; k <= n; k++) {
//         dp[i][j][k] = dp[i - 1][j][k]
//         if (j >= zeros && k >= ones) {
//           dp[i][j][k] = Math.max(dp[i][j][k], dp[i - 1][j - zeros][k - ones] + 1)
//         }
//       }
//     }
//   }
//   return dp[length][m][n]
//   function getZerosOnes(str) {
//     let arr = new Array(2).fill(0)
//     for (let c of str) {
//       arr[c]++
//     }
//     return arr
//   }
// }

// var findMaxForm = function(strs, m, n) {
//   // dfs, 会超时
//   let ans = 0
//   dfs(0, 0, m, n)
//   return ans
//   function dfs(index, sum, m, n) {
//     if (strs.length === index || (m === 0 && n === 0)) {
//       ans = Math.max(ans, sum)
//       return
//     }
//     let sm = 0
//     let sn = 0
//     for (let c of strs[index]) {
//       c === '0'
//         ? sm++
//         : sn++
//     }
//     if (m >= sm && n >= sn) {
//       dfs(index + 1, sum + 1, m - sm, n - sn)
//     }
//     dfs(index + 1, sum, m, n)
//   }
// };
// @lc code=end

const assert = require('node:assert').strict

const res1 = findMaxForm(['10', '0001', '111001', '1', '0'], 5, 3)
assert.equal(res1, 4)

const res2 = findMaxForm(['10', '0', '1'], 1, 1)
assert.equal(res2, 2)
