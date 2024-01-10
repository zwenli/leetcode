/*
 * @lc app=leetcode.cn id=993 lang=javascript
 *
 * [993] 二叉树的堂兄弟节点
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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  // dfs
  if (root == null) return false
  const queue = [root]
  while (queue.length) {
    let foundX = false
    let foundY = false
    for (let i = queue.length - 1; i >= 0; i--) {
      const node = queue.shift()
      if (node.val === x) foundX = true
      if (node.val === y) foundY = true
      if (node.left != null && node.right != null) {
        if (
          (node.left.val === x && node.right.val === y) ||
          (node.left.val === y && node.right.val === x)
        ) {
          return false
        }
      }
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    if (foundX && foundY) return true
    if (foundX || foundY) return false
  }
  return false
}
// var isCousins = function (root, x, y) {
//   // dfs
//   let xParent = null
//   let yParent = null
//   let xDepth = -1
//   let yDepth = -1
//   const dfs = (root, depth, parent) => {
//     if (root == null) return
//     if (root.val === x) {
//       xParent = parent
//       xDepth = depth
//     } else if (root.val === y) {
//       yParent = parent
//       yDepth = depth
//     }
//     dfs(root.left, depth + 1, root)
//     dfs(root.right, depth + 1, root)
//   }

//   dfs(root, 0, null)
//   return xDepth === yDepth && xParent !== yParent
// }
// @lc code=end
