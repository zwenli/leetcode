/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
  const n = nums.length;
  if (n <= 0) return null;
  let ans = nums[0];
  let i = 1;
  while (i < n) {
    if (ans > nums[i]) {
      ans = nums[i];
      break;
    }
    i += 1;
  }
  return ans;
}
// @lc code=end

const res1 = findMin([3, 4, 5, 1, 2]); // 1
const res2 = findMin([4, 5, 6, 7, 0, 1, 2]); // 0
