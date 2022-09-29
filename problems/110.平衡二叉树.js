/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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
 * @return {boolean}
 */
function height(root) {
  // 先序遍历，先判断子树是否为平衡二叉树，剪枝优化
  if (root === null) return 0
  let leftHeight
  let rightHeight
  if (
    (leftHeight = height(root.left)) === -1 ||
    (rightHeight = height(root.right)) === -1 ||
    Math.abs(leftHeight - rightHeight) > 1
  ) {
    return -1
  } else {
    return Math.max(leftHeight, rightHeight) + 1
  }
}
var isBalanced = function (root) {
  // 自底向上
  // time complexity O(n): 只需遍历一次二叉树的节点
  return height(root) > -1
}
// function height(root) {
//   if (root === null) return 0
//   return Math.max(height(root.left), height(root.right)) + 1
// }
// var isBalanced = function(root) {
//   // 自顶向下
//   // time complexity O(n^2)
//   if (root === null) return true
//   const leftHeight = height(root.left)
//   const rightHeight = height(root.right)
//   return Math.abs(leftHeight - rightHeight) <= 1
//     && isBalanced(root.left) && isBalanced(root.right)
// };
// @lc code=end
