/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先

// TODO:

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
  // 存储父节点
  // 用哈希表存储所有节点的父节点，
  // 先从p节点开始不断往上找父节点，并记录访问过的父节点
  // 然后再从q节点开始不断往上跳，如果碰到已经访问过的节点，就说明是我们要找的最近公共祖先了
  const parent = new Map();
  const visited = new Set();

  function dfs(root) {
    if (!root) return;
    if (root.left) {
      parent.set(root.left.val, root);
      dfs(root.left);
    }
    if (root.right) {
      parent.set(root.right.val, root);
      dfs(root.right);
    }
  }

  dfs(root);
  while (p) {
    visited.add(p.val);
    p = parent.get(p.val);
  }
  while (q) {
    if (visited.has(q.val)) return q;
    q = parent.get(q.val);
  }
  return null;
}
// @lc code=end

// function lowestCommonAncestor(root, p, q) {
//   // 递归，自底向上的
//   // 定义fx表示x节点包含子树是否包含p节点或q节点，如果包含为true，反正为false，满足以下公式
//   // (flson && frson) || ((x =  || x = q) && (flson || frson))
//   // lson、rson分别表示x节点的左子树、右子树
//   // flson && frson 说明左子树和右子树包含p节点或q节点。如果左子树包含p节点，则右子树包含q节点，反之亦然。
//   // 因为q节点和q节点都是不同且唯一的节点，因此如果满足此条件就说明x节点是我们要找的最近公共祖先。
//   // 第二个判断条件，这个判断条件即是考虑了x节点为p节点或q节点且它的左子树或右子树包含p节点或q节点，
//   // 因此满足这个条件也说明x节点是要找的最近公共祖先

//   // 此方法找出来的公共祖先深度保证是最大的（即最近的公共祖先）。因为我们是自底向上从叶子节点开始更新的，
//   // 所以在所有满足条件的公共祖先中必定是深度最大的先访问到，而且由于fx本身，当最近公共祖先被找到后
//   // fx被设置为true，即假定了这个子树中只有一个p节点或q节点，因此其他公共祖先不会再判断为符合条件

//   // 时间复杂度O(n): n为节点数量，每个节点只访问一次
//   // 空间复杂度O(n): 递归调用的栈深度取决于二叉树的高度，二叉树最坏情况下为单链状，即高度为n
//   let ans = null;
//   dfs(root, p, q);
//   return ans;
//   // 找出root节点的子树是否包含p或q节点
//   function dfs(root, p, q) {
//     if (root === null) return false; // 节点为空，说明不是p，q节点
//     const lson = dfs(root.left, p, q); // 找出左子树是否包含p或q节点
//     const rson = dfs(root.right, p, q); // 找出右子树是否包含p或q节点
//     if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
//       ans = root;
//     }
//     return lson || rson || (root.val === p.val || root.val === q.val);
//   }
// }

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function makeParams(list, p, q) {
  // 完全二叉树的构造，
  let pn = null;
  let qn = null;
  if (!list || !list.length) return null;
  const nodeList = list.map((item) => {
    if (item == null) return null;
    const node = new TreeNode(item);
    if (p === item) {
      pn = node;
    }
    if (q === item) {
      qn = node;
    }
    return node;
  });
  const n = nodeList.length;
  for (let i = 0; i < n; i += 1) {
    const node = nodeList[i];
    if (node) {
      node.left = nodeList[2 * i + 1] || null;
      node.right = nodeList[2 * i + 2] || null;
    }
  }
  return [nodeList[0], pn, qn];
}

const res1 = lowestCommonAncestor(...makeParams(
  [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4],
  5,
  1,
)); // 3
