/* eslint-disable no-bitwise */
/* eslint-disable no-lonely-if */
/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

function search(nums, target) {
  // 二分查找
  // 时间复杂度O(logn)
  // 空间复杂度O(1)
  // 要在[0, i]区间内查找，有三种情况：
  //  nums[0] <= target <= nums[i], 区间是有序的，且target在区间内范围
  //             target <= nums[i] < nums[0], 区间是无序的，且target在旋转点之后
  //                       nums[i] < nums[0] <= target, 区间是无序的，且target在旋转点之前
  // 所以我们对三项进行判断
  // (nums[0] <= target), (target <= nums[i]), (nums[i] < nums[0])
  // 三项中其中两项为真，就说明在[0,i]的区间内，因为其中两项为真就可以命中其中一种情况。
  // 同时我们也可以知道三项结果不可能同时为真或假（会互斥）,
  // 故，只需要拍断三项中有两项为真还是一项为真，
  // 用异或^, 三项中两项为真结果为假，一项为真结果为真。
  if (!nums || !nums.length) return -1;
  const n = nums.length;
  if (n === 1) {
    return nums[0] === target ? 0 : -1;
  }
  let left = 0;
  let right = n - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if ((nums[0] <= target) ^ (target <= nums[mid]) ^ (nums[mid] < nums[0])) {
      // 不落在[0, mid]中，向右收缩
      left = mid + 1;
    } else {
      // 落在[0, mid]中，向左收缩
      right = mid - 1;
    }
  }
  return -1;
}
// function search(nums, target) {
//   // 二分查找
//   // 时间复杂度O(logn)
//   // 空间复杂度O(1)
//   if (!nums || !nums.length) return -1;
//   const n = nums.length;
//   if (n === 1) {
//     return nums[0] === target ? 0 : -1;
//   }
//   let left = 0;
//   let right = n - 1;
//   // 题目确定了必定存在旋转点，以旋转点为分界，其实两个区间也是升序（有序）的，
//   // 我们可以在二分查找时，查看当前mid为分割位置分割出来的两个部分[l, mid],[mid + 1, r]
//   // 哪个部分是有序的，并根据有序的那个部分确定我们该如何改变二分查找的上下界，
//   // 我们能够根据有序的那部分判断出 target 在不在这个部分：
//   while (left <= right) {
//     const mid = left + Math.floor((right - left) / 2);
//     if (nums[mid] === target) {
//       return mid;
//     }
//     if (nums[0] <= nums[mid]) {
//       // nums[0] <= nums[mid] 说明在这个区间范围内是升序
//       if (nums[0] <= target && target < nums[mid]) {
//         // target在区间范围内，搜索范围向左收缩
//         right = mid - 1;
//       } else {
//         // 否则就向右收缩
//         left = mid + 1;
//       }
//     } else {
//       // 两个区间范围必定是其中一个是升序的，
//       // 这里也就是 nums[mid] < nums[n-1]，这个区间范围是升序的
//       if (nums[mid] < target && target <= nums[n - 1]) {
//         // target在区间范围内，搜索范围向右收缩
//         left = mid + 1;
//       } else {
//         // 否则向左收缩
//         right = mid - 1;
//       }
//     }
//   }
//   // 找不到，返回-1
//   return -1;
// }
// @lc code=end

const res1 = search([4, 5, 6, 7, 0, 1, 2], 0); // 4

const res2 = search([4, 5, 6, 7, 0, 1, 2], 3); // -1

const res3 = search([1], 0); // -1

// 二分查找
