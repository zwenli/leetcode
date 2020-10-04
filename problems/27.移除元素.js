/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  if (!nums || !nums.length) return 0;
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast += 1) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow += 1;
    }
  }
  return slow;
}
// @lc code=end
const nums1 = [3, 2, 2, 3];
const nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
const res1 = removeElement(nums1, 3); // 2, [2,2]
const res2 = removeElement(nums2, 2); // 5, [0,1,3,0,4]
