/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

function canJump(nums) {
  // 4. 迭代
  // 逐个遍历，同时更新能跳的最远距离，如果能达到最后一个坐标，
  // 那么能跳的最远距离应该是大于等于最后一个坐标的。
  // 时间复杂度O(n)
  // 空间复杂度O(1)
  if (!nums || !nums.length) return false;
  let reach = 0; // 能跳的最远距离
  for (let i = 0; i < nums.length; i += 1) {
    // 能跳的最远距离小于当前坐标，说明无法到达最后一个坐标了。
    if (reach < i) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}
// function canJump(nums) {
//   // 1. 贪心算法，从后往前计算，这里不是要计算最短跳几步的，只要能计算出是否可跳到即可。
//   // 时间复杂度O(n): n为数组长度，数组遍历一次
//   // 空间复杂度O(1)
//   if (!nums || !nums.length) return false;
//   let lastStep = nums.length - 1; // 默认为最后一位
//   for (let i = nums.length - 1; i >= 0; i -= 1) {
//     if (i + nums[i] >= lastStep) {
//       // 只要第i位可以跳到lastStep，就说明可以跳到这里，lastStep变为i
//       lastStep = i;
//     }
//   }
//   // lastStep为0说明可以从后到前走到第一位，也就是所求的答案
//   return lastStep <= 0;
// }
// function canJump(nums) {
//   // 1. 贪心算法，从前往后计算
//   // 时间复杂度O(n): n为数组长度，数组遍历一次
//   // 空间复杂度O(1)
//   if (!nums || !nums.length) return false;
//   const n = nums.length;
//   let rightMost = 0; // 最远可以到达的位置
//   for (let i = 0; i < nums.length; i += 1) {
//     // 当最远可以到达的位置小于当前位置时，其实也说明无法跳到当前这个位置了
//     // 当前位置还在最远可以到达的位置范围内，继续更新最远到达位置
//     if (i <= rightMost) {
//       rightMost = Math.max(rightMost, i + nums[i]);
//       // 最远可以到达的位置大于等于最后
//       if (rightMost >= n - 1) return true;
//     }
//   }
//   return false;
// }

// function canJump(nums) {
//   // 2. 回溯，会超时
//   if (!nums || !nums.length) return false;
//   const n = nums.length;
//   let ans = false;
//   backtrack(0);
//   return ans;
//   function backtrack(i) {
//     if (i + nums[i] >= n - 1) {
//       ans = true;
//       return;
//     }
//     const max = nums[i];
//     for (let j = 1; j <= max && i + j < n; j += 1) {
//       backtrack(i + j);
//     }
//   }
// }

// function canJump(nums) {
//   // 3. 动态规划
//   // 时间复杂度O(n^2): 需要生成n个状态，每个状态转移需要O(n)的时间
//   // 空间复杂度O(n): dp需要O(n)的空间
//   if (!nums || !nums.length) return false;
//   const n = nums.length;
//   const dp = new Array(n).fill(false);
//   dp[0] = true; // base case
//   // dp[i] 表示第i个位置能否到达，
//   // 当前位置能到达，取决与上一个位置能到达且上一个位置的最大可到达位置能够到达当前
//   // 上个位置的范围为[0, i - 1]，需要遍历这个范围找出答案
//   for (let i = 1; i < n; i += 1) {
//     // 从右往左早，优化
//     for (let j = i - 1; j >= 0; j -= 1) {
//       if (dp[j] && j + nums[j] >= i) {
//         // 如果已找到，能到达，也无需再遍历下去了
//         dp[i] = true;
//         break;
//       }
//     }
//   }
//   return dp[n - 1];
// }
// @lc code=end

const res1 = canJump([2, 3, 1, 1, 4]); // true

const res2 = canJump([3, 2, 1, 0, 4]); // false

const res3 = canJump([1, 2, 3]); // true

// 1. 贪心算法
// TODO:
// 2. 暴力（回溯）一般是会超时的
// 3. 动态规划？
// 4. 迭代
