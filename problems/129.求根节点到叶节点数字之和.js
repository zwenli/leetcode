/*
 * @lc app=leetcode.cn id=129 lang=javascript
 *
 * [129] 求根节点到叶节点数字之和
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
var sumNumbers = function (root) {
  // 广度优先
  if (!root) return 0
  let sum = 0
  const nodeQueue = [root]
  const numQueue = [root.val]
  while (nodeQueue.length) {
    const node = nodeQueue.shift()
    const num = numQueue.shift()
    const { left, right } = node
    if (!left && !right) {
      sum += num
      continue
    }
    if (left) {
      nodeQueue.push(left)
      numQueue.push(num * 10 + left.val)
    }
    if (right) {
      nodeQueue.push(right)
      numQueue.push(num * 10 + right.val)
    }
  }
  return sum
}
// var sumNumbers = function (root) {
//   // 深度优先
//   // time complexity O(n): 每个节点遍历一次
//   // space complexity O(n): 极端情况下为链表，递归栈空间等于节点数量
//   return dfs(root, 0)
//   function dfs(node, prevSum) {
//     if (!node) return 0
//     const sum = prevSum * 10 + node.val
//     if (!node.left && !node.right) {
//       return sum
//     } else {
//       return dfs(node.left, sum) + dfs(node.right, sum)
//     }
//   }
// }
// var sumNumbers = function (root) {
//   let res = 0
//   dfs(root, 0)
//   return res
//   function dfs(node, sum) {
//     if (!node) return
//     sum = sum * 10 + node.val
//     if (!node.left && !node.right) {
//       res += sum
//       return
//     }
//     node.left && dfs(node.left, sum)
//     node.right && dfs(node.right, sum)
//   }
// }
// @lc code=end
const assert = require('node:assert').strict

const res1 = sumNumbers({
  val: 1,
  left: { val: 2 },
  right: { val: 3 },
})

assert.equal(res1, 25)
