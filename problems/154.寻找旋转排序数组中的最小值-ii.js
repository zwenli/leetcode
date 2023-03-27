/*
 * @lc app=leetcode.cn id=154 lang=javascript
 *
 * [154] 寻找旋转排序数组中的最小值 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // time complexity O(logn)
  // https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/solutions/167981/beats-100-binary-search-with-explanations/?utm_source=LCUS&utm_medium=ip_redirect&utm_campaign=transfer2china&orderBy=most_votes
  // 4种情况：
  // nums[left] <= nums[mid] <= nums[right]，最小值是 nums[left]
  // nums[left] > nums[mid] <= nums[right], (left, mid]区间是无序的，且最小值在区间内
  // nums[left] <= nums[mid] > nums[right], (mid, right]区间是无序的，且最小值在区间内
  // nums[left] > nums[mid] > nums[right], 这种情况是不存在的
  let left = 0 // 左边界
  let right = nums.length - 1 // 右边界
  // 数组本身是有序的
  if (nums[left] < nums[right]) return nums[left]

  while (left < right) {
    // 中间点
    const mid = ((right - left) >> 1) + left
    if (nums[mid] > nums[right]) {
      // 最小值落在(mid, right]
      left = mid + 1
    } else if (nums[mid] < nums[left]) {
      // 最小值落在(left, mid]
      right = mid
      left += 1
    } else {
      // nums[left] <= nums[mid] <= nums[right]
      // 此时无法区分最小值落在哪个区间，右边收缩
      right -= 1
    }
  }
  return nums[left]
}

// var findMin = function (nums) {
//   // time complexity O(logn)
//   // 对于数组中最后一个元素x，在最小值右侧的元素，它们的值一定是小于等于x，
//   // 在最小值左侧的元素，它们的值一定是大于等于x。通过这个性质，进行二分查找
//   let left = 0 // 左边界
//   let right = nums.length - 1 // 右边界
//   // 数组本身是有序的
//   if (nums[left] < nums[right]) return nums[left]

//   while (left < right) {
//     // 中间点
//     const mid = ((right - left) >> 1) + left
//     if (nums[mid] < nums[right]) {
//       // 第一种情况，说明nums[mid]是最小值右侧的元素，忽略右半部分
//       right = mid
//     } else if (nums[mid] > nums[right]) {
//       // 第二种情况，说明nums[mid]是最小值左侧的元素，忽略左半部分
//       left = mid + 1
//     } else {
//       // 第三种情况，nums[mid] === nums[right]
//       // 由于无法确定nums[mid] 是在最小值的左侧或者右侧。
//       // 因此只需要让最后一个元素减一，尝试右边收缩边界（因为nums[right]必定不是唯一的最小值）
//       right -= 1
//     }
//   }
//   return nums[left]
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = findMin([1, 3, 5])
assert.equal(res1, 1)

const res2 = findMin([2, 2, 2, 0, 1])
assert.equal(res2, 0)

const res3 = findMin([3, 3, 3, 3, 1, 3])
assert.equal(res3, 1)

const res4 = findMin([1, 3, 3])
assert.equal(res4, 1)
