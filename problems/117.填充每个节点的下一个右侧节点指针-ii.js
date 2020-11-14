/*
 * @lc app=leetcode.cn id=117 lang=javascript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 */

// TODO：其他解题思路待完成

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

/**
 * @param {Node} root
 * @return {Node}
 */
function connect(root) {
  // 层次遍历
  // 时间复杂度O(n): n为节点数量
  // 空间复杂度O(n):
  if (!root) return null;
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i += 1) {
      const node = queue.shift();
      if (i < size - 1) {
        [node.next] = queue;
      }
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

const res1 = connect(makeParams([1, 2, 3, 4, 5, null, 7]));
