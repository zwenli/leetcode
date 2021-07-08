/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=493 lang=javascript
 *
 * [493] 翻转对
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function reversePairs(nums) {
  // 归并排序
  if (!nums || nums.length < 2) return 0;
  return mergeSort(nums, 0, nums.length - 1);
}

function mergeSort(nums, left, right) {
  if (left >= right) return 0;
  const mid = left + ((right - left) >> 1);
  let count = mergeSort(nums, left, mid)
   + mergeSort(nums, mid + 1, right);
  const cache = new Array(right - left + 1);
  let i = left; // 翻转对下标
  let c = 0; // cache下标
  let k = left; // 左区间下标
  for (let j = mid + 1; j <= right; j++, c++) {
    while (i <= mid && nums[i] <= 2 * nums[j]) i++;
    while (k <= mid && nums[k] < nums[j]) cache[c++] = nums[k++];
    count += mid - i + 1;
    cache[c] = nums[j];
  }
  while (k <= mid) cache[c++] = nums[k++];
  for (let p = 0; p < cache.length; p++) {
    nums[left + p] = cache[p];
  }
  return count;
}

// function reversePairs(nums) {
//   // 归并排序
//   if (!nums || nums.length < 2) return 0;
//   return mergeSort(nums, 0, nums.length - 1);
// }

// function mergeSort(nums, left, right) {
//   if (left >= right) return 0;
//   const mid = left + ((right - left) >> 1);
//   let count = mergeSort(nums, left, mid)
//    + mergeSort(nums, mid + 1, right);
//   // todo：统计和合并可以同时进行
//   // 计算翻转对的数量
//   for (let i = left, j = mid + 1; j <= right; j++) {
//     // 左右两子数组是有序的，移动左区间的下标，直到满足重要翻转对的条件
//     while (i <= mid && nums[i] <= 2 * nums[j]) i++;
//     // 此时[i, mid]区间内的元素都对nums[j]形成重要翻转对，
//     // 故计算区间内的元素个数即可。
//     count += mid - i + 1;
//     // 之后j进1位重复步骤
//   }
//   // 合并两个有序数组
//   const cache = new Array(right - left + 1);
//   let m = left;
//   let c = 0;
//   for (let n = mid + 1; n <= right; n++, c++) {
//     while (m <= mid && nums[m] < nums[n]) {
//       cache[c++] = nums[m++];
//     }
//     cache[c] = nums[n];
//   }
//   while (m <= mid) {
//     cache[c++] = nums[m++];
//   }
//   for (let k = 0; k < cache.length; k += 1) {
//     nums[left + k] = cache[k];
//   }
//   return count;
// }

// function reversePairs(nums) {
//   // 暴力解法，会超时
//   // time complexity O(n^2): 两层循环
//   if (nums.length < 2) return 0;
//   let res = 0;
//   const n = nums.length;
//   for (let i = 0; i < n - 1; i += 1) {
//     for (let j = i + 1; j < n; j += 1) {
//       if (nums[i] > 2 * nums[j]) {
//         res += 1;
//       }
//     }
//   }
//   return res;
// }
// @lc code=end

const res1 = reversePairs([1, 3, 2, 3, 1]);
// 2
const res2 = reversePairs([2, 4, 3, 5, 1]);
// 3

/**

相似题目 逆序对

1. 暴力解法，两层循环
2. 归并排序
3. 数状数组
 */
