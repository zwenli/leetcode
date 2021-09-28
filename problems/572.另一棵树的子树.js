/*
 * @lc app=leetcode.cn id=572 lang=javascript
 *
 * [572] 另一棵树的子树
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
function isSubtree(root, subRoot) {
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (isEqual(node, subRoot)) {
      return true;
    }
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return false;
  function isEqual(node1, node2) {
    if (!node1 && !node2) {
      return true;
    }
    if (!node1 || !node2) {
      return false;
    }
    if (node1.val !== node2.val) {
      return false;
    }
    return isEqual(node1.left, node2.left)
      && isEqual(node1.right, node2.right);
  }
}
// @lc code=end
