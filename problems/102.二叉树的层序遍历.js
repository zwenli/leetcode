/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
 * @param {TreeNode} root
 * @return {number[][]}
 */

function levelOrder(root) {
  // bfs
  // 时间复杂度O(n): 每个节点遍历一次
  // 空间复杂度O(n): 递归调用栈的空间等于树的深度，极端情况下为单链，深度为O(n)
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const level = [];
    for (let i = queue.length - 1; i >= 0; i -= 1) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// function levelOrder(root) {
//   // dfs
//   // 时间复杂度O(n): 每个节点遍历一次
//   // 空间复杂度O(n): 递归调用栈的空间等于树的深度，极端情况下为单链，深度为O(n)
//   const result = [];
//   dfs(root, 0);
//   return result;

//   function dfs(root, level) {
//     if (!root) return;
//     if (!result[level]) result[level] = [];
//     result[level].push(root.val);
//     dfs(root.left, level + 1);
//     dfs(root.right, level + 1);
//   }
// }

// @lc code=end
// function levelOrder(root) {
//   const res = [];
//   if (!root) return res;
//   let queue = [root];
//   let nextQueue = [];
//   let levelRes = [];
//   while (queue.length || nextQueue.length) {
//     while (queue.length) {
//       const node = queue.shift();
//       levelRes.push(node.val);
//       if (node.left) {
//         nextQueue.push(node.left);
//       }
//       if (node.right) {
//         nextQueue.push(node.right);
//       }
//     }
//     res.push(levelRes);
//     queue = nextQueue;
//     nextQueue = [];
//     levelRes = [];
//   }
//   return res;
// }

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function makeParams(list) {
  // 完全二叉树的构造，
  if (!list || !list.length) return null;
  const nodeList = list.map((item) => {
    if (item == null) return null;
    return new TreeNode(item);
  });
  const n = nodeList.length;
  for (let i = 0; i < n; i += 1) {
    const node = nodeList[i];
    if (node) {
      node.left = nodeList[2 * i + 1] || null;
      node.right = nodeList[2 * i + 2] || null;
    }
  }
  return nodeList[0];
}

const res1 = levelOrder(makeParams([3, 9, 20, null, null, 15, 7]));
/**
 * [
 *   [3],
 *   [9,20],
 *   [15,7]
 * ]
 */
