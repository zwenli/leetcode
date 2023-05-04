/*
 * @lc app=leetcode.cn id=307 lang=javascript
 *
 * [307] 区域和检索 - 数组可修改
 */

// @lc code=start
class NumArray {
  /**
   * 树状数组
   * @param {number[]} nums
   */
  constructor(nums) {
    this.nums = nums
    this.tree = new Array(nums.length + 1).fill(0)
    for (let i = 0; i < nums.length; i++) {
      this.add(i, nums[i])
    }
  }

  update(index, val) {
    const diff = val - this.nums[index]
    this.nums[index] = val
    this.add(index, diff)
  }

  sumRange(left, right) {
    return this.query(right) - this.query(left - 1)
  }

  add(index, delta) {
    index += 1
    while (index <= this.nums.length) {
      this.tree[index] += delta
      index += this.lowbit(index)
    }
  }

  query(index) {
    index += 1
    let sum = 0
    while (index > 0) {
      sum += this.tree[index]
      index -= this.lowbit(index)
    }
    return sum
  }

  lowbit(x) {
    return x & -x
  }
}

// var NumArray = function (nums) {
//   // 线段树
//   // 另一种实现： https://leetcode.com/problems/range-sum-query-mutable/solutions/75724/17-ms-java-solution-with-segment-tree/
//   this.n = nums.length
//   this.segmentTree = new Array(this.n * 4).fill(0)
//   this.build(0, 0, this.n - 1, nums)
// }

// /**
//  * @param {number} index
//  * @param {number} val
//  * @return {void}
//  */
// NumArray.prototype.update = function (index, val) {
//   this.change(index, val, 0, 0, this.n - 1)
// }

// /**
//  * @param {number} left
//  * @param {number} right
//  * @return {number}
//  */
// NumArray.prototype.sumRange = function (left, right) {
//   return this.range(left, right, 0, 0, this.n - 1)
// }

// NumArray.prototype.build = function (node, s, e, nums) {
//   if (s === e) {
//     this.segmentTree[node] = nums[s]
//     return
//   }
//   const m = s + ((e - s) >> 1)
//   this.build(node * 2 + 1, s, m, nums)
//   this.build(node * 2 + 2, m + 1, e, nums)
//   this.segmentTree[node] =
//     this.segmentTree[node * 2 + 1] + this.segmentTree[node * 2 + 2]
// }
// NumArray.prototype.change = function (index, val, node, s, e) {
//   if (s === e) {
//     this.segmentTree[node] = val
//     return
//   }
//   const m = s + ((e - s) >> 1)
//   if (index <= m) {
//     // 左半区
//     this.change(index, val, node * 2 + 1, s, m)
//   } else {
//     this.change(index, val, node * 2 + 2, m + 1, e)
//   }
//   this.segmentTree[node] =
//     this.segmentTree[node * 2 + 1] + this.segmentTree[node * 2 + 2]
// }
// NumArray.prototype.range = function (left, right, node, s, e) {
//   if (left === s && right === e) {
//     return this.segmentTree[node]
//   }
//   const m = s + ((e - s) >> 1)
//   if (right <= m) {
//     // [left, right] 在 m 的左边
//     return this.range(left, right, node * 2 + 1, s, m)
//   } else if (left > m) {
//     // [left, right] 在 m 的右边
//     return this.range(left, right, node * 2 + 2, m + 1, e)
//   } else {
//     // m 在 [left, right] 之间
//     return (
//       this.range(left, m, node * 2 + 1, s, m) +
//       this.range(m + 1, right, node * 2 + 2, m + 1, e)
//     )
//   }
// }

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
// @lc code=end
const assert = require('node:assert').strict

const numArray = new NumArray([1, 3, 5])
assert.equal(numArray.sumRange(0, 2), 9)

numArray.update(1, 2)
assert.equal(numArray.sumRange(0, 2), 8)
