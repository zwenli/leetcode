/* eslint-disable no-bitwise */
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
  // https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/solution/er-fen-cha-zhao-wei-shi-yao-zuo-you-bu-dui-cheng-z/
  // 二分法
  // 时间复杂度O(logn):
  // 空间复杂度O(1)
  if (!nums || !nums.length) return -1;
  let left = 0;
  let right = nums.length - 1;
  // 用左右中三个位置的比较有以下三种情况，
  // 左<中<右: 说明没有旋转，目标值（最小值）在最左边，可以收缩右边界
  // 左>中，中<右，有旋转，目标值在左半边，可以收缩右边界
  // 左<中，中>右，有旋转，目标值在右半边，可以收缩左边界
  // 左>中>右的情况是不存在的。
  // 三种情况分析，1、2是同一类；3是另一类
  // 如果中值<右值，收缩右边界
  // 如果中值>右值，左边界
  // PS:如果只是判断中值和左值是无法确定收缩哪个边界的。

  // while 循环的细节
  // 中间值 mid = left + ((right - left) >> 1)
  // 值是向下取整的，mid更靠近left
  // 结合left < right，可知
  // left <= mid, mid < right
  // 即在while循环内，mid始终是小于right的
  // 因此在while内，nums[mid]要么大于要么小于nums[right]，不会等于。

  // while 条件 left<right
  // 如果数组只有一个数，那么 left === right，不会进入循环，直接输出
  // 如果数组不只有一个数，那么循环到最后，会只剩下两个数，nums[left] === nums[mid], 以及nums[right]
  // 这里位置是left == mid == right - 1
  // 如果nums[left]==nums[mid]>nums[right]，
  // 则左边界大，右边界小，执行left = mid + 1，使得left = right，结束循环，nums[left]和nums[right]都保持了最小值
  // 如果nums[left]==nums[mid]<nums[right]，
  // 则左边界小，右边界大，执行right = left，使得left = right，结束循环，nums[left]和nums[right]都保持了最小值
  while (left < right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return nums[left];
}

// function findMin(nums) {
//   // 二分查找
//   // 时间复杂度O(logn):
//   // 空间复杂度O(1)
//   if (!nums || !nums.length) return -1;
//   let left = 0;
//   let right = nums.length - 1;
//   // 最左边小于最右边，说明没有旋转
//   // 等于是长度为1的情况
//   if (nums[left] <= nums[right]) return nums[0];
//   // 数组中存在旋转点，用二分法找出最小值
//   while (left <= right) {
//     const mid = left + ((right - left) >> 1);
//     // 通过判断 mid-1, mid, mid + 1
//     // 找出是否存在旋转点
//     if (nums[mid] > nums[mid + 1]) return nums[mid + 1];
//     if (nums[mid - 1] > nums[mid]) return nums[mid];
//     if (nums[mid] > nums[0]) {
//       // 说明左子区间是有序的，旋转点在右子区间
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return -1;
// }
// function findMin(nums) {
//   // 二分法
//   // 只有一个元素
//   const { length } = nums;
//   if (length === 1) {
//     return nums[0];
//   }

//   // 第一个元素比最后一个元素小，说明没被旋转，即第一个元素最小
//   if (nums[0] < nums[length - 1]) {
//     return nums[0];
//   }

//   // 已旋转，通过二分法找到变化点
//   // 变化点的特点
//   // 变化点左侧的元素 》 第一个元素
//   // 变化点右侧的元素 《 第一个元素
//   let left = 0;
//   let right = length - 1;
//   while (left <= right) {
//     // eslint-disable-next-line no-bitwise
//     const mid = left + ((right - left) >> 1);
//     // 两个边界条件判断是否为变化点
//     if (nums[mid] > nums[mid + 1]) {
//       return nums[mid + 1];
//     }
//     if (nums[mid - 1] > nums[mid]) {
//       return nums[mid];
//     }
//     // mid不是变化点，如果mid大于第一个元素继续找右边的元素
//     // 否则找左边的
//     if (nums[mid] > nums[0]) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return -1;
// }
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
