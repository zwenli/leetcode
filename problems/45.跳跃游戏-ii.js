/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function jump(nums) {
  // 贪心，从前往后，每次找到可到达的最远位置，
  const n = nums.length;
  let end = 0; // 边界，也就是当前能够到达的最大下标位置
  let maxPositon = 0; // （下次）最远可到达位置
  let steps = 0;
  // 在遍历数组时，我们不访问最后一个元素，这是因为在访问最后一个元素之前，
  // 我们的边界一定大于等于最后一个位置，否则就无法跳到最后一个位置了。
  // 如果访问最后一个元素，在边界正好为最后一个位置的情况下，
  // 我们会增加一次「不必要的跳跃次数」，因此我们不必访问最后一个元素。
  for (let i = 0; i < n - 1; i += 1) {
    maxPositon = Math.max(maxPositon, i + nums[i]);
    if (i === end) {
      end = maxPositon;
      steps += 1;
    }
  }
  return steps;
}
// function jump(nums) {
//   // 动态规划
//   // 时间复杂度O(n^2): 需要生成n个状态，每个状态的转移需要O(n)
//   // 空间复杂度O(n): dp数组需要O(n)的空间
//   if (!nums || !nums.length) return -1;
//   const n = nums.length;
//   const dp = new Array(n).fill(Infinity);
//   dp[0] = 0;
//   // dp[i] 表示达到第i个位置的最小跳跃次数。
//   // 当前位置的最小跳跃次数，取决与上一个位置的跳跃次数，且能到达这个位置。
//   // 上个位置的范围为[0, i - 1]，需要遍历找出上个位置的最小跳跃次数，在加1
//   for (let i = 1; i < n; i += 1) {
//     for (let j = i - 1; j >= 0; j -= 1) {
//       if (dp[j] !== Infinity && j + nums[j] >= i) {
//         dp[i] = Math.min(dp[j] + 1, dp[i]);
//       }
//     }
//   }
//   return dp[n - 1] === Infinity ? -1 : dp[n - 1];
// }
// @lc code=end

const res1 = jump([2, 3, 1, 1, 4]); // 2

const res2 = jump([2, 3, 0, 1, 4]); // 2

// 动态规划
// 贪心
// BFS
