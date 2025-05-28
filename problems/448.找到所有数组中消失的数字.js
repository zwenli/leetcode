/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const swap = (i, j) => {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }
  const n = nums.length
  // i === nums[i] - 1，数字和对应索引的关系
  for (let i = 0; i < n; i++) {
    while (nums[i] !== nums[nums[i] - 1]) {
      swap(i, nums[i] - 1)
    }
  }
  const ans = []
  for (let i = 0; i < n; i++) {
    if (i !== nums[i] - 1) {
      ans.push(i + 1)
    }
  }
  return ans
}

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

const res1 = findDisappearedNumbers([4,3,2,7,8,2,3,1])
assert.deepEqual(res1, [5, 6])