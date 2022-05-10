/*
 * @lc app=leetcode.cn id=553 lang=javascript
 *
 * [553] 最优除法
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */
// function optimalDivision(nums) {
//   // 数学，贪心
//   // 题目保证nums中所有数字都大于1，
//   // 对于题目可以分解为 x/y 的形式，分子越大，分母越小，结果也就越小
//   // 当x = nums[0]时，x最大，（若加上其他，只会越小）
//   // y = nums[1]/.../nums[n-1]时，y最小。
//   const n = nums.length
//   if (n === 1) {
//     return '' + nums[0]
//   } else if (n === 2) {
//     return '' + nums[0] + '/' + nums[1]
//   } else {
//     return '' + nums[0] + '/(' + nums.slice(1, n).join('/') + ')'
//   }
// }

function optimalDivision(nums) {
  class Node {
    constructor() {
      this.minVal = 1000.0
      this.maxVal = 0
      this.minStr = ''
      this.maxStr = ''
    }
  }
  // dp
  const n = nums.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0).map(() => new Node()))
  for (let i = 0; i < n; i += 1) {
      dp[i][i].minVal = nums[i]
      dp[i][i].maxVal = nums[i]
      dp[i][i].minStr = '' + nums[i]
      dp[i][i].maxStr = '' + nums[i]
  }
  for (let i = 1; i < n; i += 1) {
    for (let j = 0; i + j < n; j += 1) {
      for (let k = j; k < i + j; k += 1) {
        if (dp[j][j + i].maxVal < dp[j][k].maxVal / dp[k + 1][j + i].minVal) {
          dp[j][j + i].maxVal = dp[j][k].maxVal / dp[k + 1][j + i].minVal
          if (k + 1 === i + j) {
            dp[j][j + i].maxStr = dp[j][k].maxStr + '/' + dp[k + 1][j + i].minStr
          } else {
            dp[j][j + i].maxStr = dp[j][k].maxStr + '/(' + dp[k + 1][j + i].minStr + ')'
          }
        }
        if (dp[j][j + i].minVal > dp[j][k].minVal / dp[k + 1][j + i].maxVal) {
          dp[j][j + i].minVal = dp[j][k].minVal / dp[k + 1][j + i].maxVal
          if (k + 1 === i + j) {
            dp[j][j + i].minStr = dp[j][k].minStr + '/' + dp[k + 1][j + i].maxStr
          } else {
            dp[j][j + i].minStr = dp[j][k].minStr + '/(' + dp[k + 1][j + i].maxStr + ')'
          }
        }
      }
    }
  }
  return dp[0][n - 1].maxStr
}
// @lc code=end

const assert = require('assert').strict

const res1 = optimalDivision([1000, 100, 10, 2])
assert.equal(res1, '1000/(100/10/2)')
