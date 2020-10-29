/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
function preorderTraversal(root) {
  const res = [];
  preorder(root, res);
  return res;
}

function preorder(node, res) {
  if (!node) return;
  res.push(node.val);
  preorder(node.left, res);
  preorder(node.right, res);
}
// @lc code=end

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

// [1, null, 2, 3]
function params1() {
  const three = new TreeNode(3);
  const two = new TreeNode(2, three, null);
  const one = new TreeNode(1, null, two);
  return one;
}

const res1 = preorderTraversal(params1()); // [1,2,3]
