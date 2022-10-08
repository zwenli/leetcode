/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
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
 * @param {number} targetSum
 * @return {number[][]}
 */
// var pathSum = function (root, targetSum) {
//   // bfs
//   const ans = []
//   const map = new Map()
//   if (root === null) return ans
//   const sumQueue = [0]
//   const nodeQueue = [root]
//   while (nodeQueue.length) {
//     const node = nodeQueue.shift()
//     const sum = sumQueue.shift() + node.val
//     if (!node.left && !node.right && sum === targetSum) {
//       getPath(node)
//     } else {
//       if (node.left) {
//         map.set(node.left, node)
//         nodeQueue.push(node.left)
//         sumQueue.push(sum)
//       }
//       if (node.right) {
//         map.set(node.right, node)
//         nodeQueue.push(node.right)
//         sumQueue.push(sum)
//       }
//     }
//   }
//   return ans

//   function getPath(node) {
//     const path = []
//     while (node) {
//       path.unshift(node.val)
//       node = map.get(node)
//     }
//     ans.push(path)
//   }
// }
var pathSum = function (root, targetSum) {
  // dfs
  // time complexity O(n^2):
  // space complexity O(n): 极端情况下，递归栈的大小等于节点数量，二叉树为链表
  const ans = []
  const path = []
  dfs(root, targetSum)
  function dfs(root, targetSum) {
    if (root === null) return
    targetSum -= root.val
    path.push(root.val)
    if (!root.left && !root.right && targetSum === 0) {
      ans.push([...path])
    }
    dfs(root.left, targetSum)
    dfs(root.right, targetSum)
    path.pop()
  }
  return ans
}
// @lc code=end
