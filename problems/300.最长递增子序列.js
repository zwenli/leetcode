/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function lengthOfLIS(nums) {
  // 动态规划
  // time complexity O(n^2): 两层循环
  // space complexit O(n): dp的空间复杂度为O(n)
  const n = nums.length;
  const dp = new Array(n).fill(1);
  let ans = 1;
  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    ans = Math.max(dp[i], ans);
  }
  return ans;
}
// @lc code=end

const assert = require('assert').strict

const res1 = lengthOfLIS([10,9,2,5,3,7,101,18])
assert.equal(res1, 4)

const res2 = lengthOfLIS([0,1,0,3,2,3])
assert.equal(res2, 4)

const res3 = lengthOfLIS([7,7,7,7,7,7,7])
assert.equal(res3, 1)

const res4 = lengthOfLIS([0]);
assert.equal(res4, 1);
/**
1. 动态规划
dp[i]: 表示前i个元素，以第i个元素结尾的最长上升子序列的长度，注意nums[i]必须被选中

从小到大计算dp的值，在计算dp[i]之前，已经计算出dp[0, ..., i-1]的值，状态转移方程如下：
dp[i] = Math.max(dp[j]) + 1, 0 <= j < i && nums[j] < nums[i]

最后，整个数组的最长上升子序列即所有dp[i]中的最大值。
LIS = max(dp[i]), 0 <= i < n;

2. 贪心+二分查找
 */
