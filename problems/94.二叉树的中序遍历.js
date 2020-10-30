/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 */
function inorderTraversal(root) {
  // 迭代
  // 时间复杂度O(n)：只会遍历每个节点一次
  // 空间复杂度O(n)：极端情况下二叉树为链表，即栈的最大深度为n
  const res = [];
  if (!root) return res;
  const stack = [];
  let node = root;
  while (stack.length || node) {
    while (node) {
      // 先左节点
      stack.push(node);
      node = node.left;
    }
    // 左节点后操作当前节点
    node = stack.pop();
    res.push(node.val);
    // 遍历右节点
    node = node.right;
  }
  return res;
}

// @lc code=end

// function inorderTraversal(root) {
//   // 递归
//   // 时间复杂度O(n)：只会遍历每个节点一次
//   // 空间复杂度O(n)：极端情况下二叉树为链表，
//   const res = [];
//   inorder(root, res);
//   return res;
// }

// function inorder(node, res) {
//   if (!node) return;
//   inorder(node.left, res);
//   res.push(node.val);
//   inorder(node.right, res);
// }

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function params1() {
  const three = new TreeNode(3);
  const two = new TreeNode(2, three, null);
  const one = new TreeNode(1, null, two);
  return one;
}

const res1 = inorderTraversal(params1());
