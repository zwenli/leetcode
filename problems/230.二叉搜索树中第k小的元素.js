/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
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
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
// TODO: AVL 平衡二叉树

var kthSmallest = function (root, k) {
  // 记录子树的节点数量
  const bst = new Bst(root)
  return bst.kthSmallest(k)
}

class Bst {
  /**
   *
   * @param {TreeNode} root
   */
  constructor(root) {
    this.root = root
    this.nodeNum = new Map()
    this.countNodeNum(root)
  }

  /**
   * 统计以node为根结点的子树的结点数
   * @param {TreeNode} node
   */
  countNodeNum(node) {
    if (node === null) return 0
    this.nodeNum.set(
      node,
      1 + this.countNodeNum(node.left) + this.countNodeNum(node.right)
    )
    return this.nodeNum.get(node)
  }

  /**
   * 获取以node为根结点的子树的结点数
   * @param {TreeNode} node
   * @returns
   */
  getNodeNum(node) {
    return this.nodeNum.get(node) || 0
  }

  /**
   * 返回二叉搜索树中第k小的元素
   * @param {TreeNode} k
   */
  kthSmallest(k) {
    let node = this.root
    while (node) {
      // 左子树的节点数量
      const left = this.getNodeNum(node.left)
      if (left < k - 1) {
        // 左子树的节点数量小于k-1，说明第k个元素必定在右子树中，
        // 令node为其的右节点，k等于k-left-1（减去左子树节点数和父节点本身），继续搜索
        node = node.right
        k -= left + 1
      } else if (left === k - 1) {
        // 左子树的节点数量等于k-1,说明第k个元素就是当前节点
        // 停止搜索
        break
      } else {
        // 左子树的节点数量大于k-1，说明第k个元素必定在左子树中，
        // 令node为其的左节点，继续搜索
        node = node.left
      }
    }
    return node.val
  }
}

// var kthSmallest = function (root, k) {
//   // 中序遍历
//   const stack = []
//   let node = root
//   while (node !== null || stack.length) {
//     while (node !== null) {
//       stack.push(node)
//       node = node.left
//     }
//     node = stack.pop()
//     if (--k === 0) break
//     node = node.right
//   }
//   return node.val
// }
// var kthSmallest = function (root, k) {
//   let ans
//   let i = 0
//   inorder(root)
//   return ans
//   function inorder(node) {
//     if (!node) return
//     inorder(node.left)
//     if (++i === k) {
//       ans = node.val
//       return
//     }
//     inorder(node.right)
//   }
// }
// @lc code=end
