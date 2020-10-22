/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  // 迭代
  const resHead = new ListNode(null);
  let res = resHead;
  let base = 0;
  while (l1 !== null && l2 !== null) {
    const curr = new ListNode((base + l1.val + l2.val) % 10);
    res.next = curr;
    base = Math.floor((base + l1.val + l2.val) / 10);
    res = res.next;
    l1 = l1.next;
    l2 = l2.next;
  }
  // l1,l2相加后，最后只有一个还有剩余
  // 继续和base相加处理
  let rest = l1 === null ? l2 : l1;
  while (rest !== null) {
    const curr = new ListNode((base + rest.val) % 10);
    res.next = curr;
    base = Math.floor((base + rest.val) / 10);
    res = res.next;
    rest = rest.next;
  }
  // 如果base大于0，还得进一
  if (base > 0) {
    res.next = new ListNode(base);
    res = res.next;
  }
  return resHead.next;
}
// @lc code=end

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function SinglyLinkedList(list) {
  this.head = new ListNode(null);
  let prevNode = this.head;
  if (!list || !list.length) return;
  for (let i = 0; i < list.length; i += 1) {
    const currNode = new ListNode(list[i]);
    prevNode.next = currNode;
    prevNode = currNode;
  }
}

const list1 = new SinglyLinkedList([2, 4, 3]);
const list2 = new SinglyLinkedList([5, 6, 4]);

const res1 = addTwoNumbers(list1.head.next, list2.head.next);

const list3 = new SinglyLinkedList([9, 9, 9, 9, 9, 9, 9]);
const list4 = new SinglyLinkedList([9, 9, 9, 9]);

const res2 = addTwoNumbers(list3.head.next, list4.head.next); // [8,9,9,9,0,0,0,1]
