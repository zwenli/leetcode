/*
 * @lc app=leetcode.cn id=377 lang=javascript
 *
 * [377] 组合总和 Ⅳ
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function combinationSum4(nums, target) {
  // dp
  // time complexity O(n * target): n为数组nums的长度
  // space comlexity O(target): dp数组的长度为target + 1
  const dp = new Array(target + 1).fill(0)
  dp[0] = 1
  for (let i = 1; i <= target; i += 1) {
    for (const num of nums) {
      if (num <= i) {
        dp[i] += dp[i - num]
      }
    }
  }
  return dp[target]
}
// @lc code=end

const assert = require('assert').strict

const res1 = combinationSum4([1, 2, 3], 4)
assert.equal(res1, 7)

const res2 = combinationSum4([9], 3)
assert.equal(res2, 0)

/**
相似题目 518.零钱兑换ii

1. 动态规划
题目中nums的元素可以选取多个，且需要考虑元素的顺序，因此这道题目需要计算的是元素的排列数。

设dp[i]为 整数为i的元素组合个数，求dp[target]的值

初始化dp[0] = 1。只有当不选取任何元素时，元素之和才为0，因此只有一种方案。

当1 <= i <= target时，如果存在一种排列，其中的元素之和为i，则改排列的最后一个
元素必定是nums中的一个元素。假设该排列的最后一个元素为num，则一定有 num <= i，
对于元素之和等于i - num的每一种排列，最后添加num之后即可得到一个元素之和为i的排列，
因此在计算dp[i]时，需要计算所有的dp[i-num]之和。

由此可以得到动态规划的做法：
初始化dp[0] = 1
遍历i从1到target，对于每个i，进行如下操作：
  遍历数组nums的每个元素num，当num <= i时，将dp[i-num]的值累加到dp[i]
最终得到的dp[target]即为所求答案。


拓展：
背包问题
https://leetcode-cn.com/problems/combination-sum-iv/solution/xi-wang-yong-yi-chong-gui-lu-gao-ding-bei-bao-wen-/
 */