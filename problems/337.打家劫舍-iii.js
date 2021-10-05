/*
 * @lc app=leetcode.cn id=337 lang=javascript
 *
 * [337] 打家劫舍 III
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
 * @return {number}
 */

function rob(root) {
  // 递归
  // time complexity O(n): n为二叉树的节点数量，树的后序遍历时间复杂度为O(n)
  // space complexity O(n): 递归的栈空间为O(n)
  const rootStatus = dfs(root);
  return Math.max(rootStatus[0], rootStatus[1]);
  function dfs(node) {
    if (!node) return [0, 0];
    const l = dfs(node.left);
    const r = dfs(node.right);
    const selected = l[1] + r[1] + node.val;
    const unselected = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
    return [selected, unselected];
  }
}
// function rob(root) {
//   // 哈希+递归
//   // time complexity O(n): n为二叉树的节点数量，树的后序遍历时间复杂度为O(n)
//   // space complexity O(n): 递归的栈空间为O(n)，哈希表的空间也为O(n)
//   const f = new Map(); // selected, node => sum
//   const g = new Map(); // unselected;
//   dfs(root);
//   return Math.max((f.get(root) || 0), (g.get(root) || 0));
//   function dfs(node) {
//     if (!node) return null;
//     dfs(node.left);
//     dfs(node.right);
//     fl = f.get(node.left) || 0;
//     gl = g.get(node.left) || 0;
//     fr = f.get(node.right) || 0;
//     gr = g.get(node.right) || 0;
//     f.set(node, node.val + gl + gr);
//     g.set(node, Math.max(fl, gl) + Math.max(fr, gr));
//   }
// }
// @lc code=end

const assert = require('assert').strict;

const param1 = {
  val: 3,
  left: {
    val: 2,
    right: {
      val: 3,
    }
  },
  right: {
    val: 3,
    right: {
      val: 1,
    }
  }
}
const res1 = rob(param1);
assert.equal(res1, 7);

const param2 = {
  val: 3,
  left: {
    val: 4,
    left: {
      val: 1,
    },
    right: {
      val: 3,
    }
  },
  right: {
    val: 5,
    right: {
      val: 1,
    }
  }
}
const res2 = rob(param2);
assert.equal(res2, 9);

const param3 = {
  val: 2,
  left: {
    val: 1,
    left: {
      val: 4,
    }
  },
  right: {
    val: 3,
  }
}
const res3 = rob(param3);
assert.equal(res3, 7); // 3 + 4
/**

f(o)表示选择o节点的情况下，o节点的子树被选择的节点的最大权值和；
g(o)表示不选择o节点的情况下，o节点的子树被选择的节点的最大权值和；
l和r分别表示左子树和右子树。

当o节点被选中时，o节点的左右孩子都不能选择，故o被选中情况下子树上被选中点的最大权值和
为l和r不被选中的最大权值和相加，即f(o) = g(l)+g(r)+o.val

当o节点不被选中时，的左右孩子可以被选中，也可以不被选中。对于o的某个具体的孩子x,
它对o的贡献是x被选中和不被选中情况下权值和的较大值。故
g(o) = max(f(l),g(l)) + max(f(r),g(r))

最后max(f(o),g(o))就是我们所求的答案。

2. 优化，不用哈希表，

 */