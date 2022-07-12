/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartition(nums) {
  const n = nums.length
  // 长度小于2，无法分割
  if (n < 2) {
    return false
  }
  let sum = 0
  let maxNum = 0
  for (let num of nums) {
    sum += num
    maxNum = Math.max(maxNum, num)
  }
  // 和为奇数，无法分割成两个相等的和子集
  if (sum & 1) {
    return false
  }
  const target = sum >> 1
  // 如果数字中的最大值比target，除最大值的和子集必定小于target
  if (maxNum > target) {
    return false
  }
  // 转换成0-1背包问题
  // dp[i][j] 表示下表为[0,i]下标范围内选取若干个（可以为0），
  // 是否存在一种选取方案使得被选取的正整数的和等于j
  const dp = new Array(n).fill(false).map(
    () => new Array(target + 1).fill(false)
  )
  // 不选取任何数，则被选取的正整数等于0，故dp[i][0] = true
  for (let i = 0; i < n; i += 1) {
    dp[i][0] = true
  }
  // 当i为0时，只有一个正整数nums[0]可以被选取
  dp[0][nums[0]] = true
  for (let i = 1; i < n; i += 1) {
    const num = nums[i]
    for (let j = 1; j <= target; j += 1) {
      if (j >= num) {
        // j大于当前数字nums[i]，那么当前数字即可以选，也可以不选
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num]
      } else {
        // 小于只能不选
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[n - 1][target]
}
// @lc code=end

const assert = require('assert').strict

const res1 = canPartition([1,5,11,5])
assert.equal(res1, true)

const res2 = canPartition([1,2,3,5])
assert.equal(res2, false)

const res3 = canPartition([2,2,1,1])
assert.equal(res3, true)
