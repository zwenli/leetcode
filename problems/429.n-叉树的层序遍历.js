/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
// function levelOrder(root) {
//   // BFS, 对下面的优化
//   // 时间复杂度O(n): n为N叉树的节点数量，每个节点遍历一次
//   // 空间复杂度O(n): 极端情况下N叉树只有两层，所有子节点都是根节点的孩子，
//   // 根节点出队列后，所有子节点都要进队列，空间为O(n-1)
//   if (!root) return [];
//   const res = [];
//   const queue = [root];
//   while (queue.length) {
//     const size = queue.length;
//     const level = [];
//     for (let i = 0; i < size; i += 1) {
//       const node = queue.shift();
//       level.push(node.val);
//       if (node.children && node.children.length) {
//         queue.push(...node.children);
//       }
//     }
//     res.push(level);
//   }
//   return res;
// }

// function levelOrder(root) {
//   // 迭代,BFS
//   // 时间复杂度O(n): n为N叉树的节点数量，每个节点遍历一次
//   // 空间复杂度O(n): 极端情况下N叉树只有两层，所有子节点都是根节点的孩子，
//   // 根节点出队列后，所有子节点都要进队列，空间为O(n-1)
//   if (!root) return [];
//   const res = [];
//   const queue = [root];
//   let level = 0;
//   while (queue.length) {
//     const size = queue.length;
//     for (let i = 0; i < size; i += 1) {
//       const node = queue.shift();
//       if (!res[level]) res[level] = [];
//       res[level].push(node.val);
//       if (node.children && node.children.length) {
//         const n = node.children.length;
//         for (let j = 0; j < n; j += 1) {
//           queue.push(node.children[j]);
//         }
//       }
//     }
//     level += 1;
//   }
//   return res;
// }

function levelOrder(root) {
  // 递归, DFS
  // 时间复杂度O(n): n为N叉树的节点数量，每个节点遍历一次
  // 空间复杂度O(n): 平均情况下，递归调用栈的深度为O(logn)，极端情况下为链状O(n)
  const res = [];
  traverseNode(root, 0, res);
  return res;

  function traverseNode(root, index, res) {
    if (!root) return;
    if (!res[index]) res[index] = [];
    res[index].push(root.val);
    if (root.children && root.children.length) {
      const n = root.children.length;
      for (let i = 0; i < n; i += 1) {
        traverseNode(root.children[i], index + 1);
      }
    }
  }
}
// @lc code=end

const param1 = {
  val: 1,
  children: [
    {
      val: 3,
      children: [
        {
          val: 5,
          children: null,
        },
        {
          val: 6,
          children: null,
        },
      ],
    },
    {
      val: 2,
      children: null,
    },
    {
      val: 4,
      children: null,
    },
  ],
};

const res1 = levelOrder(param1); // [[1], [3,2,4], [5,6]]

// 迭代
// 递归
