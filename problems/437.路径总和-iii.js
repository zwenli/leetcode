/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function pathSum(root, targetSum) {
  const prefix = new Map()
  prefix.set(0, 1)
  return dfs(root, prefix, 0, targetSum)
};

function dfs(root, prefix, curr, targetSum) {
  if (root === null) {
    return 0
  }

  let ret = 0
  curr += root.val
  
  ret = prefix.get(curr - targetSum) || 0
  prefix.set(curr, (prefix.get(curr) || 0) + 1)
  ret += dfs(root.left, prefix, curr, targetSum)
  ret += dfs(root.right, prefix, curr, targetSum)
  prefix.set(curr, (prefix.get(curr) || 0) - 1)
  return ret
}
// @lc code=end
