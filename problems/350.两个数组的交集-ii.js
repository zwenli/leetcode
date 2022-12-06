/*
 * @lc app=leetcode.cn id=350 lang=javascript
 *
 * [350] 两个数组的交集 II
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  // 排序 + 双指针
  // time complexity O(mlogm + nlogn)
  // space complexity O(1)
  const ans = []
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  let i = 0
  let j = 0
  while (i < nums1.length && j < nums2.length) {
    const num1 = nums1[i]
    const num2 = nums2[j]
    if (num1 === num2) {
      // 对于相等的元素，添加进答案，同时两个指针都向右移动一位
      ans.push(num1)
      i += 1
      j += 1
    } else if (num1 > num2) {
      // 把小元素的指针向右移动一位
      j += 1
    } else {
      i += 1
    }
  }
  return ans
}
// var intersect = function (nums1, nums2) {
//   // 哈希
//   // time complexity O(m + n)
//   // space complexity O(min(m, n))
//   // 交换数组，这一步是为了降低空间复杂度
//   if (nums1.length > nums2.length) {
//     const temp = nums1
//     nums1 = nums2
//     nums2 = temp
//   }
//   let ans = []
//   // 小数组构建哈希表，记录每个数字出现的次数。
//   const map1 = new Map()
//   for (const num of nums1) {
//     map1.set(num, (map1.get(num) ?? 0) + 1)
//   }
//   // 遍历大数组
//   for (const num of nums2) {
//     const count = map1.get(num)
//     if (count > 0) {
//       // 数字存在，且次数大于0，记录在答案中
//       ans.push(num)
//       // 次数减1
//       map1.set(num, count - 1)
//     }
//   }
//   return ans
// }
// @lc code=end
const assert = require('node:assert').strict

const res1 = intersect([1, 2, 2, 1], [2, 2])
assert.deepEqual(res1, [2, 2])

const res2 = intersect([4, 9, 5], [9, 4, 9, 8, 4])
assert.deepEqual(res2.sort(), [4, 9])
