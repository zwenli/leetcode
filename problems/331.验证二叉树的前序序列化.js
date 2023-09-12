/*
 * @lc app=leetcode.cn id=331 lang=javascript
 *
 * [331] 验证二叉树的前序序列化
 */

// @lc code=start
/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
  // 计数， 相比下面的解法，是不分解字符串
  const n = preorder.length
  let slot = 1
  let i = 0
  while (i < n) {
    if (slot === 0) return false
    if (preorder[i] === ',') {
      i += 1
    } else if (preorder[i] === '#') {
      i += 1
      slot -= 1
    } else {
      while (i < n && preorder[i] !== ',') {
        i += 1
      }
      slot += 1
    }
  }
  return slot === 0
}
// var isValidSerialization = function (preorder) {
//   // 计数
//   const arr = preorder.split(',')
//   let slot = 1 // 整个二叉树的剩余槽位，一个槽位可以被看作「当前二叉树中正在等待被节点填充」的那些位置。
//   for (const node of arr) {
//     // 在有节点情况下，剩余槽位已空，说明序列不合法
//     if (slot === 0) return false
//     if (node === '#') {
//       // 遇到空节点，消耗一个槽位
//       slot -= 1
//     } else {
//       // 遇到非空节点，除了消耗一个槽位外，再补充两个槽位
//       slot += 1 // slot = slot - 1 + 2
//     }
//   }
//   // 遍历结束后，剩余槽位为空，说明是合法序列
//   return slot === 0
// }

// var isValidSerialization = function (preorder) {
//   let pos = 0
//   const n = preorder.length
//   // 模拟前序遍历的过程建树
//   const dfs = () => {
//     if (pos >= n) return false // 越界
//     if (preorder[pos] === '#') {
//       // 遇到空节点，因为还有逗号，因此加2
//       pos += 2
//       return true
//     }
//     while (pos < n && preorder[pos] !== ',') {
//       // 对当前节点读取数字
//       pos += 1
//     }
//     pos += 1
//     // 分别对左右节点dfs建树，若有任意节点建树不成功，代表整个序列不合法
//     if (!dfs()) return false
//     if (!dfs()) return false
//     return true
//   }

//   return dfs() && pos >= n
// }
// @lc code=end
const assert = require('node:assert/strict')

const res1 = isValidSerialization('9,3,4,#,#,1,#,#,2,#,6,#,#')
assert.equal(res1, true)

const res2 = isValidSerialization('1,#')
assert.equal(res2, false)

const res3 = isValidSerialization('9,#,#,1')
assert.equal(res3, false)
