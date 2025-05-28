/*
 * @lc app=leetcode.cn id=442 lang=javascript
 *
 * [442] 数组中重复的数据
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  // 核心思想：利用原数组作为哈希表，通过将**元素对应索引位置**的值取负来标记是否出现过
  // 索引映射：数值 x 对应数组的索引为 x-1（因为题目中数值范围是 1 ≤ a[i] ≤ n）

  const ans = []
  // 可以给 nums[i] 加上负数表示数 i+1 已经出现过一次
  for (let i = 0; i < nums.length; i++) {
    // nums[i] 可能为负数，需要取绝对值
    const x = Math.abs(nums[i])
    // 检查对应索引位置（nums[i]-1）的元素
    if (nums[x - 1] > 0) {
      // 说明 nums[i] 还没出现过，
      // 因此吧 nums[nums[i] - 1] 加上负号
      nums[x - 1] = -nums[x - 1]
    } else {
      // 说明 nums[i] 已经出现过一次
      ans.push(x)
    }
  }
  return ans
}

// var findDuplicates = function (nums) {
//   t O(n), s O(1)
//   function swap(nums, i, j) {
//     const temp = nums[i]
//     nums[i] = nums[j]
//     nums[j] = temp
//   }
//   const n = nums.length
//   for (let i = 0; i < n; i++) {
//     while (nums[i] !== nums[nums[i] - 1]) {
//       swap(nums, i, nums[i] - 1)
//     }
//   }
//   const ans = []
//   for (let i = 0; i < n; i++) {
//     if (i !== nums[i] - 1) {
//       ans.push(nums[i])
//     }
//   }
//   return ans
// }

// var findDuplicates = function (nums) {
//   // 哈希，t O(n), s O(n)
//   const counts = {}
//   const ans = []

//   for (const num of nums) {
//     counts[num] = (counts[num] ?? 0) + 1
//     if (counts[num] === 2) ans.push(num)
//   }

//   return ans
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])
assert.deepEqual(res1, [2, 3])
