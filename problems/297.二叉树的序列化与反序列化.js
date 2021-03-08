/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=297 lang=javascript
 *
 * [297] 二叉树的序列化与反序列化
 */

// TODO: 2

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 3. 也是递归，括号构建的
function serialize(root) {
  // 递归，中序，
  // 如果节点为为空，返回 X， 否则为 (T)num(T)
  if (!root) return 'X';
  const l = serialize(root.left);
  const r = serialize(root.right);
  return `(${l})${root.val}(${r})`;
}

function deserialize(data) {
  // ref: https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/solution/er-cha-shu-de-xu-lie-hua-yu-fan-xu-lie-hua-by-le-2/
  // 解码会从左到右解析，指针ptr表示当前解析字符串的位置，
  // 遇到X说明是空树，返回null，指针前进
  // 遇到(, 则按(T)num(T)的模式解析
  // 两种，解析parseSubtree, parseInt
  // parseSubtree, skip (, get subTree = parse, skip)
  // parseInt, 解析注意正负
  // if (data[0] === 'X') return null; // 空树
  let ptr = 0;
  return parse(data);

  function parse(str) {
    if (str[ptr] === 'X') {
      ptr += 1;
      return null;
    } // 空节点处理
    const node = new TreeNode(); // 构建节点
    node.left = parseSubtree(str); // 处理左子树
    node.val = parseInt(str); // 处理值
    node.right = parseSubtree(str); // 处理右节点
    return node;
  }
  function parseSubtree(str) {
    ptr += 1; // 跳过(
    const node = parse(str); // 解析
    ptr += 1; // 跳过)
    return node;
  }
  function parseInt(str) {
    let sign = 1;
    let val = 0;
    // 符号处理
    if (str[ptr] === '-') {
      sign = -1;
      ptr += 1;
    }
    while (str[ptr] !== '(') {
      val = val * 10 + Number(str[ptr]);
      ptr += 1;
    }
    return val * sign;
  }
}

// bfs
// function serialize(root) {
//   const queue = [root];
//   const ans = [];
//   while (queue.length) {
//     const node = queue.shift();
//     if (node) {
//       ans.push(node.val);
//       queue.push(node.left);
//       queue.push(node.right);
//     } else {
//       ans.push('X');
//     }
//   }
//   // 一层一层拼接字符串的
//   return ans.join(',');
// }

// function deserialize(data) {
//   // BFS得到的序列化字符串和DFS得到的不同，它是一层层的。
//   // 除了第一个是根节点的值，其他节点值都是成对的，对应左右子节点。
//   const list = data.split(',');
//   if (list[0] === 'X') return null; // 空树处理
//   const root = new TreeNode(Number(list[0])); // 获取首项，构建根节点
//   const queue = [root]; // 根节点入展, 队列存放待认子节点的父节点
//   let ptr = 1; // 当前解析节点的指针
//   while (ptr < list.length) { // 指针越界，即扫完了序列化字符串
//     const node = queue.shift(); // 考察出列的节点
//     // 对于层序遍历，左右节点总是成对的（除了根节点）
//     const left = list[ptr];
//     const right = list[ptr + 1];
//     if (left !== 'X') {
//       // 如果左节点存在则构建节点，并入队列继续构建其子节点
//       node.left = new TreeNode(Number(left));
//       queue.push(node.left);
//     }
//     if (right !== 'X') {
//       node.right = new TreeNode(Number(right));
//       queue.push(node.right);
//     }
//     ptr += 2; // 一次处理两个节点，指针加2
//   }
//   return root;
// }

// dfs 递归
// function serialize(root) {
//   if (!root) return 'X';
//   const l = serialize(root.left);
//   const r = serialize(root.right);
//   // 先序遍历的顺序拼接根左右
//   return `${root.val},${l},${r}`;
// }

// function deserialize(data) {
//   const dataList = data.split(',');
//   return buildTree(dataList);
//   // dfs 递归构建树
//   function buildTree(list) {
//     if (!list.length) return null;
//     const val = list.shift();
//     if (val === 'X') return null; // 空节点 直接返回null
//     // 也是先序遍历构建
//     const node = new TreeNode(Number(val));
//     node.left = buildTree(list);
//     node.right = buildTree(list);
//     return node;
//   }
// }
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
// function serialize(root) {
//   // dfs，先序遍历
//   // 先序遍历树，节点序列化成`{root.val},`，遇到空节点则序列化成‘null,’
//   // 时间复杂度O(n): n为树的节点数，每个节点只遍历一次
//   // 空间复杂度O(n): 递归的栈空间取决于树的高度，极端情况下树为单链状，此时高度为节点数量n
//   function rserialize(root, str) {
//     if (!root) {
//       str += 'null,';
//     } else {
//       str += `${root.val},`;
//       str = rserialize(root.left, str);
//       str = rserialize(root.right, str);
//     }
//     return str;
//   }
//   return rserialize(root, '');
// }

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
// function deserialize(data) {
//   // dfs，
//   // 将字符串分割','得到先序遍历的数组
//   // 从左到右解析数组
//   // 遇到null，则当前为空树
//   // 否则先解析这颗树的左子树，再解析这个树的右子树
//   // 时间复杂度O(n): n为树的节点数，每个节点只遍历一次
//   // 空间复杂度O(n): 递归的栈空间取决于树的高度，极端情况下树为单链状，此时高度为节点数量n
//   const dataList = data.slice(0, -1).split(',');
//   return rdeserialize(dataList);
//   function rdeserialize(list) {
//     if (!list.length) return null;
//     const val = list.shift();
//     if (val === 'null') {
//       return null;
//     }
//     const root = new TreeNode(Number(val));
//     root.left = rdeserialize(list);
//     root.right = rdeserialize(list);
//     return root;
//   }
// }

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

//     1
//    / \
//   2   5
//  / \
// 3   4
const param1 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
    },
    right: {
      val: 4,
    },
  },
  right: {
    val: 5,
  },
};
const str1 = serialize(param1); // === param1;
const root1 = deserialize(str1);

// 思路
// 1. 递归，dfs
//    序列函数用先序遍历拼接字符串 left,val,right
//    反序列函数分割字符串后构建树，顺序根节点，左子树，右子树
// 2. 迭代？ bfs
//    序列函数队列存放bfs结果，不同的是，遇到空节点，队列要加入'X',最后join(',')
//    反序列函数，BFS得到的序列化字符串和DFS得到的不同，它是一层层的。除了第一个是根节点的值，其他节点值都是成对的，对应左右子节点。
// 3. 括号表示编码+递归下降解码
//   ref: https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/solution/er-cha-shu-de-xu-lie-hua-yu-fan-xu-lie-hua-by-le-2/
//   null 为 X, 节点存在，则可以表示为 (T)num(T): T -> (T)num(T) | X
//   解码会从左到右解析，指针ptr表示当前解析字符串的位置，
//   遇到X说明是空树，返回null，指针前进
//   遇到(, 则按(T)num(T)的模式解析
//   两种，解析parseSubtree, parseInt
//   parseSubtree, skip (, get subTree = parse, skip)
//   parseInt, 解析注意正负
