/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
function buildTree(inorder, postorder) {
  // 递归
  // 后序遍历，最后一个节点为根节点
  // 中序遍历，根节点左边的为左子树，右边为右子树
  const idxMap = new Map(); // 通过值定位中序遍历数组的下标
  inorder.forEach((val, i) => idxMap.set(val, i));
  let postId = postorder.length - 1; // 从后序遍历的最后一个元素开始

  return helper(0, inorder.length - 1);

  function helper(left, right) {
    // 二叉树不存在
    if (left > right) {
      return null;
    }

    const rootVal = postorder[postId];
    const root = new TreeNode(rootVal);
    const index = idxMap.get(rootVal);
    postId -= 1;
    // 注意顺序，是先构建右子树，再左子树
    // 遍历右子树
    root.right = helper(index + 1, right);
    // 遍历左子树
    root.left = helper(left, index - 1);
    return root;
  }
}
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

const res1 = buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]);
