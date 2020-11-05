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
  // 自顶向下递归
  // 具体算法：
  // 默认对称ans = true，然后递归对比当前的左子树和右子树
  // 根据几种情况
  // 如果上一次对比之后不对称(ans === false)，就不用在对比了
  // 如果 左和右都为空节点，则对称
  // 如果左和右都存在，且左的值和右的值相等
  //    继续对比左的右子树-右的左子树，左的左子树-右的右子树
  // 其余情况，说明不对称（ans = false）

  let ans = true;
  checkSymmetric(root, root);
  return ans;

  function checkSymmetric(left, right) {
    if (!ans) return;
    if (left == null && right == null) return;
    if (left && right && left.val === right.val) {
      checkSymmetric(left.left, right.right);
      checkSymmetric(left.right, right.left);
    } else {
      ans = false;
    }
  }
}
// @lc code=end

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
