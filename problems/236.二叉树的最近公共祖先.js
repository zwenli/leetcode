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

// function lowestCommonAncestor(root, p, q) {
//   // 解法1 递归
//   // 时间复杂度O(n):
//   // 空间复杂度O(n)
//   let ans = null;
//   dfs(root, p, q);
//   return ans;
//   function dfs(root, p, q) {
//     if (!root) return null;
//     const isCurrentNode = root.val === p.val || root.val === q.val;
//     const left = dfs(root.left, p, q);
//     const right = dfs(root.right, p, q);
//     if ((left && right) || (isCurrentNode && (left || right))) {
//       ans = root;
//     }
//     return left || right || isCurrentNode;
//   }
// }

function lowestCommonAncestor(root, p, q) {
  // 解法2 哈希
  // 时间复杂度O(n):
  // 空间复杂度O(n)
  const parent = new Map();
  const seen = new Set();
  dfs(root);
  while (p) {
    seen.add(p.val);
    p = parent.get(p.val);
  }
  while (q) {
    if (seen.has(q.val)) return q;
    q = parent.get(q.val);
  }
  return null;
  // 这里可以改为迭代
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
  // function bfs(root, p, q) {
  //   const stack = [root];
  //   while (!parent.has(p.val) || !parent.has(q.val)) {
  //     const node = stack.shift();
  //     if (node.left) {
  //       parent.set(node.left.val, root);
  //       stack.push(node.left);
  //     }
  //     if (node.right) {
  //       parent.set(node.right.val, root);
  //       stack.push(node.right);
  //     }
  //   }
  // }
}

// function lowestCommonAncestor(root, p, q) {
//   // 解法3 递归
//   // 时间复杂度O(n):
//   // 空间复杂度O(n)
//   if (!root || root === p || root === q) return root;
//   const left = lowestCommonAncestor(root.left, p, q);
//   const right = lowestCommonAncestor(root.right, p, q);
//   if (!left && !right) return null;
//   if (!left) return right;
//   if (!right) return left;
//   return root;
// }

// ------------------------------

// function lowestCommonAncestor(root, p, q) {
//   // 存储父节点
//   // 用哈希表存储所有节点的父节点，
//   // 先从p节点开始不断往上找父节点，并记录访问过的父节点
//   // 然后再从q节点开始不断往上跳，如果碰到已经访问过的节点，就说明是我们要找的最近公共祖先了
//   const parent = new Map();
//   const visited = new Set();

//   function dfs(root) {
//     if (!root) return;
//     if (root.left) {
//       parent.set(root.left.val, root);
//       dfs(root.left);
//     }
//     if (root.right) {
//       parent.set(root.right.val, root);
//       dfs(root.right);
//     }
//   }

//   dfs(root);
//   while (p) {
//     visited.add(p.val);
//     p = parent.get(p.val);
//   }
//   while (q) {
//     if (visited.has(q.val)) return q;
//     q = parent.get(q.val);
//   }
//   return null;
// }
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

// 解法
// 1. 递归dfs，
//   定义 fx 表示 x节点是否包含p节点或q节点，有为true，否则为false，那么
//   对于符合最近公共祖先节点的x必定满足条件：
//   (flson && frson) || ((x == p || x ==q) && (flson || frson))
//   flson && frson: 表示左子树包含p或q，同时右子树也包含p或q
//   (x == p || x ==q): 表示当前节点等于p或q，左或右子树包含，说明本身就是最近公共祖先节点
// 2. 哈希表记录，dfs遍历，记录每个节点的父节点，
//    设置已遍历的节点map, 从p点往上找父节点，记录已遍历
//    接着从q节点找父节点，只要父节点存在已遍历的节点map，就是我们要找的最近公共祖先节点
// 3. 递归
//    根据定义，若root是p，q的最近公共祖先节点，只能是以下情况之一：
//     1. p和q在root的子树中，且分列在root的异侧（即分别在左、右子树中）
//     2. p == root && q在root的子树中
//     3. q == root && p在root的子树中
//    考虑通过递归对二叉树进行后序遍历，
//    当遇到节点 p 或 q 时返回。从底至顶回溯，
//    当节点 p, q 在节点 root 的异侧时，节点 root 即为最近公共祖先，
//    则向上返回 root 。
//    终止条件：root == null || root == p || root == q; return null
//    递归：
//     1. 递归左子树，返回值记为left
//     2. 递归右子树，返回值记为right
//    条件判断：
//     1. 当left和right都为空，说明root的左右子树不包含p和q，返回null
//     2. 当left和right都不为空，说明root就是最近公共祖先，返回root
//     3. 当left为空，right不为空，说明p，q都不在左子树，直接返回right
//     4. 当right为空，left不为空, 说明p，q都不在右子树，直接返回left
