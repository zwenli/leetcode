/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start
class NumArray {
  // 前缀和
  // 初始化前缀和sums数组的时间复杂度为O(n)，
  // 需要O(n)的空间存储sums
  constructor(nums) {
    const n = nums.length
    this.sums = new Array(n + 1).fill(0)
    for (let i = 0; i < n; i += 1) {
      this.sums[i + 1] = this.sums[i] + nums[i]
    }
  }
  // 每次检索只需要得到两个下标处的前缀和，然后计算差值，时间复杂度是 O(1)。
  sumRange(left, right) {
    return this.sums[right + 1] - this.sums[left]
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// @lc code=end

const assert = require('assert')

const arr1 = new NumArray([-2, 0, 3, -5, 2, -1])
assert.equal(arr1.sumRange(0, 2), 1)
assert.equal(arr1.sumRange(2, 5), -1)
assert.equal(arr1.sumRange(0, 5), -3)
