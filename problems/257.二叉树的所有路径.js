/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
 */
// var binaryTreePaths = function (root) {
//   // bfs
//   const paths = []
//   if (!root) return path
//   const queue = [root]
//   const pQueue = ['' + root.val]
//   while (queue.length) {
//     const node = queue.shift()
//     const path = pQueue.shift()
//     if (!node.left && !node.right) {
//       paths.push(path)
//       continue
//     }
//     if (node.left) {
//       queue.push(node.left)
//       pQueue.push(path + '->' + node.left.val)
//     }
//     if (node.right) {
//       queue.push(node.right)
//       pQueue.push(path + '->' + node.right.val)
//     }
//   }
//   return paths
// }
var binaryTreePaths = function (root) {
  // dfs
  const paths = []
  dfs(root, '')
  return paths
  function dfs(root, path) {
    if (!root) return
    path += root.val
    if (!root.left && !root.right) {
      paths.push(path)
    } else {
      path += '->'
      dfs(root.left, path)
      dfs(root.right, path)
    }
  }
}
// var binaryTreePaths = function (root) {
//   const paths = []
//   if (!root) return paths
//   dfs(root, [])
//   return paths
//   function dfs(node, path) {
//     path.push(node.val)
//     if (!node.left && !node.right) {
//       paths.push(path.join('->'))
//       return
//     }
//     if (node.left) dfs(node.left, [...path])
//     if (node.right) dfs(node.right, [...path])
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = binaryTreePaths({
  val: 1,
  left: {
    val: 2,
    right: {
      val: 5,
    },
  },
  right: {
    val: 3,
  },
})
assert.deepEqual(res1.sort(), ['1->2->5', '1->3'].sort())
