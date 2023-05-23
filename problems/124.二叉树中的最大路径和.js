/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
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
var maxPathSum = function(root) {
  let maxSum = -Infinity
  maxGain(root)
  return maxSum
  
  // 用于计算二叉树中的一个节点的最大贡献值
  // 具体而言，就是在以该节点为根节点的子树中寻找以该节点为起点的一条路径，使得该路径上的节点值之和最大。
  function maxGain(node) {
    // 空节点的最大贡献值等于 0
    if (!node) return 0
    
    // 递归计算左右子节点的最大贡献值
    // 只有在最大贡献值大于 0 时，才会选取对应子节点
    const leftGain = Math.max(maxGain(node.left), 0)
    const rightGain = Math.max(maxGain(node.right), 0)
    
    // 节点的最大路径和取决于该节点的值与该节点的左右子节点的最大贡献值
    maxSum = Math.max(maxSum, node.val + leftGain + rightGain)
    
    // 返回节点的最大贡献值
    // 非空节点的最大贡献值等于节点值与其子节点中的最大贡献值之和。
    return node.val + Math.max(leftGain, rightGain)
  }
};
// @lc code=end
