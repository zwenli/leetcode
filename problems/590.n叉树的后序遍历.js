/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=590 lang=javascript
 *
 * [590] N叉树的后序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
function postorder(root) {
  // 迭代，
  // 思路：https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/solution/ncha-shu-de-hou-xu-bian-li-by-leetcode/
  // 在后序遍历中，我们是先遍历一个节点的子节点，再遍历这个节点。设当前节点为u，子节点分别为v1，v2，v3，
  // 那么其后序遍历的结果为[[children of v1], v1, [children of v2], v2, [children of v3], v3 , u]
  // 将这个结果反转可得到[u, v3, [children of v3]`, v2, [children of v2]`, v1, [children of v1]`]
  // 其中[a]`表示[a]的反转，此时可发现结果和前序遍历相似，只不过前序遍历对子节点的遍历顺序为v1,v2,v3，
  // 而这里是v3,v2,v1，
  // 因此可以使用前序遍历的相同方法，然后将等到的答案反转即可。注意入栈顺序，遍历子节点的顺序
  // 为v3,v2,v1，那么入栈的顺序为v1,v2,v3

  // 时间复杂度O(n): n为N叉树的节点数量，每个节点遍历一次
  // 空间复杂度O(n): 最坏情况下这棵N叉树只有两层，所有第二层的节点都是根节点的孩子，
  // 将根节点推出栈之后，需要将这些节点都放入栈，共有n-1个节点，因此栈的大小为O(n)
  if (!root) return [];
  const res = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    res.unshift(node.val);
    if (node.children && node.children.length) {
      const n = node.children.length;
      for (let i = 0; i < n; i += 1) {
        stack.push(node.children[i]);
      }
    }
  }
  return res;
}

// function postorder(root) {
//   // 递归，
//   // 时间复杂度O(n): 每个节点遍历一次
//   // 空间复杂度O(n): 平均情况下，递归调用栈的深度为O(logn)，极端情况下为链状O(n)
//   function post(root, res) {
//     if (!root) return;
//     for (const child of root.children) {
//       post(child, res);
//     }
//     res.push(root.val);
//   }
//   const res = [];
//   post(root, res);
//   return res;
// }

// @lc code=end

const params1 = {
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

const res1 = postorder(params1); // [5,6,3,2,4,1]
