/*
 * @lc app=leetcode.cn id=863 lang=javascript
 *
 * [863] 二叉树中所有距离为 K 的结点
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
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  // dfs + 哈希
  // https://leetcode.cn/problems/all-nodes-distance-k-in-binary-tree/solutions/900027/er-cha-shu-zhong-suo-you-ju-chi-wei-k-de-qbla/
  // 从 target 节点开始用深度优先遍历，寻找于target距离为k的所有节点（三个方向，父，左，右），
  // 由于输入的二叉树没有记录父节点，为此，我们从根结点 root 出发，使用深度优先搜索遍历整棵树，
  // 同时用一个哈希表记录每个结点的父结点。
  // 然后从 target 出发，使用深度优先搜索遍历整棵树，除了搜索左右儿子外，
  // 还可以顺着父结点向上搜索。
  // 为避免在深度优先搜索时重复访问结点，递归时额外传入来源结点 from，
  // 在递归前比较目标结点是否与来源结点相同，不同的情况下才进行递归。
  const parents = new Map()
  const ans = []
  function findParents(node) {
    if (!node) return
    if (node.left) {
      parents.set(node.left.val, node)
      findParents(node.left)
    }
    if (node.right) {
      parents.set(node.right.val, node)
      findParents(node.right)
    }
  }
  function findAns(node, from, depth) {
    if (!node) return
    if (depth === k) {
      ans.push(node.val)
      return
    }
    if (node.left !== from) {
      findAns(node.left, node, depth + 1)
    }
    if (node.right !== from) {
      findAns(node.right, node, depth + 1)
    }
    const parent = parents.get(node.val)
    if (parent !== from) {
      findAns(parent, node, depth + 1)
    }
  }

  findParents(root)
  findAns(target, null, 0)
  return ans
}
// @lc code=end
