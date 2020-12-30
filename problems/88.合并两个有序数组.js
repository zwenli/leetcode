/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
  // 1. 双指针，从后往千年
  // 时间复杂度O(m+n): 两个数组都要遍历一次
  // 空间复杂度O(1):
  let p = m + n - 1;
  let p1 = m - 1;
  let p2 = n - 1;
  // while (p1 >= 0 && p2 >= 0) {
  //   nums1[p--] = nums1[p1] < nums2[p2] ? nums2[p2--] : nums1[p1--];
  // }
  // // 只需额外处理nums2剩余的
  // while (p2 >= 0) {
  //   nums1[p--] = nums2[p2--];
  // }
  // 另一种优化思路，单独判断 p2 >= 0
  // 当p2 < 0, 也就是nums1仍有剩余，无须处理
  // 当p1 < 0, 也就是nums2仍有剩余，nums1[p1]此时为 undefined,
  //  undefined 和数组对比，会转换成NaN，NaN和任意数字对比都是false，
  //  也就必定会走else的部分
  while (p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p--] = nums1[p1--];
    } else {
      nums1[p--] = nums2[p2--];
    }
  }
}
// @lc code=end
// function merge(nums1, m, nums2, n) {
//   // 1. 双指针，从前往后，需要额外空间存储nums1的备份
//   // 时间复杂度O(m+n): 两个数组都要遍历一次
//   // 空间复杂度O(m): 额外m的空间存nums1的备份
//   const nums1Copy = [...nums1];
//   let p = 0;
//   let p1 = 0;
//   let p2 = 0;
//   while (p1 < m && p2 < n) {
//     nums1[p++] = nums1Copy[p1] < nums2[p2] ? nums1Copy[p1++] : nums2[p2++];
//   }
//   // 剩余的补上
//   if (p1 < m) {
//     while (p1 < m) {
//       nums1[p++] = nums1Copy[p1++];
//     }
//   }
//   if (p2 < n) {
//     while (p2 < n) {
//       nums1[p++] = nums2[p2++];
//     }
//   }
// }

// function merge(nums1, m, nums2, n) {
//   // 1. 简单粗暴，合并+排序
//   // 时间复杂度O((m+n)log(m+n)): 合并的时间复杂度为O(n), 排序的时间复杂度为O((m+n)log(m+n))
//   // 空间复杂度O(1): 不占额外空间
//   for (let i = 0; i < n; i += 1) {
//     nums1[m + i] = nums2[i];
//   }
//   nums1.sort((a, b) => a - b);
// }

const nums1 = [1, 2, 3, 0, 0, 0];
const nums2 = [2, 5, 6];
merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
