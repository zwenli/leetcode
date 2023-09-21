/*
 * @lc app=leetcode.cn id=449 lang=javascript
 *
 * [449] 序列化和反序列化二叉搜索树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 给定一棵二叉树的「先序遍历」和「中序遍历」可以恢复这颗二叉树。
// 给定一棵二叉树的「后序遍历」和「中序遍历」也可以恢复这颗二叉树。
// 而对于二叉搜索树，给定「先序遍历」或者「后序遍历」，
// 对其经过排序即可得到「中序遍历」。因此，
// 仅对二叉搜索树做「先序遍历」或者「后序遍历」，即可达到序列化和反序列化的要求。

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const list = []
  const postorder = (node) => {
    if (!node) return
    postorder(node.left)
    postorder(node.right)
    list.push(node.val)
  }
  postorder(root)
  return list.join(',')
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (!data.length) return null
  // 后序遍历得到的数组中，根节点位于数组末尾，左子树的节点均小于根节点的值
  // 右子树的节点均大雨根节点的值
  const stack = data.split(',').map(Number)

  const construct = (lower, upper, stack) => {
    if (stack.length === 0) return null
    const val = stack[stack.length - 1]
    if (val < lower || val > upper) return null
    const root = new TreeNode(val)
    stack.pop()
    // 递归顺序和后序遍历反过来
    root.right = construct(val, upper, stack)
    root.left = construct(lower, val, stack)
    return root
  }

  return construct(-Infinity, Infinity, stack)
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

const { TreeNode } = require('../utils/tree')
const assert = require('node:assert').strict
