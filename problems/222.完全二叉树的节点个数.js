/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
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
const exits = (root, level, k) => {
  // 判断节点是否存在
  let bits = 1 << (level - 1)
  let node = root
  while (node !== null && bits) {
    if (bits & k) {
      node = node.right
    } else {
      node = node.left
    }
    bits >>= 1
  }
  return node !== null
}
var countNodes = function (root) {
  // 二分查找 + 位运算
  if (root === null) return 0
  let level = 0
  for (let node = root; node.left !== null; node = node.left) {
    level++
  }
  let low = 1 << level
  let high = (1 << (level + 1)) - 1
  while (low < high) {
    const mid = ((high - low + 1) >> 1) + low
    if (exits(root, level, mid)) {
      low = mid
    } else {
      high = mid - 1
    }
  }
  return low
}

// const countLevel = (node) => {
//   // 遍历左子节点计算出层级
//   let level = 0
//   while (node !== null) {
//     level += 1
//     node = node.left
//   }
//   return level
// }
// var countNodes = function (root) {
//   // time O(logn ^ 2): 递归复杂度为O(logn)，每次递归找层数的复杂度为O(logn)
//   // space O(logn): 递归栈的空间
//   if (root === null) return 0
//   const leftLevel = countLevel(root.left)
//   const rightLevel = countLevel(root.right)
//   if (leftLevel === rightLevel) {
//     // 当左子树层级等于右子树层级，说明左子树是满二叉树
//     // 左子树的节点数量为 (1 << leftLevel) - 1, 加上root父节点数量1
//     // 继续递归计算右子树的节点数量
//     return (1 << leftLevel) + countNodes(root.right)
//   } else {
//     // 当左子树层级等于右子树层级，说明此时最后一次不是满的，倒数第二层是满的
//     // 因此右子树是满二叉树
//     // 左子树的节点数量为 (1 << rightLevel) - 1, 加上root父节点数量1
//     // 继续递归计算左子树的节点数量
//     return (1 << rightLevel) + countNodes(root.left)
//   }
// }

// var countNodes = function (root) {
//   // time O(n)
//   let cnt = 0
//   if (!root) return cnt
//   const queue = [root]
//   while (queue.length) {
//     const node = queue.shift()
//     cnt++
//     if (node.left) queue.push(node.left)
//     if (node.right) queue.push(node.right)
//   }
//   return cnt
// }
// @lc code=end
