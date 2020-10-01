/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// var inorderTraversal = function(root) {
//   const res = []
//   function dfs(node) {
//     if (node.left) {
//       dfs(node.left)
//     }
//     res.push(node.val)
//     if (node.right) {
//       dfs(node.right)
//     }
//   }
//   dfs(root)
//   return res
// };

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  if (!root) return []
  const res = []
  const visited = new Set()
  const stack = [root]
  while (stack.length) {
    const curr = stack[stack.length - 1]
    // 左
    if (curr.left && !visited.has(curr.left)) {
      stack.push(curr.left)
      continue
    }
    // 中
    res.push(curr.val)
    visited.add(curr)
    stack.pop()
    // 右
    if (curr.right) {
      stack.push(curr.right)
    }
  }
  return res
};

var res = inorderTraversal({
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: {
      val: 4,
      left: null,
      right: null,
    }
  },
  right: {
    val: 5,
    left: {
      val: 6,
    },
    right: null,
  },
})

console.log(res)