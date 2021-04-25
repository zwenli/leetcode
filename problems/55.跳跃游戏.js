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
  // 贪心算法，从后往前计算，这里不是要计算最短跳几步的，只要能计算出是否可跳到即可。
  // 时间复杂度O(n): n为数组长度，每次只能
  if (!nums || !nums.length) return false;
  if (nums.length === 1) return true;
  let lastStep = nums.length - 1; // 默认为最后一位
  for (let i = nums.length - 2; i >= 0; i -= 1) {
    if (i + nums[i] >= lastStep) {
      // 只要第i位可以跳到lastStep，就说明可以跳到这里，lastStep变为i
      lastStep = i;
    }
  }
  // lastStep为0说明可以从后到前走到第一位，也就是所求的答案
  return lastStep === 0;
}
// @lc code=end

const res1 = canJump([2, 3, 1, 1, 4]); // true

const res2 = canJump([3, 2, 1, 0, 4]); // false

// 1. 贪心算法
// TODO:
// 2. 暴力（回溯）一般是会超时的
// 3. 动态规划？
