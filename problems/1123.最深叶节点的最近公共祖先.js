/*
 * @lc app=leetcode.cn id=1123 lang=javascript
 *
 * [1123] 最深叶节点的最近公共祖先
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
 * @return {TreeNode}
 */
// var lcaDeepestLeaves = function (root) {
//   return dfs(root)[1]
// }

// function dfs(root) {
//   // base case, 节点为空时，深度为0，
//   if (!root) return [0, root]

//   // 深度遍历
//   // d 为 当前子树的最大深度
//   // lca节点为 最深的叶节点的最近公共祖先
//   const [d1, lca1] = dfs(root.left)
//   const [d2, lca2] = dfs(root.right)

//   // 对比左子树和右子树的深度
//   if (d1 > d2) {
//     // 左子树比右子树更深，说明最深叶子节点在左子树中
//     // 返回 左子树深度 + 1， 左子树的 lca节点
//     return [d1 + 1, lca1]
//   } else if (d1 < d2) {
//     // 右子树比左子树更深，说明最深叶子节点在右子树中
//     // 返回 右子树深度 + 1， 右子树的 lca节点
//     return [d2 + 1, lca2]
//   } else {
//     // 左右子树的深度相等，左右子树都有最深叶节点，说明lca节点为当前节点
//     // 返回 子树深度 +1 ，当前节点
//     return [d1 + 1, root]
//   }
// }

var lcaDeepestLeaves = function (root) {
  // 另一种dfs
  let deepest = 0 // 最大深度
  let lca = null // 最近公共祖先节点

  function dfs(node, depth) {
    // 更新最大深度
    deepest = Math.max(deepest, depth)
    // 节点为空，已到头，返回深度
    if (node == null) {
      return depth
    }

    const left = dfs(node.left, depth + 1)
    const right = dfs(node.right, depth + 1)
    // 左右子树的最大深度都等于 最大深度
    // 说明当前节点就是最近公共祖先节点
    if (left === deepest && right === deepest) {
      lca = node
    }
    // 无论左右子树的最大深度是否相等，都是取两者最大值返回。
    return Math.max(left, right)
  }
  dfs(root, 0)
  return lca
}

// @lc code=end

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
