/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @return {ListNode}
 */
function reverseList(head) {
  // 迭代
  // 时间复杂度O(n)
  // 空间复杂度O(1)，三个指针常量级
  let pre = null;
  let cur = head;
  // 在遍历列表时，将当前节点的next指针改为指向前一个元素。
  while (cur !== null) {
    const nextTemp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nextTemp;
  }
  return pre;
}
// @lc code=end

// function reverseList(head) {
//   // 遍历法
//   // 逐个将原head的下一个节点nextNode的next指向原head
//   // 原head的next指向原head的next.next
//   // 记录新head为nextNode
//   let newHead = head;
//   while (head !== null && head.next !== null) {
//     const nextNode = head.next;
//     head.next = head.next.next;
//     nextNode.next = newHead;
//     newHead = nextNode;
//   }
//   return newHead;
// }

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function makeParams(list) {
  const head = new ListNode();
  let pre = head;
  for (let i = 0; i < list.length; i += 1) {
    pre.next = new ListNode(list[i]);
    pre = pre.next;
  }
  return head.next;
}

const res1 = reverseList(makeParams([1, 2, 3, 4, 5]));
