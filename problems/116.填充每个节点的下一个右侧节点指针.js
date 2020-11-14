/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

// TODO: 递归等其他解题思路

/**
 * @param {Node} root
 * @return {Node}
 */
function connect(root) {
  // 层次遍历，只用一个队列完成
  // 时间复杂度O(n): n为节点数目
  // 空间复杂度O(n): 这是一颗完美二叉树，它的最后一层级的节点数为n/2，
  // 广度优先的空间复杂度取决于上一层的最大元素数量。这种情况下空间复杂度为O(n)
  if (!root) return root;
  const queue = [root]; // 存放当前层节点的队列
  while (queue.length) {
    // 记录当前层次的节点数
    const size = queue.length;
    for (let i = 0; i < size; i += 1) {
      // 从队首取出节点
      const node = queue.shift();
      // 连接
      if (i < size - 1) {
        [node.next] = queue;
      }
      // 下一层节点处理
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return root;
}
// @lc code=end

// function connect(root) {
//   // 层次遍历
//   // 时间复杂度O(n): n为节点数目
//   // 空间复杂度O(n): 这是一颗完美二叉树，它的最后一层级的节点数为n/2，
//   // 广度优先的空间复杂度取决于上一层的最大元素数量。这种情况下空间复杂度为O(n)
//   if (!root) return root;
//   let queue = [root]; // 存放当前层节点的队列
//   let nextQueue = []; // 下一层节点的队列
//   let pre = null; // 上一个节点的指针
//   while (queue.length || nextQueue.length) {
//     while (queue.length) {
//       const node = queue.shift();
//       if (node.left) {
//         nextQueue.push(node.left);
//       }
//       if (node.right) {
//         nextQueue.push(node.right);
//       }
//       if (pre) pre.next = node;
//       pre = node;
//     }
//     [queue, nextQueue] = [nextQueue, []];
//     pre = null;
//   }
//   return root;
// }

function Node(val, left, right, next) {
  this.val = val === undefined ? null : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
  this.next = next === undefined ? null : next;
}

function makeParams(list) {
  // 完全二叉树的构造，
  if (!list || !list.length) return null;
  const nodeList = list.map((item) => {
    if (item == null) return null;
    return new Node(item);
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

const res1 = connect(makeParams([1, 2, 3, 4, 5, 6, 7]));
