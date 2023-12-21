/*
 * @lc app=leetcode.cn id=865 lang=javascript
 *
 * [865] 具有所有最深节点的最小子树
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
var subtreeWithAllDeepest = function (root) {
  let deepest = 0
  let lca = null

  function dfs(node, depth) {
    deepest = Math.max(deepest, depth)
    if (node === null) {
      return depth
    }
    const left = dfs(node.left, depth + 1)
    const right = dfs(node.right, depth + 1)
    if (left === deepest && right === deepest) {
      lca = node
    }
    return Math.max(left, right)
  }
  dfs(root, 0)
  return lca
}
// @lc code=end
