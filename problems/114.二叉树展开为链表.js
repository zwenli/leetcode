/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
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
 * @return {void} Do not return anything, modify root in-place instead.
 */

// function flatten(root) {
//   // 后序遍历
//   // time complexity O(n)，n为二叉树的节点数量
//   // space complexity O(logn)
//   let last = null
//   postorder(root);
//   function postorder(node) {
//     if (!node) return;
//     postorder(node.right);
//     postorder(node.left);
//     node.left = null;
//     node.right = last;
//     last = node;
//   }
// }

function flatten(root) {
  /**
  寻找前驱节点
   */
  if (!root) return;
  let curr = root;
  while (curr) {
    if (curr.left) {
      const next = curr.left;
      let predecessor = next;
      while (predecessor.right) {
        predecessor = predecessor.right;
      }
      predecessor.right = curr.right;
      curr.left = null;
      curr.right = next;
    }
    curr = curr.right;
  }
}

// function flatten(root) {
//   /**
//   先序遍历和展开同时进行
//   前面是先序遍历和展开分开两步处理的方式。能不能在没有丢失子节点的信息的情况下，将前序遍历和展开为单链表同时进行？
  
//   之所以会在破坏二叉树的结构之后丢失子节点的信息，是因为在对左子树进行遍历时，没有存储右子节点的信息，在遍历完左子树之后才获得右子节点的信息。
//   只要对前序遍历进行修改，在遍历左子树之前就获得左右子节点的信息，并存入栈内，子节点的信息就不会丢失，就可以将前序遍历和展开为单链表同时进行。
  
//   该做法不适用于递归实现的前序遍历，只适用于迭代实现的前序遍历。修改后的前序遍历的具体做法是，
//   每次从栈内弹出一个节点作为当前访问的节点，获得该节点的子节点，如果子节点不为空，
//   则依次将右子节点和左子节点压入栈内（注意入栈顺序）。
  
//   展开为单链表的做法是，维护上一个访问的节点 prev，每次访问一个节点时，令当前访问的节点为 curr，
//   将 prev 的左子节点设为 null 以及将 prev 的右子节点设为 curr，然后将 curr 赋值给 prev，
//   进入下一个节点的访问，直到遍历结束。需要注意的是，初始时 prev 为 null，
//   只有在 prev 不为 null 时才能对 prev 的左右子节点进行更新。
//    */
//   if (!root) return
//   let prev = null
//   const stack = [root]
//   while (stack.length) {
//     const curr = stack.pop()
//     if (prev) {
//       prev.left = null;
//       prev.right = curr;
//     }
//     if (curr.right) {
//       stack.push(curr.right)
//     }
//     if (curr.left) {
//       stack.push(curr.left)
//     }
//     prev = curr;
//   }
// }

// function flatten(root) {
//   // 前序遍历，迭代
//   // time complexity O(n)，n为二叉树的节点数量
//   // space complexity O(n)
//   const stack = [];
//   const list = [];
//   let node = root;
//   // 先序遍历节点
//   while (node || stack.length) {
//     while (node) {
//       list.push(node);
//       stack.push(node);
//       node = node.left;
//     }
//     node = stack.pop();
//     node = node.right;
//   }
//   // 展开为链表
//   for (let i = 1; i < list.length; i += 1) {
//     const prev = list[i - 1];
//     const curr = list[i];
//     prev.left = null;
//     prev.right = curr;
//   }
// }

// function flatten(root) {
//   // 前序遍历，递归
//   const list = []
//   preorder(root)
//   const size = list.length
//   for (let i = 1; i < size; i += 1) {
//     const prev = list[i - 1]
//     const curr = list[i]
//     prev.left = null
//     prev.right = curr
//   }
//   return root
//   function preorder(node) {
//     if (!node) return
//     list.push(node)
//     preorder(node.left)
//     preorder(node.right)
//   }
// }
// @lc code=end

const assert = require('assert').strict

const param1 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
    },
    right: {
      val: 4,
    },
  },
  right: {
    val: 5,
    right: {
      val: 6,
    },
  },
}

const res1 = flatten(param1)
console.log(res1)

/**
相关题目
144.二叉树的前序遍历
 */
