/*
 * @lc app=leetcode.cn id=611 lang=javascript
 *
 * [611] 有效三角形的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function triangleNumber(nums) {
  // 排序 + 双指针，非常类似三数之和
  // time complexity O(n^2): 排序O(nlogn), 双指针寻找答案的时间复杂度为O(n^2)
  // 从三角形的性质可知，只要两个较小的边之和大于最大的边，那么就必定是三角形
  // 将数组排序后就可以利用这个性质。
  nums.sort((a, b) => a - b)
  const n = nums.length
  let ans = 0
  for (let i = 2; i < n; i++) {
    for (let j = i - 1, k = 0; k < j; j--) {
      while (k < j && nums[k] + nums[j] <= nums[i]) k++
      ans += j - k
    }
  }
  return ans
}

// function triangleNumber(nums) {
//   // 排序 + 二分查找解答，但时间复杂度(没有双指针好
//   // time complexity O(n^2*logn))
//   nums.sort((a, b) => a - b)
//   const n = nums.length
//   let ans = 0
//   for (let i = 2; i < n; i++) {
//     for (let j = i - 1; j > 0; j--) {
//       let l = 0
//       let r = j - 1
//       while (l < r) {
//         const mid = (l + r) >> 1
//         if (nums[mid] + nums[j] > nums[i]) {
//           r = mid
//         } else {
//           l = mid + 1
//         }
//       }
//       if (nums[r] + nums[j] > nums[i]) {
//         ans += j - r
//       }
//     }
//   }
//   return ans
// }

// function triangleNumber(nums) {
//   // 暴力解法
//   let ans = 0
//   const n = nums.length
//   if (n < 3) return ans
//   for (let i = 0; i < n - 2; i++) {
//     for (let j = i + 1; j < n - 1; j++) {
//       for (let k = j + 1; k < n; k++) {
//         if (isTriangle(nums[i], nums[j], nums[k])) {
//           ans += 1
//         }
//       }
//     }
//   }
//   return ans
// }
// function isTriangle(a, b, c) {
//   return a + b > c && a + c > b && b + c > a
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = triangleNumber([2, 2, 3, 4])
assert.equal(res1, 3)

const res2 = triangleNumber([4, 2, 3, 4])
assert.equal(res2, 4)
