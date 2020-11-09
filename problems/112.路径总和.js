/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @param {number} sum
 * @return {boolean}
 */
function hasPathSum(root, sum) {
  // 递归
  // 时间复杂度O(n): 每个节点遍历一次
  // 空间复杂度O(h): 递归需要栈空间，为树的高度，极端情况下，树为单链状O(n)
  if (!root) return false;
  // 叶子节点，判断值是否相等
  if (!root.left && !root.right) {
    return sum === root.val;
  }
  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
}
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function makeParams(list) {
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

const root1 = makeParams([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, null, null, 1]);
const root2 = makeParams([-2, null, -3]);
const res1 = hasPathSum(root1, 22);
const res2 = hasPathSum(root2, -5);
