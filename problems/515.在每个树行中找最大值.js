/*
 * @lc app=leetcode.cn id=515 lang=javascript
 *
 * [515] 在每个树行中找最大值
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
 * @return {number[]}
 */
var largestValues = function (root) {
  // bfs
  // time complexity O(n)
  // space complexity O(n): 队列的最大空间为O(n)
  const res = []
  if (!root) return res
  const queue = [root]
  while (queue.length) {
    let curMax = Number.MIN_SAFE_INTEGER
    for (let i = queue.length; i > 0; i--) {
      const node = queue.shift()
      if (node.val > curMax) {
        curMax = node.val
      }
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(curMax)
  }
  return res
}
// var largestValues = function (root) {
//   // dfs 
//   // time complexity O(n)
//   // space complexity O(n)
//   const res = []
//   dfs(root, 0)
//   return res
//   function dfs(node, level) {
//     if (!node) return
//     if (res[level] === undefined || node.val > res[level]) {
//       res[level] = node.val
//     }
//     dfs(node.left, level + 1)
//     dfs(node.right, level + 1)
//   }
// }
// @lc code=end
const assert = require('node:assert').strict

const res1 = largestValues({
  val: 1,
  left: {
    val: 3,
    left: {
      val: 5,
    },
    right: {
      val: 3,
    },
  },
  right: {
    val: 2,
    right: {
      val: 9,
    },
  },
})
assert.deepEqual(res1, [1, 3, 9])
