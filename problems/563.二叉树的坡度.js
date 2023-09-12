/*
 * @lc app=leetcode.cn id=563 lang=javascript
 *
 * [563] 二叉树的坡度
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
var findTilt = function (root) {
  let sum = 0
  dfs(root)
  return sum
  function dfs(root) {
    if (!root) return 0
    const left = dfs(root.left)
    const right = dfs(root.right)
    sum += Math.abs(left - right)
    return root.val + left + right
  }
}
// @lc code=end

const assert = require('node:assert/strict')
const { buildTree } = require('../utils/tree')

const res1 = findTilt(buildTree([4, 2, 9, 3, 5, null, 7]))
assert.equal(res1, 15)

const res2 = findTilt(buildTree([1, 2, 3]))
assert.equal(res2, 1)
