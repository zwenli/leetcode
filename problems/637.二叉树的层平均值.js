/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
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
var averageOfLevels = function (root) {
  const res = []
  if (!root) return res

  const stack = [root]
  while (stack.length) {
    const n = stack.length
    let sum = 0
    for (let i = 0; i < n; i++) {
      const node = stack.shift()
      sum += node.val
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)
    }
    res.push(sum / n)
  }

  return res
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = averageOfLevels({
  val: 3,
  left: {
    val: 9,
  },
  right: {
    val: 20,
    left: { val: 15 },
    right: { val: 7 },
  },
})

assert.deepEqual(res1, [3, 14.5, 11])
