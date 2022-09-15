/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  return dfs(nums, 0, nums.length - 1)
  function dfs(nums, left, right) {
    // 中序遍历，总是选择中间位置左边的数字作为根节点
    if (left > right) {
      return null
    }
    const mid = ((right - left) >> 1) + left
    const root = new TreeNode(nums[mid])
    root.left = dfs(nums, left, mid - 1)
    root.right = dfs(nums, mid + 1, right)
    return root
  }
}
// @lc code=end
const res1 = sortedArrayToBST([-10, -3, 0, 5, 9])

const res2 = sortedArrayToBST([1, 3])
