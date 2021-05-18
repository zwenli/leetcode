/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function rob(nums) {
  // 动态规划，滚动数组，
  // dp[i] = max(dp[i-1], dp[i-2] + nums[i])
  // 第i的状态只依赖i-1，i-2，用两个变量保存状态即可
  // 时间复杂度O(n):
  // 空间复杂度O(1):
  if (!nums || !nums.length) return 0;
  if (nums.length === 1) return nums[0];
  const n = nums.length;
  // let prev = nums[0];
  // let cur = Math.max(prev, nums[1]);
  // for (let i = 2; i < n; i += 1) {
  //   // const next = Math.max(prev + nums[i], cur);
  //   // prev = cur;
  //   // cur = next;
  //   [prev, cur] = [cur, Math.max(prev + nums[i], cur)];
  // }
  let prev = 0;
  let cur = 0;
  for (let i = 0; i < n; i += 1) {
    [prev, cur] = [cur, Math.max(prev + nums[i], cur)];
  }
  return cur;
}

// function rob(nums) {
//   // 动态规划，简化为一维数组
//   // dp[i] 表示[0,i]个房间能够偷窃到的最高金额
//   // dp[i] = max(dp[i-1], dp[i-2] + nums[i])
//   // 第i个房间有偷和不偷的状态，
//   // 不偷为dp[i-1], 偷为dp[i-2] + nums[i]
//   // i能不能偷取决与i-1的状态
//   // 假设i-1偷了，那么i不能偷，dp[i] = dp[i-1]
//   // 假设i-1没偷，那么i可以偷，dp[i] = dp[i-2] + nums[i]
//   if (!nums || !nums.length) return 0;
//   if (nums.length === 1) return nums[0];
//   const n = nums.length;
//   const dp = new Array(n).fill(0);
//   dp[0] = nums[0];
//   dp[1] = Math.max(dp[0], nums[1]);
//   for (let i = 2; i < n; i += 1) {
//     dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
//   }
//   return dp[n - 1];
// }

// function rob(nums) {
//   // 动态规划
//   // dp[i][0], dp[i][1]分别表示[0,i]个房间，
//   // 当第i个不偷(0)的时候最大金额，
//   // 偷(1)的时候最大金额
//   // dp[i][0] = max(dp[i-1][0], dp[i-1][1])
//   // 第i个房间不偷，i-1可以是偷或不偷，两者取最大
//   // dp[i][j] = dp[i-1][0] + nums[i]
//   // 第i个房子偷，i-1只能是不偷
//   if (!nums || !nums.length) return 0;
//   const n = nums.length;
//   const dp = new Array(n + 1).fill(0).map(() => new Array(2).fill(0));
//   for (let i = 1; i <= n; i += 1) {
//     dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
//     dp[i][1] = dp[i - 1][0] + nums[i - 1];
//   }
//   return Math.max(dp[n][0], dp[n][1]);
// }

// function rob(nums) {
//   // 递归，自顶向下
//   if (!nums || !nums.length) return 0;
//   const memo = new Array(nums.length);
//   return helper(nums.length - 1);
//   function helper(i) {
//     if (i < 0) return 0;
//     if (!memo[i]) {
//       memo[i] = Math.max(helper(i - 2) + nums[i], helper(i - 1));
//     }
//     return memo[i];
//   }
// }
// @lc code=end

const res1 = rob([2, 7, 9, 3, 1]);
// 12
const res2 = rob([1, 2, 3, 1]);
// 4

// 暴力求解，每个房间偷与不偷
// 递归
// 动态规划

// https://leetcode.com/problems/house-robber/discuss/156523/From-good-to-great.-How-to-approach-most-of-DP-problems.
