/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// function searchInsert(nums, target) {
//   let min = 0;
//   let max = nums.length - 1;
//   let middle = null;
//   while (min <= max) {
//     middle = Math.floor((min + max) / 2);
//     if (nums[middle] === target) {
//       return middle;
//     } if (nums[middle] > target) {
//       max = middle - 1;
//     } else if (nums[middle] < target) {
//       min = middle + 1;
//     }
//   }
//   // 需要判断下插在前一位还是后一位
//   return nums[middle] > target ? middle : middle + 1;
// }

function searchInsert(nums, target) {
  // 官方解
  // pos 成立条件
  // nums[pos−1]<target≤nums[pos]
  // 最后的目标：「在一个有序数组中找第一个大于等于 target 的下标」
  // 问题转化到这里，直接套用二分法即可，即不断用二分法逼近查找第一个大于等于 target 的下标 。
  // ans 初值设置为数组长度可以省略边界条件的判断，因为存在一种情况是 target 大于数组中的所有数，此时需要插入到数组长度的位置。

  let ans = nums.length;
  let left = 0;
  let right = ans - 1;
  while (left <= right) {
    // eslint-disable-next-line no-bitwise
    const mid = ((right - left) >> 1) + left;
    if (target <= nums[mid]) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
}
// @lc code=end

const res3 = searchInsert([1, 3, 5, 6], 2); // 1
const res2 = searchInsert([1, 3, 5, 6], 0); // 0
const res1 = searchInsert([1, 2, 3, 4, 5, 6, 8, 10], 7); // 6
console.log(res3);
console.log(res2);
console.log(res1);
