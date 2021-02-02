/* eslint-disable no-param-reassign */
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
// function inorderTraversal(root) {
//   /**
//    * Morris 中序遍历
//    * 时间复杂度O(n): Morris遍历中每个节点都会访问两次，O(2n) = O(n)
//    * 空间复杂度O(1)
//    * 具体算法：
//    * 设当前节点为x
//    * 1. 如果x无左孩子，先将x的值放入答案数组，再访问x的右孩子，即x = x.right
//    * 2. 如果x有左孩子，则先找到x左子树上最右的节点predecessor
//    *    2.1 如果predecessor右孩子为空，则将其右孩子指向x，然后访问x的左孩子，即 x = x.left
//    *    2.2 如果predecessor右孩子不为空，则此时其右孩子指向x，说明已遍历完x的左子树，
//    *        将predecessor右孩子只为空，将x的值放入答案数组，然后访问x的右孩子，即 x = x.right
//    */

//   const res = [];
//   // predecessor定义为左子树中序遍历的最后一个节点， 即root节点在中序遍历的前驱节点
//   let predecessor = null;

//   while (root) {
//     if (root.left) {
//       // predecessor 节点就是当前 root 节点向左走一步，然后一直向右走至无法走为止
//       predecessor = root.left;
//       while (predecessor.right && predecessor.right !== root) {
//         predecessor = predecessor.right;
//       }
//       if (!predecessor.right) {
//         // predecessor右指针指向x，继续遍历左子树
//         predecessor.right = root;
//         root = root.left;
//       } else {
//         // 说明左子树已访问完，需要断开连接
//         res.push(root.val);
//         predecessor.right = null;
//         root = root.right;
//       }
//     } else {
//       // 如果没有左孩子，直接访问右孩子
//       res.push(root.val);
//       root = root.right;
//     }
//   }
//   return res;
// }

// @lc code=end

function inorderTraversal(root) {
  // 迭代 等价递归，显式维护递归栈
  // 时间复杂度O(n)：只会遍历每个节点一次
  // 空间复杂度O(n)：极端情况下二叉树为链表，即栈的最大深度为n
  const res = [];
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

function params2() {
  const six = new TreeNode(6);
  const five = new TreeNode(5);
  const four = new TreeNode(4);
  const three = new TreeNode(3, six, null);
  const two = new TreeNode(2, four, five);
  const one = new TreeNode(1, two, three);
  return one;
}

const res1 = inorderTraversal(params1()); // [1,3,2]
const res2 = inorderTraversal(params2()); // [4,2,5,1,6,3]
