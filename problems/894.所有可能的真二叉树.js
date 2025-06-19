/*
 * @lc app=leetcode.cn id=894 lang=javascript
 *
 * [894] 所有可能的真二叉树
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
 * @param {number} n
 * @return {TreeNode[]}
 */
function allPossibleFBT(n) {
  // 真二叉树节点数量n必定是奇数
  // 当真二叉树中只有 1 个结点时，此时 1 为奇数，树中唯一的结点是根结点，。
  // 左子树节点数为i时，右子树节点数为n-i-1
  if (n % 2 === 0) return [] // 真二叉树节点数必为奇数

  // dp[i]存储i个节点的所有可能真二叉树
  const dp = new Array(n + 1).fill(0).map(() => [])
  dp[1] = [new TreeNode(0)] // 基础情况：单个节点树
  // 自底向上构建，i从3开始每次+2（保持奇数）
  for (let i = 3; i <= n; i += 2) {
    // 遍历所有可能的左子树节点数分配方案
    for (let j = 1; j < i; j += 2) { // j必须为奇数
      for (const leftSubTree of dp[j]) {
        for (const rightSubTree of dp[i - j - 1]) { // 右子树节点数 = 总数 - 左子树 - 根节点
          dp[i].push(new TreeNode(0, leftSubTree, rightSubTree))
        }
      }
    }
  }
  return dp[n]
}

// var allPossibleFBT = function (n) {
//   let res = []
//   if (n % 2 === 0) return res
//   if (n === 1) {
//     res.push(new TreeNode(0))
//   }
//   for (let i = 1; i < n; i += 2) {
//     const leftSubTrees = allPossibleFBT(i)
//     const rightSubTrees = allPossibleFBT(n - i - 1)
//     for (const leftSubTree of leftSubTrees) {
//       for (const rightSubTree of rightSubTrees) {
//         res.push(new TreeNode(0, leftSubTree, rightSubTree))
//       }
//     }
//   }
//   return res
// }
// @lc code=end

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
