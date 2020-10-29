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
  // 迭代
  const res = [];
  const stack = [];
  if (root) {
    stack.push(root);
  }
  while (stack.length) {
    const treeNode = stack.pop();
    res.push(treeNode.val);
    // 顺序上看起来和迭代的不一样，
    // 其实stack为堆，先进先出，为了保证左节点先遍历，需要先把右节点压入栈再压左节点
    if (treeNode.right) {
      stack.push(treeNode.right);
    }
    if (treeNode.left) {
      stack.push(treeNode.left);
    }
  }
  return res;
}

// @lc code=end

// function preorderTraversal(root) {
//   // 递归
//   const res = [];
//   preorder(root, res);
//   return res;
// }

// function preorder(node, res) {
//   if (!node) return;
//   res.push(node.val);
//   preorder(node.left, res);
//   preorder(node.right, res);
// }

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
