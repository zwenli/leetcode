/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  // 排序 + 双指针
  // time complexity O(mlogm + nlogn)
  // space complexity O(1)
  // 对数组排序后，然后再使用两个指针进行遍历，答案数据也是有序的
  // 为了保证加入元素的唯一性，用prev记录上一个加入答案的元素。
  const ans = []
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  let i = 0
  let j = 0
  let prev // 记录上一个加入答案的元素
  while (i < nums1.length && j < nums2.length) {
    const num1 = nums1[i]
    const num2 = nums2[j]
    if (num1 === num2) {
      // 两个元素相等，两个指针都向右移动一位
      if (prev !== num1) {
        // 唯一性判断，这里有两种情况
        // prev 为空时，说明此时的元素是第一个加入的元素，ans.length == 0
        // prev 不为空且和num不相等时，不相等说明此时的元素是唯一的（通过有序性保证）
        prev = num1
        ans.push(num1)
      }
      i += 1
      j += 1
    } else if (num1 > num2) {
      // 两个元素不相等时，小元素对应的指针向右移动一位
      j += 1
    } else {
      i += 1
    }
  }
  return ans
}
// var intersection = function (nums1, nums2) {
//   // 集合
//   // TODO：甚至共用一个set即可
//   // time complexity O(m + n)
//   // space complexity O(m + n)
//   const ans = []
//   let set1 = new Set(nums1)
//   let set2 = new Set(nums2)
//   if (set1.size > set2.size) {
//     const temp = set1
//     set1 = set2
//     set2 = temp
//   }
//   // 遍历小的集合，降低遍历次数
//   for (const num of set1) {
//     if (set2.has(num)) {
//       ans.push(num)
//     }
//   }
//   return ans
// }
// @lc code=end
const assert = require('node:assert').strict

const res1 = intersection([1, 2, 2, 1], [2, 2])
assert.deepEqual(res1, [2])

const res2 = intersection([4, 9, 5], [9, 4, 9, 8, 4])
assert.deepEqual(res2.sort(), [4, 9])
