/*
 * @lc app=leetcode.cn id=538 lang=javascript
 *
 * [538] 把二叉搜索树转换为累加树
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
 * @return {TreeNode}
 */
var convertBST = function (root) {
  let cur = 0
  function dfs(root) {
    if (!root) return
    dfs(root.right)
    root.val += cur
    cur = root.val
    dfs(root.left)
  }
  dfs(root)
  return root
}
// @lc code=end

const assert = require('node:assert/strict')
const { buildTree, TreeNode } = require('../utils/tree')

const res1 = convertBST(
  buildTree([4, 1, 6, 0, 2, 5, 7, null, null, null, 3, null, null, null, 8])
)

assert.deepEqual(
  res1,
  buildTree([
    30,
    36,
    21,
    36,
    35,
    26,
    15,
    null,
    null,
    null,
    33,
    null,
    null,
    null,
    8,
  ])
)
