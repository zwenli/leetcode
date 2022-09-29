/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
 */

const { validateLocaleAndSetLanguage } = require("typescript")

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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// var lowestCommonAncestor = function (root, p, q) {
//   // 利用二叉搜索的特性，一次遍历
//   let ancestor = root
//   while (ancestor) {
//     if (ancestor.val > p.val && ancestor.val > q.val) {
//       // 当前节点大于p和q，说明p和q都在当前节点的左子树
//       // 因此将当前节点移动到它的左子节点
//       ancestor = ancestor.left
//     } else if (ancestor.val < p.val && ancestor.val < q.val) {
//       // 当前节点都小于p和q，说明p和q都在当前节点的右子树
//       // 因此将当前节点移动到它的右子节点
//       ancestor = ancestor.right
//     } else {
//       // 上述两种情况都不满足，说明当前节点是「分岔点」
//       // 此时p和q要么分别在当前节点的不同子树上，要么其中一个是当前节点
//       break
//     }
//   }
//   return ancestor
// }
var lowestCommonAncestor = function (root, p, q) {
  // 递归
  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q)
  }
  if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q)
  }
  return root
}
// @lc code=end
