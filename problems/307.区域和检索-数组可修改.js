/*
 * @lc app=leetcode.cn id=307 lang=javascript
 *
 * [307] 区域和检索 - 数组可修改
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.n = nums.length
  this.segmentTree = new Array(this.n * 4).fill(0)
  this.build(0, 0, this.n - 1, nums)
}

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (index, val) {
  this.change(index, val, 0, 0, this.n - 1)
}

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  return this.range(left, right, 0, 0, this.n - 1)
}

NumArray.prototype.build = function (node, s, e, nums) {
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
NumArray.prototype.change = function (index, val, node, s, e) {
  if (s === e) {
    this.segmentTree[node] = val
    return
  }
  const m = s + ((e - s) >> 1)
  if (index <= m) {
    // 左半区
    this.change(index, val, node * 2 + 1, s, m)
  } else {
    this.change(index, val, node * 2 + 2, m + 1, e)
  }
  this.segmentTree[node] =
    this.segmentTree[node * 2 + 1] + this.segmentTree[node * 2 + 2]
}
NumArray.prototype.range = function (left, right, node, s, e) {
  if (left === s && right === e) {
    return this.segmentTree[node]
  }
  const m = s + ((e - s) >> 1)
  if (right <= m) {
    // [left, right] 在 m 的左边
    return this.range(left, right, node * 2 + 1, s, m)
  } else if (left > m) {
    // [left, right] 在 m 的右边
    return this.range(left, right, node * 2 + 2, m + 1, e)
  } else {
    // m 在 [left, right] 之间
    return (
      this.range(left, m, node * 2 + 1, s, m) +
      this.range(m + 1, right, node * 2 + 2, m + 1, e)
    )
  }
}

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
