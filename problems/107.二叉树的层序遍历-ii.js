/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层序遍历 II
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
 * @return {number[][]}
 */
function levelOrderBottom(root) {
  let ans = []
  if (!root) return ans
  const queue = [root]
  while (queue.length) {
    const level = []
    for (let i = queue.length - 1; i >= 0; i -= 1) {
      const node = queue.shift()
      level.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    ans.unshift(level)
  }
  return ans
}
// @lc code=end
