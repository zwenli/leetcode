/*
 * @lc app=leetcode.cn id=513 lang=javascript
 *
 * [513] 找树左下角的值
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
var findBottomLeftValue = function (root) {
  // bfs，从右到左遍历，这样能保证最后一个节点就是最底层 最左边的节点
  let res
  if (!root) return res
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    if (node.right) queue.push(node.right)
    if (node.left) queue.push(node.left)
    res = node.val
  }
  return res
}
// var findBottomLeftValue = function (root) {
//   // bfs
//   let res
//   if (!root) return res
//   const queue = [root]
//   while (queue.length) {
//     for (let i = 0, l = queue.length; i < l; i++) {
//       const node = queue.shift()
//       if (i === 0) res = node.val
//       if (node.left) queue.push(node.left)
//       if (node.right) queue.push(node.right)
//     }
//   }
//   return res
// }
// var findBottomLeftValue = function (root) {
//   // dfs
//   // time complexity O(n): n为树的节点数量
//   // space complexit O(n): 极端情况下，树为链表形式
//   let maxLevel = -1
//   let res
//   dfs(root, 0)
//   return res
//   function dfs(node, curLevel) {
//     if (!node.left && !node.right && curLevel > maxLevel) {
//       maxLevel = curLevel
//       res = node.val
//       return
//     }
//     if (node.left) dfs(node.left, curLevel + 1)
//     if (node.right) dfs(node.right, curLevel + 1)
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = findBottomLeftValue({
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
    },
  },
  right: {
    val: 3,
    left: {
      val: 5,
      left: {
        val: 7,
      },
    },
    right: {
      val: 6,
    },
  },
})
assert.equal(res1, 7)

const res2 = findBottomLeftValue({
  val: 0,
  right: {
    val: -1,
  },
})
assert.equal(res2, -1)
