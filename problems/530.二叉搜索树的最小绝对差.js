/*
 * @lc app=leetcode.cn id=530 lang=javascript
 *
 * [530] 二叉搜索树的最小绝对差
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
var getMinimumDifference = function (root) {
  // 二叉搜索树有个性质为二叉搜索树中序遍历得到的值序列是递增有序的。
  // 通过遍历出来的值序列，分别求出相邻元素间的差值取最小值。
  let min = Infinity
  let prev = null
  const dfs = (node) => {
    if (!node) return
    if (node.left) dfs(node.left)
    if (prev !== null) {
      min = Math.min(min, node.val - prev)
    }
    prev = node.val
    if (node.right) dfs(node.right)
  }

  dfs(root)
  return min
}
// @lc code=end
