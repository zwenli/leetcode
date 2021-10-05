/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function rob(nums) {
  // 动态规划
  // 时间复杂度O(n): O(n) * 2
  // 空间复杂度O(1)
  // 设置4个变量一次循环也可以
  if (!nums || !nums.length) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);
  return Math.max(
    robHelper(0, nums.length - 2),
    robHelper(1, nums.length - 1),
  );

  function robHelper(start, end) {
    let first = 0;
    let second = 0;
    for (let i = start; i <= end; i += 1) {
      const tmp = Math.max(first + nums[i], second);
      first = second;
      second = tmp;
    }
    return second;
  }
}
// @lc code=end

const res1 = rob([2, 3, 1]); // 3

const res2 = rob([1, 2, 3, 1]); // 4

// 递归
// 动态规划
// 参考198.
// 相对198来说，由于房子是环形的，最后一个房子和第一个房子不能在同一晚上偷窃
// 那就分开计算两者情况的
// dp0 表示第一间房间要偷，最后一间不偷，此时范围为[0,n-2]
// dp1 表示第一件房间不偷，最后一间偷，此时范围为[1, n-1]
// 再取两个dp[end]的最大值
