/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
 */

// @lc code=start
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
function swap(x, y) {
  const temp = x.val
  x.val = y.val
  y.val = temp
}
var recoverTree = function (root) {
  // 中序遍历
  // 中序遍历二叉搜索树会得到一个递增序列
  // 设递增序列a = [1,2,3,4,5,6,7]
  // 假设交换不相邻的两个数字，如2和6，序列变成[1,6,3,4,5,2,7]
  // 显然有两个位置不满足ai < ai+1，这里体现为6>3,5>2，找到这两个位置交换即可
  // 假设交换相邻的两个数字，如2和3，序列变成[1,3,2,4,5,6,7]
  // 只有一个位置不满足ai < ai+1，交换两个位置即可
  // 故，在中序遍历中找到不满足条件的位置：
  // 如果有两个位置不满足，记i<j(ai >ai+1 && aj >aj+1)，此时交换的节点为ai记为x, aj+1记为y
  // 如果只有一个位置不满足，记i，ai为x，ai+1为y
  // 交换x和y
  let x = null
  let y = null
  let prev = null
  let stack = []
  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (prev === null || root.val < prev.val) {
      y = root
      if (x === null) {
        x = prev
      } else {
        break
      }
    }
    prev = root
    root = root.right
  }
  swap(x, y)
}

// @lc code=end
