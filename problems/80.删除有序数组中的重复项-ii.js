/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除有序数组中的重复项 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const n = nums.length
  if (n <= 2) return
  let slow = 2 // 表示处理过的数组的长度
  let fast = 2 // 表示检查过的数组的长度
  while (fast < n) {
    // nums[fast] 表示待检查的第一个元素
    // nums[slow - 1] 表示上一个应该被保留的元素所移动到的指定位置
    // 相同元素最多重复出现两次，所以仅需要检查上上个元素nums[slow-2]
    // 是否和当前元素相同，相同时当前元素不应保留
    if (nums[slow - 2] !== nums[fast]) {
      nums[slow] = nums[fast]
      slow += 1
    }
    fast += 1
  }
  return slow
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = [1, 1, 1, 2, 2, 3]
assert.deepEqual(res1.slice(0, removeDuplicates(res1)), [1, 1, 2, 2, 3])

const res2 = [0, 0, 1, 1, 1, 1, 2, 3, 3]
assert.deepEqual(res2.slice(0, removeDuplicates(res2)), [0, 0, 1, 1, 2, 3, 3])

const res3 = [1, 1, 1, 2, 2, 3]
assert.deepEqual(res3.slice(0, removeDuplicates(res3)), [1, 1, 2, 2, 3])
