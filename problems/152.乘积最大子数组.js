/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// function maxProduct(nums) {
//   // 动态规划，优化空间
//   // minP[i], maxP[i]的状态只依赖[i-1]的状态，根据滚动数组思维，
//   // 只需要两个变量来维护i-1的状态即可
//   // 时间复杂度O(n):
//   // 空间复杂度O(1):
//   if (!nums || !nums.length) return 0;
//   const n = nums.length;
//   let maxP = nums[0];
//   let minP = nums[0];
//   let ans = nums[0];
//   let mx = null; // pre maxProduct
//   let mn = null; // pre minProduct
//   for (let i = 1; i < n; i += 1) {
//     mx = maxP;
//     mn = minP;
//     maxP = Math.max(mx * nums[i], mn * nums[i], nums[i]);
//     minP = Math.min(mx * nums[i], mn * nums[i], nums[i]);
//     ans = Math.max(maxP, ans);
//   }
//   return ans;
// }

// function maxProduct(nums) {
//   // 动态规划
//   // minP[i], maxP[i]分别表示以第i个元素结尾的乘积最小子数组的乘积，乘积最大子数组的乘积
//   // maxP[i] = max(maxP[i-1]*nums[i], minP[i-1]*nums[i], nums[i])
//   // minP[i] = min(maxP[i-1]*nums[i], minP[i-1]*nums[i], nums[i])
//   // 时间复杂度O(n):
//   // 空间复杂度O(n): O(2n)
//   if (!nums || !nums.length) return 0;
//   const n = nums.length;
//   const maxP = new Array(n).fill(1);
//   const minP = new Array(n).fill(1);
//   let ans = nums[0];
//   maxP[0] = nums[0];
//   minP[0] = nums[0];
//   for (let i = 1; i < n; i += 1) {
//     maxP[i] = Math.max(maxP[i - 1] * nums[i], minP[i - 1] * nums[i], nums[i]);
//     minP[i] = Math.min(maxP[i - 1] * nums[i], minP[i - 1] * nums[i], nums[i]);
//     ans = Math.max(maxP[i], ans);
//   }
//   return ans;
// }

function maxProduct(nums) {
  // 动态规划
  // 时间复杂度O(n):
  // 空间复杂度O(1):
  if (!nums || !nums.length) return 0;
  const n = nums.length;
  let imax = nums[0];
  let imin = nums[0];
  let ans = nums[0];
  for (let i = 1; i < n; i += 1) {
    if (nums[i] < 0) {
      [imax, imin] = [imin, imax];
    }
    imax = Math.max(imax * nums[i], nums[i]);
    imin = Math.min(imin * nums[i], nums[i]);
    ans = Math.max(imax, ans);
  }
  return ans;
}

// function maxProduct(nums) {
//   // 暴力解法
//   // 时间复杂度O(n^2): 两层循环
//   // 空间复杂度O(1)
//   const n = nums.length;
//   let res = -Infinity;
//   for (let i = 0; i < n; i += 1) {
//     let product = 1;
//     for (let j = i; j < n; j += 1) {
//       product *= nums[j];
//       res = Math.max(product, res);
//     }
//   }
//   return res;
// }
// @lc code=end

const res1 = maxProduct([2, 3, -2, 4]);
// 6
const res2 = maxProduct([-2, 0, -1]);
// 0

// 暴力解法
// 动态规划
// 参考53.最大子序和
// dp[i] 表示到i结尾的乘积最大子数组的乘积
// 容易想出dp[i] = max(dp[i-1] * nums[i], nums[i])
// 然而并没有得出我们想要的结果，原因是数字存在负数，负数乘负数会得整数
// 我们需要有存储两个状态，当前最大值、最小值，最小值可能为负数，
// 但当下一步为负数时，最小值就变成了最大值，最大值就变成了最小值。
// 贪心？
