/*
 * @lc app=leetcode.cn id=971 lang=javascript
 *
 * [971] 翻转二叉树以匹配先序遍历
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
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function (root, voyage) {
  // 中文：https://leetcode.cn/problems/flip-binary-tree-to-match-preorder-traversal/solutions/691620/dfs-zhao-hao-base-case-yi-ji-an-yao-qiu-4wh5p/
  // 英文的题解，思路类似https://leetcode.com/problems/flip-binary-tree-to-match-preorder-traversal/solutions/214216/java-c-python-dfs-solution/

  const ans = []
  let index = 0 // 当前下标位置
  const dfs = (root) => {
    // base case，定义节点为空时，遍历符合voyage
    if (root == null) {
      return true
    }
    // 记录当前的下标，下面dfs的过程中会递增下标
    const restore = index
    // 节点值，不符合voyage当前下标的值，不满足要求
    if (root.val !== voyage[index++]) {
      return false
    }
    // 当前节点匹配之后，在分别dfs左右子树
    if (dfs(root.left) && dfs(root.right)) {
      // 都符合说明匹配voyage
      return true
    }
    // 正常左右子树不匹配时，尝试翻转二叉树再dfs
    // 下标还原成当前节点的下个坐标，即restore + 1
    index = restore + 1
    // 翻转dfs，即先 dfs right 再 dfs left
    const left = dfs(root.right)
    const right = dfs(root.left)
    if (left && right) {
      // 翻转的结果符合匹配voyage，
      // 记录节点值。
      ans.push(root.val)
    }
    return left && right
  }

  return dfs(root) ? ans : [-1]
}
// @lc code=end
