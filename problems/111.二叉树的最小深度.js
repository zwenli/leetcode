/* eslint-disable no-restricted-syntax */
/* eslint-disable no-labels */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
 * @return {number}
 */

class QueueNode {
  constructor(node, depth) {
    this.node = node;
    this.depth = depth;
  }
}

// function minDepth(root) {
//   // bfs, 当我们找到一个叶子节点时，直接返回这个叶子节点的深度。
//   // 广度优先搜索的性质保证了最先搜索到的叶子节点的深度一定最小
//   // 时间复杂度O(n): n为节点数量
//   // 空间复杂度O(n): 队列中的元素个数不会超过树的节点数量
//   if (!root) return 0;
//   const queue = [new QueueNode(root, 1)];
//   while (queue.length) {
//     const { node, depth } = queue.shift();
//     if (!node.left && !node.right) return depth;
//     if (node.left) queue.push(new QueueNode(node.left, depth + 1));
//     if (node.right) queue.push(new QueueNode(node.right, depth + 1));
//   }
//   return 0;
// }
function minDepth(root) {
  // dfs
  // 时间复杂度O(n): n为节点数量
  // 空间复杂度O(H): H为树的高度，空间复杂度取决于递归调用栈的开销，
  // 极端情况下，树为链状，空间复杂度为O(n)，平均情况下树的高度和节点数量的对数正相关，
  // 空间复杂度为O(logn)
  // if (!root) return 0; // 节点不存在，深度为0
  // if (!root.left && !root.right) return 1; // 子节点都不存在，最小深度为1
  // // 若子节点不全为空，递归计算子树的深度，取最小值
  // let minD = Infinity;
  // if (root.left) {
  //   minD = Math.min(minDepth(root.left), minD);
  // }
  // if (root.right) {
  //   minD = Math.min(minDepth(root.right), minD);
  // }
  // return minD + 1; // 当前树最小深度等于子树的最小深度 + 1

  // 4行代码解决
  if (!root) return 0;
  const L = minDepth(root.left);
  const R = minDepth(root.right);
  // 如果L，R存在0，左边0，执行右边max，
  // 翻译成人话，两边子树都存在深度，则取最小，否则取最大值。
  return 1 + (Math.min(L, R) || Math.max(L, R));
}

// 这两种是自己实现的，
// function minDepth(root) {
//   // 迭代, 层序遍历
//   if (!root) return 0;
//   let ans = 1;
//   const queue = [root];
//   while (queue.length) {
//     const size = queue.length;
//     for (let i = 0; i < size; i += 1) {
//       const node = queue.shift();
//       if (!node.left && !node.right) return ans;
//       if (node.left) queue.push(node.left);
//       if (node.right) queue.push(node.right);
//     }
//     ans += 1;
//   }
//   return ans;
// }
// function minDepth(root) {
//   // 递归，遇到节点的两边节点为空，才说明是可能的最小深度路径
//   // 时间复杂度O(n): n为节点数量
//   // 空间复杂度O(n): n为节点数量
//   if (!root) return 0;
//   let ans = Infinity;
//   calcDepth(root, 0);
//   return ans;
//   function calcDepth(node, depth) {
//     if (!node.left && !node.right) {
//       ans = Math.min(depth + 1, ans);
//       return;
//     }
//     if (node.left) calcDepth(node.left, depth + 1);
//     if (node.right) calcDepth(node.right, depth + 1);
//   }
// }
// @lc code=end

const params1 = {
  val: 3,
  left: {
    val: 9,
  },
  right: {
    val: 20,
    left: {
      val: 15,
    },
    right: {
      val: 7,
    },
  },
};
const params2 = {
  val: 2,
  right: {
    val: 3,
    right: {
      val: 4,
      right: {
        val: 5,
        right: {
          val: 6,
        },
      },
    },
  },
};
const res1 = minDepth(params1); // 2
const res2 = minDepth(params2); // 5

// 递归
// bfs，队列中遍历中，如果当前节点没有子节点，
// 则说明最小深度的路径就是这个节点了
