/*
 * @lc app=leetcode.cn id=485 lang=javascript
 *
 * [485] 最大连续1的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaxConsecutiveOnes(nums) {
  if (!nums || !nums.length) return 0;
  let count = -Infinity;
  let i = 0;
  let j = 0;
  for (; j < nums.length; j += 1) {
    if (nums[j] !== 1) {
      count = Math.max(count, j - i);
      i = j + 1;
    }
  }
  count = Math.max(count, j - i);
  return count;
}
// @lc code=end
const res1 = findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]); // 3
const res2 = findMaxConsecutiveOnes([0]); // 2
