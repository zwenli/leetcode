/*
 * @lc app=leetcode.cn id=324 lang=javascript
 *
 * [324] 摆动排序 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function wiggleSort(nums) {
  const copies = nums.slice()
  copies.sort((a, b) => a - b)
  const n = nums.length
  const x = (n + 1) >> 1
  for (let i = 0, j = x - 1, k = n - 1; i < n; i += 2, j -=1, k -= 1) {
    nums[i] = copies[j]
    if (i + 1 < n) {
      nums[i + 1] = copies[k]
    }
  }
}
// @lc code=end
const assert = require('assert').strict

const res1 = [1,5,1,1,6,4]
wiggleSort(res1)
// assert.deepEqual(res1, [1,4,1,5,1,6])

const res2 = [1,3,2,2,3,1]
wiggleSort(res2)
// assert.deepEqual(res2, [2,3,1,3,1,2])

const res3 = [1,1,2,1,2,2,1]
wiggleSort(res3)
assert.deepEqual(res3, [1,2,1,2,1,2,1])
