/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
function removeElements(head, val) {
  // 递归
  // base case
  if (head === null) {
    return null;
  }
  // 对当前节点的下个节点移除对应的元素
  head.next = removeElements(head.next, val);
  // 如果当前元素是要移除的元素，则返回下个节点
  if (head.val === val) {
    return head.next;
  }
  return head;
}
// @lc code=end
// function removeElements(head, val) {
//   // 迭代
//   const dummy = { next: head };
//   let prev = dummy;
//   let cur = head;
//   while (cur) {
//     if (cur.val === val) {
//       prev.next = cur.next;
//     } else {
//       prev = cur;
//     }
//     cur = cur.next;
//   }
//   return dummy.next;
// }

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function makeParams(list, val) {
  const dummy = new ListNode();
  let node = dummy;
  for (let i = 0; i < list.length; i += 1) {
    node.next = new ListNode(list[i]);
    node = node.next;
  }
  return [dummy.next, val];
}

const res1 = removeElements(...makeParams([1, 2, 3, 4, 5, 6], 6));
