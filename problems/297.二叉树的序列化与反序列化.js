/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=297 lang=javascript
 *
 * [297] 二叉树的序列化与反序列化
 */

// TODO: 1

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
function serialize(root) {
  // dfs，先序遍历
  // 先序遍历树，节点序列化成`{root.val},`，遇到空节点则序列化成‘null,’
  // 时间复杂度O(n): n为树的节点数，每个节点只遍历一次
  // 空间复杂度O(n): 递归的栈空间取决于树的高度，极端情况下树为单链状，此时高度为节点数量n
  function rserialize(root, str) {
    if (!root) {
      str += 'null,';
    } else {
      str += `${root.val},`;
      str = rserialize(root.left, str);
      str = rserialize(root.right, str);
    }
    return str;
  }
  return rserialize(root, '');
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
function deserialize(data) {
  // dfs，
  // 将字符串分割','得到先序遍历的数组
  // 从左到右解析数组
  // 遇到null，则当前为空树
  // 否则先解析这颗树的左子树，再解析这个树的右子树
  // 时间复杂度O(n): n为树的节点数，每个节点只遍历一次
  // 空间复杂度O(n): 递归的栈空间取决于树的高度，极端情况下树为单链状，此时高度为节点数量n
  const dataList = data.slice(0, -1).split(',');
  return rdeserialize(dataList);
  function rdeserialize(list) {
    if (!list.length) return null;
    const val = list.shift();
    if (val === 'null') {
      return null;
    }
    const root = new TreeNode(Number(val));
    root.left = rdeserialize(list);
    root.right = rdeserialize(list);
    return root;
  }
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

const param1 = '1,2,3,null,null,4,null,null,5,';
const root1 = deserialize(param1);
const res1 = serialize(root1); // === param1;
