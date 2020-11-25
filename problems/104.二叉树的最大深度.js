/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 */

// TODO

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
 * @return {number}
 */
function maxDepth(root) {
  // 递归，DFS
  // depth = max(l, r) + 1
  // l,r 分别表示左子树、右子树的深度
  // if (!root) return 0;
  // const leftDepth = maxDepth(root.left);
  // const rightDepth = maxDepth(root.right);
  // return Math.max(leftDepth, rightDepth) + 1;
  // 另一种递归，自顶向下的
  let ans = 0;
  calcDepth(root, 0); // 起始根节点，深度为0
  return ans;
  function calcDepth(root, depth) {
    if (!root) {
      // 当前节点不存在，则比较现有深度
      ans = Math.max(ans, depth);
      return;
    }
    // 当前节点存在，继续遍历左节点，右节点，同时深度加1
    calcDepth(root.left, depth + 1);
    calcDepth(root.right, depth + 1);
  }
}
// @lc code=end

// function maxDepth(root) {
//   // 广度优先搜索BFS
//   // 时间复杂度O(n)：n为二叉树的节点数量，每个节点遍历一次
//   // 空间复杂度O(n)：取决于队列中存储的元素数量，最坏情况下会达到O(n)
//   let ans = 0;
//   if (!root) return ans;
//   const queue = [root];

//   while (queue.length) {
//     // 当前层的节点数量
//     let size = queue.length;
//     while (size > 0) {
//       // 遍历当前层的节点
//       const node = queue.shift();
//       if (node.left) {
//         queue.push(node.left);
//       }
//       if (node.right) {
//         queue.push(node.right);
//       }
//       size -= 1;
//     }
//     // 每遍历完一层，深度加一
//     ans += 1;
//   }
//   return ans;
// }

// function maxDepth(root) {
//   // 自顶向下的遍历
//   // 时间复杂度O(n)：n为二叉树的节点数量，每个节点遍历一次
//   // 空间复杂度O(height)：height为二叉树的高度，
//   // 递归需要栈空间，栈空间取决于递归深度，因此空间复杂度等价于二叉树的高度
//   let ans = 0;
//   calcDepth(root, 1);
//   return ans;

//   function calcDepth(node, depth) {
//     if (!node) return;
//     if (!node.left && !node.right) {
//       ans = Math.max(ans, depth);
//     }
//     calcDepth(node.left, depth + 1);
//     calcDepth(node.right, depth + 1);
//   }
// }

// function maxDepth(root) {
//   // 自底向上的递归
//   // depth = max(l, r) + 1，其中l为左子树的深度，r为右子树的深度
//   // 时间复杂度O(n)：n为二叉树的节点数量，每个节点遍历一次
//   // 空间复杂度O(height)：height为二叉树的高度，
//   // 递归需要栈空间，栈空间取决于递归深度，因此空间复杂度等价于二叉树的高度
//   if (!root) return 0;
//   const leftDepth = maxDepth(root.left);
//   const rightDepth = maxDepth(root.right);
//   return Math.max(leftDepth, rightDepth) + 1;
// }

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function makeParams(list) {
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

const res1 = maxDepth(makeParams([3, 9, 20, null, null, 15, 7])); // 3
