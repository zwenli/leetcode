/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=430 lang=javascript
 *
 * [430] 扁平化多级双向链表
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
function flatten(head) {
  // 递归
  // 可以将链表当成二叉树，child为左节点，next为右节点
  // 扁平化操作也就是对二叉树进行先序遍历（深度优先搜索DFS）

  if (!head) return head;
  // 伪头节点，确保`p​​rev`指针永远不会为空
  const pseudoHead = new Node(0, null, head, null);

  flattenDFS(pseudoHead, head);
  // 将伪头节点与真实头节点分离
  pseudoHead.next.prev = null;
  return pseudoHead.next;

  /**
   * return the tail of the flatten list
   * @param {*} prev 指针指向 curr 指向元素的前一个元素
   * @param {*} curr 指针指向我们要扁平化的子列表
   */
  function flattenDFS(prev, curr) {
    if (!curr) return prev;
    curr.prev = prev;
    prev.next = curr;

    // curr.next将在递归函数中得到调整
    const tempNext = curr.next;
    const tail = flattenDFS(curr, curr.child);
    curr.child = null;

    return flattenDFS(tail, tempNext);
  }
}
// @lc code=end

// function flatten(head) {
//   if (!head) return null;
//   const stack = [];
//   let curr = head;
//   while (curr.next || curr.child || stack.length) {
//     if (curr.child) {
//       if (curr.next) {
//         stack.push(curr.next);
//       }
//       curr.next = curr.child;
//       curr.child.prev = curr;
//       curr.child = null;
//     } else if (!curr.next && stack.length) {
//       const next = stack.pop();
//       curr.next = next;
//       if (next) {
//         next.prev = curr;
//       }
//     }
//     curr = curr.next;
//   }
//   return head;
// }

// Definition for a Node.
function Node(val, prev, next, child) {
  this.val = val;
  this.prev = prev;
  this.next = next;
  this.child = child;
}

// [1,2,null,3]
function makeParams1() {
  const one = new Node(1);
  const two = new Node(2);
  const three = new Node(3);
  one.next = two;
  two.prev = one;
  one.child = three;
  return one;
}

// [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
function makeParams2() {
  const list = [null];
  for (let i = 1; i <= 12; i += 1) {
    list.push(new Node(i));
  }
  list[1].next = list[2];
  list[2].next = list[3];
  list[3].next = list[4];
  list[4].next = list[5];
  list[5].next = list[6];
  list[6].prev = list[5];
  list[5].prev = list[4];
  list[4].prev = list[3];
  list[3].prev = list[2];
  list[2].prev = list[1];

  list[3].child = list[7];

  list[7].next = list[8];
  list[8].next = list[9];
  list[9].next = list[10];
  list[10].prev = list[9];
  list[9].prev = list[8];
  list[8].prev = list[7];

  list[8].child = list[11];
  list[11].next = list[12];
  list[12].prev = list[11];
  return list[1];
}

// [1,null,2,null,3,null]
function makeParams3() {
  return new Node(1, null, null, new Node(
    2, null, null, new Node(3),
  ));
}

const res1 = flatten(makeParams1()); // [1,3,2];

const res2 = flatten(makeParams2()); // [1,2,3,7,8,11,12,9,10,4,5,6]

const res3 = flatten(makeParams3()); // [1,2,3]
