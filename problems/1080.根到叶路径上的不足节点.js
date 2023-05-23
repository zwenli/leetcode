/*
 * @lc app=leetcode.cn id=1080 lang=javascript
 *
 * [1080] 根到叶路径上的不足节点
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
 * @param {number} limit
 * @return {TreeNode}
 */
function sufficientSubset(root, limit) {
  // 以 node 为根的子树中所有的叶子节点均为「不足节点」，那么 node 节点一定也是「不足节点」，节点需要删除
  // 反之，存在叶子节点不是「不足节点」，那么节点一定也不是「不足节点」，节点需要保留

  const haveSufficient = dfs(root, 0, limit)
  // 检测 root 的叶子节点是否均为「不足节点」，是则返回null
  return haveSufficient ? root : null

  function dfs(node, sum, limit) {
    // 边界情况，节点不存在，当成「不足节点」
    if (!node) return false
    // 累加当前节点之和
    sum += node.val
    if (node.left === null && node.right === null) {
      // 如果左右子节点都不存在，说明是叶子节点
      // 返回是否「不足节点」
      return sum >= limit
    }
    // 依次检查左子树和右子树
    const l = dfs(node.left, sum, limit)
    const r = dfs(node.right, sum, limit)
    // 左子树的叶子节点均为「不足节点」，那么左子节点需要删除
    if (!l) node.left = null
    // 右子树同样处理
    if (!r) node.right = null
    // 返回是否「不足节点」
    return l || r
  }
}
// @lc code=end

const assert = require('node:assert/strict')

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
