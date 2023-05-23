/*
 * @lc app=leetcode.cn id=334 lang=javascript
 *
 * [334] 递增的三元子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// var increasingTriplet = function (nums) {
//   // 贪心
//   // 核心是尽可能让左边和中间的值更小。
//   // 关键点：假设已经找到了长度为2的递增序列情况下，又来了一个小于等于first的值。
//   // 如果不替换first，那么当下一个数字是大于first，小于second，无法发现是个严格递增的序列。
//   // 如果替换了，first在second后面，没有严格遵守递增顺序，但隐含了一个关键信息，
//   // 有一个比first大，比second小的值出现在second之前。
//   // 因此，当后续出现比 second 大的值时，一样可以通过first和second推断出确存在着长度为 3 的递增序列。
//   const n = nums.length
//   if (n < 3) return false
//   let first = Infinity // 最小值
//   let second = Infinity // 中间值
//   for (const num of nums) {
//     if (num <= first) {
//       first = num
//     } else if (num <= second) {
//       second = num
//     } else if (num > second) {
//       return true
//     }
//   }
//   return false
// }

var increasingTriplet = function (nums) {
  // 双向遍历
  const n = nums.length
  if (n < 3) return false
  const leftMin = new Array(n).fill(0) // leftMin[i] 表示 [0,i] 之间最小的值
  const rightMax = new Array(n).fill(0) // rightMax[i] 表示 [i, n-1] 之间最大的值。
  leftMin[0] = nums[0]
  rightMax[n - 1] = nums[n - 1]
  for (let i = 1; i < n; i++) {
    leftMin[i] = Math.min(leftMin[i - 1], nums[i])
    rightMax[n - i - 1] = Math.max(rightMax[n - i], nums[n - i - 1])
  }
  for (let i = 1; i < n - 1; i++) {
    if (leftMin[i - 1] < nums[i] && nums[i] < rightMax[i + 1]) {
      // 存在一个下标i， 1 <= i < n-1，
      // 使得 nums[i] 左边存在一个元素小于nums[i]且 右边存在一个元素大于nums[i]
      // 则存在存在递增的三元子序列。
      return true
    }
  }
  return false
}

// var increasingTriplet = function (nums) {
//   const n = nums.length
//   if (n < 3) return false
//   for (let i = 0; i < n - 2; i++) {
//     for (let j = i + 1; j < n - 1; j++) {
//       for (let k = j + 1; k < n; k++) {
//         if (nums[i] < nums[j] && nums[j] < nums[k]) {
//           return true
//         }
//       }
//     }
//   }
//   return false
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = increasingTriplet([1, 2, 3, 4, 5])
assert.equal(res1, true)

const res2 = increasingTriplet([5, 4, 3, 2, 1])
assert.equal(res2, false)

const res3 = increasingTriplet([1, 1, -2, 6])
assert.equal(res3, false)
