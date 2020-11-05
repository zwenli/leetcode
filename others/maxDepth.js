/* eslint-disable no-use-before-define */

/**
 * 自顶向下的递归
 * 首先访问节点并计算一些值，并在递归调用函数时将这些值传递到子节点。
 * 可以认为是一种前序遍历
 * @param {*} root
 */
export function maxDepth(root) {
  let res = 0;
  findDepth(root, 1);
  return res;

  function findDepth(node, depth) {
    if (node === null) return;
    if (node.left === null && node.right === null) {
      res = Math.max(res, depth);
    }
    findDepth(node.left, depth + 1);
    findDepth(node.right, depth + 1);
  }
}

/**
 * 自底向上的递归
 * 在每个递归层次上，我们首先对所有子节点递归地调用函数，然后根据返回值和根节点本身的值得到答案。
 * 可以认为是一种后序遍历
 * @param {*} root
 */

export function maxDepth2(root) {
  if (!root) return 0;
  const leftDepth = maxDepth2(root.left);
  const rightDepth = maxDepth2(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
}

/**

当遇到树问题时，请先思考一下两个问题：
1. 你能确定一些参数，从该节点自身解决出发寻找答案吗？
2. 你可以使用这些参数和节点本身的值来决定什么应该是传递给它子节点的参数吗？
如果答案都是肯定的，那么请尝试使用 “自顶向下” 的递归来解决此问题。

或者你可以这样思考：对于树中的任意一个节点，
如果你知道它子节点的答案，你能计算出该节点的答案吗？
如果答案是肯定的，那么 “自底向上” 的递归可能是一个不错的解决方法。

 */
