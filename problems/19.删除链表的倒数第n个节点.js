/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
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
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
  // 一次遍历
  // 时间复杂度O(L)
  // 空间复杂度O(1)

  // 将添加一个哑结点作为辅助，该结点位于列表头部。
  // 哑结点用来简化某些极端情况，例如列表中只含有一个结点，或需要删除列表的头部
  const dummy = { next: head };
  // 用两个指针，第一个指针先移动n个节点，然后两个节点同时移动
  // 直到第一个指针到链表尾部
  let first = dummy;
  let second = dummy;
  for (let i = 0; i <= n; i += 1) {
    first = first.next;
  }
  while (first !== null) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return dummy.next;
}
// @lc code=end

// function removeNthFromEnd(head, n) {
//   // 两次遍历
//   // 时间复杂度O(L)
//   // 空间复杂度O(1)

//   // 将添加一个哑结点作为辅助，该结点位于列表头部。
//   // 哑结点用来简化某些极端情况，例如列表中只含有一个结点，或需要删除列表的头部
//   const dummy = { next: head };
//   let first = head;
//   let length = 0;
//   // 第一次遍历计算链表的长度l
//   while (first !== null) {
//     first = first.next;
//     length += 1;
//   }
//   length -= n;
//   first = dummy;
//   // 设置一个指向的哑巴节点的指针
//   // 移动遍历到(l-n)的节点，将（l-n）的next指向(l-n+2)节点
//   while (length > 0) {
//     first = first.next;
//     length -= 1;
//   }
//   first.next = first.next.next;
//   return dummy.next;
// }

// function removeNthFromEnd(head, n) {
//   // 哈希
//   if (!head) return null;
//   // 放个dummy节点指向head，方便处理特殊情况，如删除第一个节点
//   const list = [{ next: head }];
//   while (head) {
//     list.push(head);
//     head = head.next;
//   }
//   const index = list.length - n;
//   if (index > 0) {
//     list[index - 1].next = list[index].next;
//     list[index].next = null;
//     return list[0].next;
//   }
//   return null;
// }

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function makeParams(list, n) {
  const head = new ListNode();
  let node = head;
  for (let i = 0; i < list.length; i += 1) {
    node.next = new ListNode(list[i]);
    node = node.next;
  }
  return [head.next, n];
}

const res1 = removeNthFromEnd(...makeParams([1, 2, 3, 4, 5], 2));
