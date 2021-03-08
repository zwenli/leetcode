/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */

// function invertTree(root) {
//   // 3.迭代，栈，方法1的显式实现
//   // 时间复杂度O(n): n为二叉树的节点数量
//   // 空间复杂度O(logn): 树的深度
//   if (!root) return root;
//   const stack = [root];
//   while (stack.length) {
//     const node = stack.pop();
//     const temp = node.left;
//     node.left = node.right;
//     node.right = temp;
//     if (node.right) stack.push(node.right);
//     if (node.left) stack.push(node.left);
//   }
//   return root;
// }
// function invertTree(root) {
//   // 2.层序遍历bfs
//   // 时间复杂度O(n): n为二叉树的节点数量
//   // 空间复杂度O(n): 当只有两层时，队列的空间为O(n-1)
//   if (!root) return root;
//   const queue = [root];
//   while (queue.length) {
//     const node = queue.shift();
//     const temp = node.left;
//     node.left = node.right;
//     node.right = temp;
//     if (node.left) queue.push(node.left);
//     if (node.right) queue.push(node.right);
//   }
//   return root;
// }
function invertTree(root) {
  // 1.递归，如果当前节点存在，左右子树互换，再递归左右子树
  // 时间复杂度O(n): n为二叉树的节点数量
  // 空间复杂度O(n): 取决于调用递归栈的深度，极端情况下为单链状，树的深度等于n
  if (root) {
    // 先序遍历
    [root.left = null, root.right = null] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
    // 后序遍历
    // const left = invertTree(root.left);
    // const right = invertTree(root.right);
    // root.left = right;
    // root.right = left;
  }
  return root;
}
// @lc code=end

//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
const param1 = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 1,
    },
    right: {
      val: 3,
    },
  },
  right: {
    val: 7,
    left: {
      val: 6,
    },
    right: {
      val: 9,
    },
  },
};
const res1 = invertTree(param1);
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

// 解法
// 1. 递归dfs，如果当前节点存在，左右子树互换，再递归左右子树
// 2. 层序遍历bfs，迭代，需要队列逐层扫描，互换左右节点，在判断左右节点是否为空，不为空的进队列等待处理
// 3. 方法1的显式实现，迭代，栈也是可以实现，思路都是先对当前节点处理，再判断子节点能否进栈，
