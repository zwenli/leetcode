/*
 * @lc app=leetcode.cn id=606 lang=javascript
 *
 * [606] 根据二叉树创建字符串
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
 * @return {string}
 */
var tree2str = function (root) {
  // 节点为空的情况，返回空字符串
  if (root == null) return ''
  // 当前节点没有孩子，不需要在节点后面加上任何括号
  if (root.left == null && root.right == null) return `${root.val}`
  // 当前节点只有左孩子，在递归时只需要在左孩子的结果外加上一层括号，
  // 而不需要给右孩子加上任何括号
  if (root.right == null) {
    return `${root.val}(${tree2str(root.left)})`
  }
  // 如果当前节点有两个孩子，那我们在递归时，需要在两个孩子的结果外都加上一层括号。
  // 或者是当前节点只有右孩子，那我们在递归时，需要先加上一层空的括号 ‘()’ 表示左孩子为空，
  // 再对右孩子进行递归，并在结果外加上一层括号。
  return `${root.val}(${tree2str(root.left)})(${tree2str(root.right)})`
}

// @lc code=end

const assert = require('node:assert/strict')

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

const res1 = tree2str({
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
    },
  },
  right: {
    val: 3,
  },
})
assert.equal(res1, '1(2(4))(3)')
