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
  // 二分法
  // 只有一个元素
  const { length } = nums;
  if (length === 1) {
    return nums[0];
  }

  // 第一个元素比最后一个元素小，说明没被旋转，即第一个元素最小
  if (nums[0] < nums[length - 1]) {
    return nums[0];
  }

  // 已旋转，通过二分法找到变化点
  // 变化点的特点
  // 变化点左侧的元素 》 第一个元素
  // 变化点右侧的元素 《 第一个元素
  let left = 0;
  let right = length - 1;
  while (left <= right) {
    // eslint-disable-next-line no-bitwise
    const mid = left + ((right - left) >> 1);
    // 两个边界条件判断是否为变化点
    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];
    }
    if (nums[mid - 1] > nums[mid]) {
      return nums[mid];
    }
    // mid不是变化点，如果mid大于第一个元素继续找右边的元素
    // 否则找左边的
    if (nums[mid] > nums[0]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
// @lc code=end

// function findMin(nums) {
//   // 阶梯思路，数组在旋转前是升序的，我们可以假设第一个为最小值
//   // 之后遍历数据，找到比假设值大的，说明是最小值，不用再遍历
//   // 时间复杂度O(n)
//   const n = nums.length;
//   if (n <= 0) return null;
//   let ans = nums[0];
//   let i = 1;
//   while (i < n) {
//     if (ans > nums[i]) {
//       ans = nums[i];
//       break;
//     }
//     i += 1;
//   }
//   return ans;
// }
const res1 = findMin([3, 4, 5, 1, 2]); // 1
const res2 = findMin([4, 5, 6, 7, 0, 1, 2]); // 0
