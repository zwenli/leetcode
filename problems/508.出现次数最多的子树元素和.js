/*
 * @lc app=leetcode.cn id=508 lang=javascript
 *
 * [508] 出现次数最多的子树元素和
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
var findFrequentTreeSum = function (root) {
  const mp = new Map()
  let maxFreq = 0
  const postorder = (node) => {
    if (!node) return 0
    const left = postorder(node.left)
    const right = postorder(node.right)
    const sum = node.val + left + right
    const freq = (mp.get(sum) || 0) + 1
    mp.set(sum, freq)
    maxFreq = Math.max(freq, maxFreq)
    return sum
  }
  postorder(root)

  let ans = []
  for (const [sum, cnt] of mp.entries()) {
    if (cnt === maxFreq) {
      ans.push(sum)
    }
  }
  return ans
}
// @lc code=end
