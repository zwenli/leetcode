/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
  const res = [];
  if (!root) return res;
  let queue = [root];
  let nextQueue = [];
  let levelRes = [];
  while (queue.length || nextQueue.length) {
    while (queue.length) {
      const node = queue.shift();
      levelRes.push(node.val);
      if (node.left) {
        nextQueue.push(node.left);
      }
      if (node.right) {
        nextQueue.push(node.right);
      }
    }
    res.push(levelRes);
    queue = nextQueue;
    nextQueue = [];
    levelRes = [];
  }
  return res;
}
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function makeParams(list) {
  // 完全二叉树的构造，
  if (!list || !list.length) return null;
  const nodeList = list.map((item) => {
    if (item == null) return null;
    return new TreeNode(item);
  });
  const n = nodeList.length;
  for (let i = 0; i < n; i += 1) {
    const node = nodeList[i];
    if (node) {
      node.left = nodeList[2 * i + 1] || null;
      node.right = nodeList[2 * i + 2] || null;
    }
  }
  return nodeList[0];
}

const res1 = levelOrder(makeParams([3, 9, 20, null, null, 15, 7]));
/**
 * [
 *   [3],
 *   [9,20],
 *   [15,7]
 * ]
 */
