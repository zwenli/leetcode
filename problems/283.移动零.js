/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums) {
  const n = nums.length;
  if (n > 0) {
    let i = 0;
    let j = 0;
    for (; j < n; j += 1) {
      if (nums[j] !== 0) {
        nums[i] = nums[j];
        i += 1;
      }
    }
    for (; i < n; i += 1) {
      nums[i] = 0;
    }
  }
}
// @lc code=end

const nums1 = [0, 1, 0, 3, 12];
moveZeroes(nums1); // [1,3,12,0,0]
