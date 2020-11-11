/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
  // 递归
  // 前序遍历，第一节点为根节点
  // 中序遍历，根节点左边的为左子树，右边为右子树
  // 时间复杂度O(n): n为节点数量
  // 空间复杂度O(n): 需要O(n)的空间存储哈希表，h为树的高度，递归需要O(h)的栈空间，n>h，所以空间复杂度为O(n)
  const idxMap = new Map(); // 通过值定位中序遍历数组的下标
  inorder.forEach((val, index) => idxMap.set(val, index));
  let preId = 0; // 从前序遍历的第一个元素开始
  return helper(0, inorder.length - 1);

  function helper(left, right) {
    if (left > right) {
      return null;
    }
    const rootVal = preorder[preId];
    const root = new TreeNode(rootVal);

    const index = idxMap.get(root.val);
    preId += 1;
    root.left = helper(left, index - 1);
    root.right = helper(index + 1, right);
    return root;
  }
}
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

const res1 = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
