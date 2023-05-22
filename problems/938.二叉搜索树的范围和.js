/*
 * @lc app=leetcode.cn id=938 lang=javascript
 *
 * [938] 二叉搜索树的范围和
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  // 节点不存在
  if (!root) return 0
  if (root.val > high) {
    // 由于二叉搜索树右子树上所有节点的值均大于根节点的值，
    // 即均大于 high，故无需考虑右子树
    return rangeSumBST(root.left, low, high)
  }
  if (root.val < low) {
    // 由于二叉搜索树左子树上所有节点的值均小于根节点的值，
    // 即均小于 low，故无需考虑左子树
    return rangeSumBST(root.right, low, high)
  }
  // root节点在[low,high]范围内，
  // 此时应返回 root节点的值、左子树的范围和、右子树的范围和这三者之和。
  return (
    root.val +
    rangeSumBST(root.left, low, high) +
    rangeSumBST(root.right, low, high)
  )
}
// @lc code=end

const assert = require('node:assert/strict')

const root1 = {
  val: 10,
  left: {
    val: 5,
    left: {
      val: 3,
    },
    right: {
      val: 7,
    },
  },
  right: {
    val: 15,
    right: {
      val: 18,
    },
  },
}
const res1 = rangeSumBST(root1, 7, 15)
assert.equal(res1, 32)
