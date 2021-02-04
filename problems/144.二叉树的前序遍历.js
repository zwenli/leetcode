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
  // morris 前序遍历
  // 时间复杂度O(n): 其中 nn 是二叉树的节点数。没有左子树的节点只被访问一次，有左子树的节点被访问两次。
  // 空间复杂度O(1): 只需额外的指针

  const res = [];
  if (!root) return res;
  let node = root;
  let predecessor = null; // 左子树中序遍历下的前驱节点，也就是最右的节点
  while (node) {
    if (node.left) {
      // 如果当前节点的左子节点不为空，找出左子树的前驱节点
      predecessor = node.left;
      while (predecessor.right && predecessor.right !== node) {
        predecessor = predecessor.right;
      }
      if (!predecessor.right) {
        // 如果前驱节点的右子节点为空，将右子节点更新为当前节点
        // 然后将当前节点加入答案，继续遍历左子节点
        predecessor.right = node;
        res.push(node.val);
        node = node.left;
        continue;
      } else {
        // 如果前驱节点的右子节点不为空，说明左子树已遍历完成
        // 需要将右节点重新设置为空，继续遍历当前节点的右子节点
        predecessor.right = null;
      }
    } else {
      // 如果当前节点的左子节点为空，直接将当前节点加入答案，继续遍历右子节点
      res.push(node.val);
    }
    node = node.right;
  }
  return res;
}

// function preorderTraversal(root) {
//   // 迭代，实现三
//   // 其实三种实现都差不多，重点也是显示维护的递归调用栈
//   // stack的是先进后出，所以看起来是右节点先入栈，左节点后入栈，相反的
//   // 实际就是左先出栈，右后出栈，符合根左右的遍历顺序
//   const res = [];
//   const stack = [];
//   let node = root;
//   while (node || stack.length) {
//     while (node) {
//       res.push(node.val);
//       if (node.right) {
//         stack.push(node.right);
//       }
//       node = node.left;
//     }
//     node = stack.pop();
//   }
//   return res;
// }

// function preorderTraversal(root) {
//   // 迭代 实现一
//   // 迭代代的方式实现等价于递归，
//   // 区别在于递归的时候隐式地维护了一个栈，而我们在迭代的时候需要显式地将这个栈模拟出来

//   const res = [];
//   const stack = [];
//   let node = root;
//   while (stack.length || node) {
//     while (node) {
//       res.push(node.val);
//       // 压入当前节点，继续遍历左节点（因为当前节点还需要遍历右节点，保存起来用）
//       stack.push(node);
//       node = node.left;
//     }
//     // 这里已说明左节点完成遍历，返回堆栈的顶部节点接着右节点遍历（遍历右节点时，说明节点已遍历完成，不需要再存在堆栈）
//     node = stack.pop();
//     node = node.right;
//   }
//   return res;
// }

// @lc code=end

// function preorderTraversal(root) {
//   // 迭代， 实现二
//   const res = [];
//   const stack = [];
//   if (root) {
//     stack.push(root);
//   }
//   while (stack.length) {
//     const treeNode = stack.pop();
//     res.push(treeNode.val);
//     // 顺序上看起来和递归的不一样，
//     // 其实stack为堆，先进先出，为了保证左节点先遍历，需要先把右节点压入栈再压左节点
//     if (treeNode.right) {
//       stack.push(treeNode.right);
//     }
//     if (treeNode.left) {
//       stack.push(treeNode.left);
//     }
//   }
//   return res;
// }

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
