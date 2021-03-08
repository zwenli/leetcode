/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */

// function isValidBST(root) {
//   // 3. 递归，区间值判断
//   // 时间复杂度O(n): n为节点数量，每个节点遍历一次
//   // 空间复杂度O(n): 递归调用栈的空间取决于树的深度，极端情况下树为链状，高度为n
//   return helper(root, -Infinity, Infinity);
//   function helper(root, lower, upper) {
//     // 节点为空，为BST
//     if (!root) return true;
//     if (lower >= root.val || upper <= root.val) {
//       // 如果节点的值不在区间范围内，说明不是BST
//       return false;
//     }
//     // 节点值在区间范围内，递归判断左右子树是否为BST
//     // 判断左子树时，因为左子树里所有节点的值均小于根节点的值，所以需要把上界upper改为root.val;
//     // 同理判断右子树时，因为右子树里所有节点的值均大于根节点的值，所以需要把下界lower改为root.val
//     return helper(root.left, lower, root.val) && helper(root.right, root.val, upper);
//   }
// }
function isValidBST(root) {
  // 2. 迭代，中序遍历，二叉搜索树中序遍历的结果，必定是单调递增的
  // 所以在递归过程中，记录上一个值和当前值对比，不满足单调递增说明是无效的
  // 时间复杂度O(n): n为节点数量，每个节点遍历一次
  // 空间复杂度O(n): 递归调用栈的空间取决于树的深度，极端情况下树为链状，高度为n
  if (!root) return true;
  let prev = -Infinity;
  const stack = [];
  let node = root;
  while (stack.length || node) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    // 如果中序遍历得到的节点的值小于等于前一个 prev，说明不是二叉搜索树
    if (prev >= node.val) return false;
    prev = node.val;
    node = node.right;
  }
  return true;
}
// function isValidBST(root) {
//   // 1. 递归，中序遍历，二叉搜索树中序遍历的结果，必定是单调递增的
//   // 所以在递归过程中，记录上一个值和当前值对比，不满足单调递增说明是无效的
//   // 时间复杂度O(n): n为节点数量，每个节点遍历一次
//   // 空间复杂度O(n): 递归调用栈的空间取决于树的深度，极端情况下树为链状，高度为n
//   let prev = -Infinity;
//   return inorder(root);
//   function inorder(root) {
//     if (!root) return true;
//     const res = inorder(root.left); // 先判断左子树是否有效
//     // 左子树无效，或上一个值不小于当前节点，说明不是有效二叉搜索树
//     if (!res || (res && (prev >= root.val))) {
//       return false;
//     }
//     // 更新上一个值为当前节点
//     prev = root.val;
//     return inorder(root.right); // 继续递归右子数
//     // const l = inorder(root.left);
//     // if (prev >= root.val) return false;
//     // prev = root.val;
//     // return l && inorder(root.right);
//   }
// }
// @lc code=end

const param1 = {
  val: 2,
  left: {
    val: 1,
  },
  right: {
    val: 3,
  },
};

const param2 = {
  val: 5,
  left: {
    val: 1,
  },
  right: {
    val: 4,
    left: {
      val: 3,
    },
    right: {
      val: 6,
    },
  },
};
const res1 = isValidBST(param1); // true
const res2 = isValidBST(param2); // false

// 如果该二叉树的左子树不为空，则左子树上所有节点的值均小于它的根节点的值；
// 若它的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
// 它的左右子树也为二叉搜索树
// 3. 递归，通过区间判断子树中所有节点的值是否都在区间范围内
// 1. 递归中序遍历
// 2. 迭代中序遍历
