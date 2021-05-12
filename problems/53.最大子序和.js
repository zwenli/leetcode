/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function maxSubArray(nums) {
  // 贪心
  // dp[i] = max(dp[i-1] + nums[i], nums[i])
  // 状态只依赖上一个状态，那么只需要一个变量即可
  // 时间复杂度O(n): n为数组长度
  // 空间复杂度O(1):
  const n = nums.length;
  let sum = 0;
  let res = -Infinity;
  for (let i = 0; i < n; i += 1) {
    sum += nums[i];
    res = Math.max(sum, res);
    // 如果sum小于0，重新开始找子序串
    if (sum < 0) sum = 0;
  }
  return res;
}

// function maxSubArray(nums) {
//   // 动态规划，空间优化
//   // dp[i] = max(dp[i-1] + nums[i], nums[i])
//   // 状态只依赖上一个状态，那么只需要一个变量即可
//   // 时间复杂度O(n): n为数组长度
//   // 空间复杂度O(1):
//   const n = nums.length;
//   let sum = nums[0]; // sum表示[0,i]的最大子序和
//   let res = nums[0];
//   for (let i = 1; i < n; i += 1) {
//     sum = Math.max(sum + nums[i], nums[i]);
//     res = Math.max(sum, res);
//   }
//   return res;
// }

// function maxSubArray(nums) {
//   // 动态规划
//   // dp[i] 表示以nums[i]结尾的最大子序和
//   // dp[i] = max(dp[i-1] + nums[i], nums[i])
//   // 如果加上dp[i-1]加上当前数值，还比当前小，收益减少
//   // 那么改舍弃之前的结果,重新从nums[i]开始计算最大子序和
//   // 之后再从dp数组中找到最大的结果
//   // 时间复杂度O(n): n为数组长度
//   // 空间复杂度O(n): dp数组需要O(n)的空间
//   const n = nums.length;
//   const dp = new Array(n).fill(0);
//   dp[0] = nums[0];
//   let res = nums[0];
//   for (let i = 1; i < n; i += 1) {
//     // dp[i] = nums[i] + (dp[i-1] > 0 ? dp[i-1] : 0)
//     dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
//     res = Math.max(dp[i], res);
//   }
//   return res;
// }

// function maxSubArray(nums) {
//   // 暴力解法
//   // 时间复杂度O(n^2): 两层循环
//   // 空间复杂度O(1)
//   const n = nums.length;
//   let res = nums[0];
//   for (let i = 0; i < n; i += 1) {
//     let sum = 0;
//     for (let j = i; j < n; j += 1) {
//       sum += nums[j];
//       res = Math.max(res, sum);
//     }
//   }
//   return res;
// }
// @lc code=end

const res1 = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
// 6
const res2 = maxSubArray([1]);
// 1
const res3 = maxSubArray([-1]);
// -1
const res4 = maxSubArray([-2, 1]);
// 1

// 暴力解法
// 动态规划
// 贪心
// TODO：分治
