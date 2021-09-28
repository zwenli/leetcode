/*
 * @lc app=leetcode.cn id=559 lang=javascript
 *
 * [559] N 叉树的最大深度
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */

function maxDepth(root) {
  let depth = 0
  if (!root) return depth;
  const queue = [root];
  while (queue.length) {
    depth += 1;
    for (let i = queue.length - 1; i >= 0; i -= 1) {
      const node = queue.shift();
      if (node.children && node.children.length) {
        queue.push(...node.children);
      }
    }
  }
  return depth;
}
// @lc code=end
