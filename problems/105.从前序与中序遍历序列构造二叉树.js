/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
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

// function buildTree(preorder, inorder) {
//   // 解法2，迭代，算是解法1的显式实现
//   // 前序: [根 [左子树的前序遍历结果] [右子树的前序遍历结果]]
//   // 中序: [[左子树的中序遍历结果] 根 [右子树的中序遍历结果]]
//   // 入栈的必定是满足中序遍历位置在栈顶节点的左边，也就是左孩子
//   // 时间复杂度O(n): n为节点数量，递归时间复杂度O(n)，下标map的时间复杂度为O(n)
//   // 空间复杂度O(n): 栈的存储空间必定是在n以内的
//   if (!preorder || !preorder.length) return null;

//   // 构建中序遍历的下标map
//   const n = inorder.length;
//   const inMap = new Map();
//   for (let i = 0; i < n; i += 1) {
//     inMap.set(inorder[i], i);
//   }

//   // 初始化栈
//   const root = new TreeNode(preorder[0]);
//   const stack = [root];

//   // 遍历前序遍历结果
//   for (let i = 1; i < n; i += 1) {
//     const value = preorder[i];
//     const node = new TreeNode(value);
//     if (inMap.get(value) < inMap.get(stack[stack.length - 1].val)) {
//       // 对中序遍历来说，如果当前节点在栈顶的左边，
//       // 说明是栈顶的左孩子 （结合前序遍历的结果）
//       stack[stack.length - 1].left = node;
//     } else {
//       // 当前节点不在栈顶的左边时，
//       // 说明当前节点是栈顶的右孩子或者是其祖先节点
//       // 出栈直到祖先节点用完，即栈为空
//       // 或者栈顶的节点是在节点右边
//       let parent = null;
//       while (stack.length && (inMap.get(value) > inMap.get(stack[stack.length - 1].val))) {
//         parent = stack.pop();
//       }
//       parent.right = node;
//     }
//     stack.push(node);
//   }
//   return root;
// }

function buildTree(preorder, inorder) {
  if (!inorder.length) return null
  const rootVal = preorder.shift()
  const root = new TreeNode(rootVal)
  const inIdx = inorder.findIndex(e => e === rootVal)
  root.left = buildTree(preorder, inorder.slice(0, inIdx))
  root.right = buildTree(preorder, inorder.slice(inIdx + 1))
  return root
}

// function buildTree(preorder, inorder) {
//   // 对解法1的优化
//   // 前序: [根 [左子树的前序遍历结果] [右子树的前序遍历结果]]
//   // 中序: [[左子树的中序遍历结果] 根 [右子树的中序遍历结果]]
//   // 时间复杂度O(n): n为节点数量，递归时间复杂度O(n)，下标map的时间复杂度为O(n)
//   // 时间复杂度O(n): 极端情况下为链状，
//   const n = inorder.length;
//   const inMap = new Map(); // 中序遍历的下标map
//   for (let i = 0; i < n; i += 1) {
//     inMap.set(inorder[i], i);
//   }
//   return helper(preorder, inMap, 0, n - 1, 0, n - 1);

//   function helper(preorder, inMap, preStart, preEnd, inStart, inEnd) {
//     if (inStart > inEnd || preStart > preEnd) return null; // 越界返回空节点
//     const root = new TreeNode(preorder[preStart]);
//     const inRoot = inMap.get(root.val);
//     const numsLeft = inRoot - inStart;
//     root.left = helper(
//       preorder,
//       inMap,
//       preStart + 1,
//       preStart + numsLeft,
//       inStart,
//       inRoot - 1,
//     );
//     root.right = helper(
//       preorder,
//       inMap,
//       preStart + numsLeft + 1,
//       preEnd,
//       inRoot + 1,
//       inEnd,
//     );
//     return root;
//   }
// }

// function buildTree(preorder, inorder) {
//   // 解法1. 递归，前序遍历和中序遍历的结果如下
//   // 前序: [根 [左子树的前序遍历结果] [右子树的前序遍历结果]]
//   // 中序: [[左子树的中序遍历结果] 根 [右子树的中序遍历结果]]
//   const n = preorder.length;
//   const idxMap = new Map(); // 中序遍历的下标map
//   for (let i = 0; i < n; i += 1) {
//     idxMap.set(inorder[i], i);
//   }
//   return helper(preorder, inorder, 0, n - 1, 0, n - 1);

//   function helper(preorder, inorder, preLeft, preRight, inLeft, inRight) {
//     if (inLeft > inRight) return null; // 越界返回空节点
//     const rootVal = preorder[preLeft]; // 前序遍历的第一个节点就是根节点
//     const root = new TreeNode(rootVal);
//     const idx = idxMap.get(rootVal); // 找出根节点在中序遍历的下标
//     const leftChildNum = idx - inLeft; // 左子树的数量为中序遍历的根下标 - 左边界
//     root.left = helper(
//       preorder,
//       inorder,
//       preLeft + 1, // 前序遍历中根节点的下一个节点就是左子树的左边界
//       preLeft + leftChildNum, // 当前前序遍历左边界加上左子树数量就是左子树的右边界
//       inLeft, // 中序遍历的 左边界不变
//       inLeft + leftChildNum - 1, // 中序遍历的
//     );
//     root.right = helper(
//       preorder,
//       inorder,
//       preLeft + leftChildNum + 1,
//       preRight,
//       idx + 1,
//       inRight,
//     );
//     return root;
//   }
// }

// function buildTree(preorder, inorder) {
//   // 递归
//   // 前序遍历，第一节点为根节点
//   // 中序遍历，根节点左边的为左子树，右边为右子树
//   // 时间复杂度O(n): n为节点数量
//   // 空间复杂度O(n): 需要O(n)的空间存储哈希表，h为树的高度，递归需要O(h)的栈空间，n>h，所以空间复杂度为O(n)
//   const idxMap = new Map(); // 通过值定位中序遍历数组的下标
//   inorder.forEach((val, index) => idxMap.set(val, index));
//   let preId = 0; // 从前序遍历的第一个元素开始
//   return helper(0, inorder.length - 1);

//   function helper(left, right) {
//     if (left > right) {
//       return null;
//     }
//     const rootVal = preorder[preId];
//     const root = new TreeNode(rootVal);

//     const index = idxMap.get(root.val);
//     preId += 1;
//     root.left = helper(left, index - 1);
//     root.right = helper(index + 1, right);
//     return root;
//   }
// }
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

const res1 = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log(res1);
