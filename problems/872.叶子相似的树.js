/*
 * @lc app=leetcode.cn id=872 lang=javascript
 *
 * [872] 叶子相似的树
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
function leafSimilar(root1, root2) {
  const leaves1 = getLeaves(root1)
  const leaves2 = getLeaves(root2)
  return leaves1.toString() === leaves2.toString()
}

function getLeaves(root) {
  const leaves = []
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node.left && !node.right) {
      leaves.push(node.val)
      continue
    }
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return leaves
}
// @lc code=end
