/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字
 */

// 相似题目 442
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  // 为什么有效？
  // 标记机制：每个出现的数字 x 会将 nums[x-1] 标记为负。若数字 y 缺失，则 nums[y-1] 不会被标记，保持正数。
  // 重复处理：若数字重复出现，目标索引可能已被标记为负，但 abs(...) 能正确获取原始值，多次标记结果不变。

  // 第一次遍历：标记出现过的数字
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1 // 将每个元素值 nums[i] 视为一个索引（位置）的映射
    if (nums[index] > 0) { // 避免重复标记（负数变正数）
      nums[index] = -nums[index] // 标记为负数表示该数字出现过
    }
  }

  const res = []
  // 第二次遍历：收集未标记的数字（正数位置）
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      res.push(i + 1) // 索引位置+1即缺失的数字
    }
  }
  return res
}

// var findDisappearedNumbers = function (nums) {
//   const swap = (i, j) => {
//     const temp = nums[i]
//     nums[i] = nums[j]
//     nums[j] = temp
//   }
//   const n = nums.length
//   // i === nums[i] - 1，数字和对应索引的关系
//   for (let i = 0; i < n; i++) {
//     while (nums[i] !== nums[nums[i] - 1]) {
//       swap(i, nums[i] - 1)
//     }
//   }
//   const ans = []
//   for (let i = 0; i < n; i++) {
//     if (i !== nums[i] - 1) {
//       ans.push(i + 1)
//     }
//   }
//   return ans
// }

// var findDisappearedNumbers = function (nums) {
//   // 哈希，记录数字出现的次数
//   const n = nums.length
//   const counts = new Array(n).fill(0)
//   for (const num of nums) {
//     counts[num - 1] += 1
//   }
//   const ans = []
//   for (let i = 1; i <= n; i++) {
//     if (!counts[i - 1]) ans.push(i)
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])
assert.deepEqual(res1, [5, 6])
