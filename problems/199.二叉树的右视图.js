/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
 */

// @lc code=start
// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  // 优先遍历右节点
  const ans = []
  rightView(root, ans, 0)
  return ans
  function rightView(node, ans, currDepth) {
    if (!node) return
    if (currDepth === ans.length) {
      ans.push(node.val)
    }
    rightView(node.right, ans, currDepth + 1)
    rightView(node.left, ans, currDepth + 1)
  }
}
// var rightSideView = function (root) {
//   // 层序遍历
//   if (!root) return []
//   const ans = []
//   const queue = [root]
//   while (queue.length) {
//     for (let i = 0, l = queue.length; i < l; i++) {
//       const node = queue.shift()
//       if (i === l - 1) {
//         ans.push(node.val)
//       }
//       if (node.left) {
//         queue.push(node.left)
//       }
//       if (node.right) {
//         queue.push(node.right)
//       }
//     }
//   }
//   return ans
// }
// @lc code=end
