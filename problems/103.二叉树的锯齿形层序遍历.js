/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
 */

// @lc code=start
// zDefinition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  let ans = []
  if (!root) return ans
  let isOrderLeft = true
  const queue = [root]
  while (queue.length) {
    const level = []
    for (let i = 0, l = queue.length; i < l; i++) {
      const node = queue.shift()
      if (isOrderLeft) {
        level.push(node.val)
      } else {
        level.unshift(node.val)
      }

      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    ans.push(level)
    isOrderLeft = !isOrderLeft
  }
  return ans
}
// @lc code=end
