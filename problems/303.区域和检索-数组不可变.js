/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start
// class NumArray {
//   // 前缀和
//   // 初始化前缀和sums数组的时间复杂度为O(n)，
//   // 需要O(n)的空间存储sums
//   constructor(nums) {
//     const n = nums.length
//     this.sums = new Array(n + 1).fill(0)
//     for (let i = 0; i < n; i += 1) {
//       this.sums[i + 1] = this.sums[i] + nums[i]
//     }
//   }
//   // 每次检索只需要得到两个下标处的前缀和，然后计算差值，时间复杂度是 O(1)。
//   sumRange(left, right) {
//     return this.sums[right + 1] - this.sums[left]
//   }
// }

class NumArray {
  // 线段树
  constructor(nums) {
    this.n = nums.length
    this.segmentTree = new Array(this.n * 4).fill(0)
    this.build(0, 0, this.n - 1, nums)
  }
  sumRange(left, right) {
    return this.range(left, right, 0, 0, this.n - 1)
  }
  build(node, s, e, nums) {
    if (s === e) {
      this.segmentTree[node] = nums[s]
      return
    }
    const m = s + ((e - s) >> 1)
    this.build(node * 2 + 1, s, m, nums)
    this.build(node * 2 + 2, m + 1, e, nums)
    this.segmentTree[node] =
      this.segmentTree[node * 2 + 1] + this.segmentTree[node * 2 + 2]
  }

  range(left, right, node, s, e) {
    if (left === s && right === e) {
      return this.segmentTree[node]
    }
    const m = s + ((e - s) >> 1)
    if (right <= m) {
      return this.range(left, right, node * 2 + 1, s, m)
    } else if (left > m) {
      return this.range(left, right, node * 2 + 2, m + 1, e)
    } else {
      return (
        this.range(left, m, node * 2 + 1, s, m) +
        this.range(m + 1, right, node * 2 + 2, m + 1, e)
      )
    }
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
