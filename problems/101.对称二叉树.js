/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
 */

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
 * @return {boolean}
 */
function isSymmetric(root) {
  // 迭代
  // 时间复杂度O(n)：每个节点遍历一次
  // 空间复杂度O(n)：队列空间不会大于节点数量
  if (!root) return true;
  const queue = [root.left, root.right];
  while (queue.length) {
    // 每次提取队列的两个节点对比
    const p = queue.shift();
    const q = queue.shift();

    if (!p && !q) continue;
    if ((!p || !q) || (p.val !== q.val)) return false;
    // 左右节点相反顺序插入
    queue.push(p.left);
    queue.push(q.right);

    queue.push(p.right);
    queue.push(q.left);
  }
  return true;
}
// @lc code=end

// function isSymmetric(root) {
//   // 递归
//   // 如果一个树的左子树和右子树镜像对称，那么这个树是对称的
//   // 两个树镜像对称的条件
//   //  1. 它们的两个根节点的值相等
//   //  2. 每个树的右子树和另外一个树的左子树镜像对称
//   // 我们可以实现这样一个递归函数，通过「同步移动」两个指针的方法来遍历这棵树，
//   // p 指针和 q 指针一开始都指向这棵树的根，随后 p 右移时，q 左移，p 左移时，q 右移。
//   // 每次检查当前 p 和 q 节点的值是否相等，如果相等再判断左右子树是否对称
//   // 时间复杂度O(n): 每个节点遍历一次
//   // 空间复杂度O(n): 这里的空间复杂度和递归使用的栈空间有关，这里递归层数不超过 n，故渐进空间复杂度为O(n)

//   if (!root) return true;
//   return check(root.left, root.right);
//   function check(p, q) {
//     if (p === null && q === null) {
//       return true;
//     }
//     if (p === null || q === null) {
//       return false;
//     }
//     return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
//   }
// }

// function isSymmetric(root) {
//   // 自顶向下递归
//   // 具体算法：
//   // 默认对称ans = true，然后递归对比当前的左子树和右子树
//   // 根据几种情况
//   // 如果上一次对比之后不对称(ans === false)，就不用在对比了
//   // 如果 左和右都为空节点，则对称
//   // 如果左和右都存在，且左的值和右的值相等
//   //    继续对比左的右子树-右的左子树，左的左子树-右的右子树
//   // 其余情况，说明不对称（ans = false）

//   let ans = true;
//   // 默认左子树和右子树都是root
//   checkSymmetric(root, root);
//   return ans;

//   function checkSymmetric(left, right) {
//     if (!ans) return;
//     if (left == null && right == null) return;
//     if (left && right && left.val === right.val) {
//       checkSymmetric(left.left, right.right);
//       checkSymmetric(left.right, right.left);
//     } else {
//       ans = false;
//     }
//   }
// }

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function makeParams(list) {
  if (!list || !list.length) return null;
  const nodeList = list.map((item) => {
    if (item == null) return null;
    return new TreeNode(item);
  });
  const n = nodeList.length;
  for (let i = 0; i < n; i += 1) {
    const node = nodeList[i];
    if (node) {
      node.left = nodeList[2 * i + 1] || null;
      node.right = nodeList[2 * i + 2] || null;
    }
  }
  return nodeList[0];
}

const res1 = isSymmetric(makeParams([1, 2, 2, 3, 4, 4, 3])); // true
const res4 = isSymmetric(makeParams([1, 2, 2, null, 3, null, 3])); // false

const res2 = isSymmetric(null); // true
const res3 = isSymmetric(makeParams([1])); // true
