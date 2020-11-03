/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
function postorderTraversal(root) {
  // 迭代
  // 时间复杂度O(n): 每个节点遍历一次，n为节点数量
  // 空间复杂度O(n): 平均情况下为O(logn)，极端情况下二叉树呈链状，为O(n)
  const res = [];
  const stack = [];
  let prev = null;
  if (!root) return res;
  while (stack.length || root) {
    while (root) { // 遍历左子树
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (root.right === null || root.right === prev) { // 没有右孩子，或右子树已遍历
      res.push(root.val);
      prev = root;
      root = null;
    } else {
      stack.push(root);
      root = root.right;
    }
  }
  return res;
}

// @lc code=end

// function postorderTraversal(root) {
//   // 递归
//   // 时间复杂度O(n): 每个节点遍历一次，n为节点数量
//   // 空间复杂度O(n): 极端情况下，树为单链表，需要递归n次
//   const res = [];
//   postorder(root, res);
//   return res;
// }
// function postorder(root, res) {
//   if (!root) return;
//   postorder(root.left, res);
//   postorder(root.right, res);
//   res.push(root.val);
// }

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

// function makeParams(list) {
//   // 完全二叉树的构造，
//   if (!list || !list.length) return null;
//   const nodeList = list.map((item) => {
//     if (item == null) return null;
//     return new TreeNode(item);
//   });
//   const n = nodeList.length;
//   for (let i = 0; i < n; i += 1) {
//     const node = nodeList[i];
//     if (node) {
//       node.left = nodeList[2 * i + 1] || null;
//       node.right = nodeList[2 * i + 2] || null;
//     }
//   }
//   return nodeList[0];
// }

// [1,null,2,3]
function params1() {
  const three = new TreeNode(3);
  const two = new TreeNode(2, three);
  const one = new TreeNode(1, null, two);
  return one;
}

const res1 = postorderTraversal(params1());
