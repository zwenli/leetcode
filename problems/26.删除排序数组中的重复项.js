/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  // 快慢指针，基于有序数组
  // 时间复杂度 O(n)
  // 空间复杂度 O(1)

  const { length } = nums;
  // 数组为空返回0
  if (length === 0) return 0;
  // 慢指针i，快指针j
  // 如果nums[i] === nums[j] 说明存在重复项，i不变
  // 如果不等，此时i进一位，j赋值给i
  let i = 0;
  for (let j = 1; j < length; j += 1) {
    if (nums[i] !== nums[j]) {
      i += 1;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
// @lc code=end

// function removeDuplicates(nums) {
//   // 适用于无序数组
//   // 时间复杂度 O(n)
//   // 空间复杂度 O(n)
//   const set = new Set();
//   for (let i = 0; i < nums.length; i += 1) {
//     if (!set.has(nums[i])) {
//       set.add(nums[i]);
//       nums[set.size - 1] = nums[i];
//     }
//   }
//   nums.length = set.size;
//   return nums.length;
// }

const nums1 = [1, 1, 2];
const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const res1 = removeDuplicates(nums1); // 2, [1,2]
const res2 = removeDuplicates(nums2); // 5, [0,1,2,3,4]
