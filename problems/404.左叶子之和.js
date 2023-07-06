/*
 * @lc app=leetcode.cn id=404 lang=javascript
 *
 * [404] 左叶子之和
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
 * @return {number}
 */
// var sumOfLeftLeaves = function (root) {
//   return dfs(root)
// }

// function dfs(node) {
//   if (!node) return 0
//   let ans = 0
//   if (node.left) {
//     ans += isLeafNode(node.left) ? node.left.val : dfs(node.left)
//   }
//   if (node.right && !isLeafNode(node.right)) {
//     ans += dfs(node.right)
//   }
//   return ans
// }

// var sumOfLeftLeaves = function (root) {
//   // bfs
//   let ans = 0
//   if (!root) return ans
//   const queue = [root]
//   while (queue.length) {
//     const node = queue.shift()
//     if (node.left) {
//       if (isLeafNode(node.left)) {
//         ans += node.left.val
//       } else {
//         queue.push(node.left)
//       }
//     }
//     if (node.right && !isLeafNode(node.right)) {
//       queue.push(node.right)
//     }
//   }
//   return ans
// }

// function isLeafNode(node) {
//   return node.left == null && node.right == null
// }

function sumOfLeftLeaves(root, isLeft = false) {
  if (!root) return 0
  if (!root.left && !root.right) return isLeft ? root.val : 0
  return sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right, false)
}
// @lc code=end
