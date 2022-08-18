/*
 * @lc app=leetcode.cn id=673 lang=javascript
 *
 * [673] 最长递增子序列的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
 
// TODO: dp + 二分查找 + 前缀和

var findNumberOfLIS = function(nums) {
  // dp
  // time complexity O(n^2)
  // space complexity O(n)
  // dp[i]，表示以nums[i]结尾的最长递增子序列长度
  // cnt[i]， 表示以nums[i]结尾的最长递增子序列个数
  // maxLen, 最长递增子序列的长度
  // 那么答案为所有满足dp[i] = maxLend的i所对应的cnt[i]之和
  // dp[i] 状态转移方程式为：
  // dp[i] = max(dp[j]) + 1, 其中 0 <= j < i 且 nums[i] > nums[j]
  // 对于 cnt[j]，等于所有满足 dp[j]+1=dp[i] 的 cnt[j] 之和
  const n = nums.length
  let maxLen = 0 // 最长递增子序列的长度
  let ans = 0
  const dp = new Array(n).fill(0)
  const cnt = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    dp[i] = 1
    cnt[i] = 1
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1
          cnt[i] = cnt[j] // 重置计数
        } else if (dp[j] + 1 === dp[i]) {
          cnt[i] += cnt[j]
        }
      }
    }
    // 判断以nums[i]结尾最长上升子序列的长度是否为最大
    if (dp[i] > maxLen) {
      maxLen = dp[i]
      ans = cnt[i]
    } else if (dp[i] === maxLen) {
      ans += cnt[i]
    }
  }
  return ans
};
// @lc code=end

const assert = require('node:assert').strict

const res1 = findNumberOfLIS([1,3,5,4,7])
assert.equal(res1, 2)

const res2 = findNumberOfLIS([2,2,2,2,2])
assert.equal(res2, 5)
