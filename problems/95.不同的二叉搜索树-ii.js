/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
 */
// TODO

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
 * @param {number} n
 * @return {TreeNode[]}
 */
function generateTrees(n) {
  // 递归
  if (n === 0) return [];
  return _generateTrees(1, n);
  function _generateTrees(start, end) {
    const allTrees = [];
    if (start > end) {
      // base case,不存在子树
      allTrees.push(null);
      return allTrees;
    }
    // 遍历所行的根节点
    for (let i = start; i <= end; i += 1) {
      // 获取所有可行的左子树集
      const leftTrees = _generateTrees(start, i - 1);
      // 获取所有可行的右子树集
      const rightTrees = _generateTrees(i + 1, end);
      // 从左子树集合中选出一棵左子树，从右子树集合中选出一棵右子树，拼接到根节点上
      for (const left of leftTrees) {
        for (const right of rightTrees) {
          const currTree = new TreeNode(i);
          currTree.left = left;
          currTree.right = right;
          allTrees.push(currTree);
        }
      }
    }
    return allTrees;
  }
}
// @lc code=end

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

const res1 = generateTrees(3);
