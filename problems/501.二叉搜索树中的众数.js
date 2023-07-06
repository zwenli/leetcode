/*
 * @lc app=leetcode.cn id=501 lang=javascript
 *
 * [501] 二叉搜索树中的众数
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
 * @return {number[]}
 */
var findMode = function (root) {
  let base = -Infinity // 记录当前数字
  let cnt = 0 // 当前数字重复的次数
  let maxCnt = 0 // 已经扫描过的数中出现次数最多的数字的出现次数
  let ans = []

  // 利用BST的性质，BST的中序遍历序列是一个非递减的序列
  const dfs = (root) => {
    if (!root) return
    dfs(root.left)
    if (root.val === base) {
      // 当前节点和当前数字相同，只需要更新cnt
      cnt += 1
    } else {
      // 不相同时，base需要更新为当前节点的值，cnt复位为1
      base = root.val
      cnt = 1
    }

    if (cnt === maxCnt) {
      // 当前这个数字出现的次数等于当前众数出现的次数，加入ans
      ans.push(base)
    } else if (cnt > maxCnt) {
      // 当前这个数字出现的次数大于当前众数出现的次数
      // 需要更新maxCnt为cnt，清空ans后加入base
      ans = [base]
      maxCnt = cnt
    }

    dfs(root.right)
  }

  dfs(root)
  return ans
}
// @lc code=end
