/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=589 lang=javascript
 *
 * [589] N叉树的前序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
function preorder(root) {
  // 迭代
  // 时间复杂度O(n): n为N叉树的节点数量，每个节点遍历一次
  // 空间复杂度O(n): 极端情况下N叉树只有两层，所有子节点都是根节点的孩子，
  // 将根推出栈之后，需要将这些节点都放入栈中，空间为O(n-1)
  if (!root) return [];
  const res = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    if (node.children && node.children.length) {
      // 栈是先进后出的
      const n = node.children.length;
      for (let i = n - 1; i >= 0; i -= 1) {
        stack.push(node.children[i]);
      }
    }
  }
  return res;
}

// function preorder(root) {
//   // 递归
//   // 时间复杂度O(n): n为N叉树的节点数量，每个节点遍历一次
//   // 空间复杂度O(n): 平均情况下，调用递归栈的深度为O(logn)，极端情况下为链状O(n)
//   const res = [];
//   pre(root, res);
//   return res;

//   function pre(root, res) {
//     if (!root) return;
//     res.push(root.val);
//     if (root.children && root.children.length) {
//       const n = root.children.length;
//       for (let i = 0; i < n; i += 1) {
//         const child = root.children[i];
//         pre(child, res);
//       }
//     }
//   }
// }
// @lc code=end

const param1 = {
  val: 1,
  children: [
    {
      val: 3,
      children: [
        {
          val: 5,
          children: null,
        },
        {
          val: 6,
          children: null,
        },
      ],
    },
    {
      val: 2,
      children: null,
    },
    {
      val: 4,
      children: null,
    },
  ],
};

const res1 = preorder(param1); // [1,3,5,6,2,4]
