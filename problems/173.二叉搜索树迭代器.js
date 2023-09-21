/*
 * @lc app=leetcode.cn id=173 lang=javascript
 *
 * [173] 二叉搜索树迭代器
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  this.cur = root
  this.stack = []
}

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  while (this.cur) {
    this.stack.push(this.cur)
    this.cur = this.cur.left
  }
  this.cur = this.stack.pop()
  const ret = this.cur.val
  this.cur = this.cur.right
  return ret
}

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.cur != null || this.stack.length > 0
}

// var BSTIterator = function (root) {
//   this.arr = inorder(root)
//   this.index = 0
// }

// function inorder(root) {
//   const arr = []
//   const stack = [root]
//   while (stack.length) {
//     const cur = stack[stack.length - 1]
//     if (cur.left && !arr.includes(cur.left.val)) {
//       stack.push(cur.left)
//       continue
//     }
//     arr.push(cur.val)
//     stack.pop()
//     if (cur.right) {
//       stack.push(cur.right)
//     }
//   }
//   return arr
// }

// /**
//  * @return {number}
//  */
// BSTIterator.prototype.next = function () {
//   if (!this.hasNext()) return -1
//   return this.arr[this.index++]
// }

// /**
//  * @return {boolean}
//  */
// BSTIterator.prototype.hasNext = function () {
//   return this.index < this.arr.length
// }

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end

const assert = require('node:assert/strict')
const { buildTree } = require('../utils/tree')

const obj1 = new BSTIterator(buildTree([7, 3, 15, null, null, 9, 20]))
assert.equal(obj1.next(), 3)
assert.equal(obj1.next(), 7)
assert.equal(obj1.hasNext(), true)
assert.equal(obj1.next(), 9)
assert.equal(obj1.hasNext(), true)
assert.equal(obj1.next(), 15)
assert.equal(obj1.hasNext(), true)
assert.equal(obj1.next(), 20)
assert.equal(obj1.hasNext(), false)
