/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  if (!nums || !nums.length) return -1;
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  let pivot;
  while (left <= right) {
    // eslint-disable-next-line no-bitwise
    pivot = left + ((right - left) >> 1);
    const elem = nums[pivot];
    if (elem === target) {
      return pivot;
    }
    if (elem < target) {
      left = pivot + 1;
    } else {
      right = pivot - 1;
    }
  }
  return -1;
}
// @lc code=end

const res1 = search([-1, 0, 3, 5, 9, 12], 9);
