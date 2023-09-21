/*
 * @lc app=leetcode.cn id=897 lang=javascript
 *
 * [897] 递增顺序搜索树
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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  // 在中序遍历中修改节点指向
  const dummy = new TreeNode(-1)
  let curNode = dummy

  const inorder = (node) => {
    if (!node) return
    inorder(node.left)

    curNode.right = node
    node.left = null
    curNode = node

    inorder(node.right)
  }

  inorder(root)
  return dummy.right
}

// var increasingBST = function (root) {
//   // 中序遍历后再生成新的树
//   const res = inorder(root)
//   const dummy = new TreeNode(-1)
//   let cur = dummy
//   for (const value of res) {
//     cur.right = new TreeNode(value)
//     cur = cur.right
//   }
//   return dummy.right
// }

// function inorder(root) {
//   const res = []
//   if (!root) return res
//   const stack = []
//   let cur = root
//   while (cur || stack.length) {
//     while (cur) {
//       stack.push(cur)
//       cur = cur.left
//     }
//     cur = stack.pop()
//     res.push(cur.val)
//     cur = cur.right
//   }
//   return res
// }
// @lc code=end
const { TreeNode } = require('../utils/tree')
