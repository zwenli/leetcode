/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
function mergeTwoLists(l1, l2) {
  // 迭代
  // 时间复杂度O(m + n)
  // 空间复杂度O(1)
  const prevHead = { next: null };
  let prev = prevHead;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      prev.next = l1;
      l1 = l1.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
    }
    prev = prev.next;
  }
  // 合并后 l1 和 l2 最多只有一个还未被合并完，
  // 我们直接将链表末尾指向未合并完的链表即可
  prev.next = l1 === null ? l2 : l1;
  return prevHead.next;
}
// @lc code=end

// function mergeTwoLists(l1, l2) {
//   // 递归
//   // merge操作如下：
//   // list1[0] + merge(list1[1:], list2), list1[0] < list2[0]
//   // list2[0] + merge(list1, list2[1:]), otherwise
//   // 也就是说两个链表头部值较小的一个节点与剩下元素的 merge 操作结果合并
//   // 时间复杂度O(n + m)
//   // 空间复杂度O(n + m)：栈空间的大小取决于链表的长度，结束函数递归调用时最多调用n+m
//   if (l1 === null) {
//     return l2;
//   } if (l2 === null) {
//     return l1;
//   } if (l1.val < l2.val) {
//     l1.next = mergeTwoLists(l1.next, l2);
//     return l1;
//   }
//   l2.next = mergeTwoLists(l1, l2.next);
//   return l2;
// }

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

const linkedList1 = new SinglyLinkedList([1, 2, 4]);
const linkedList2 = new SinglyLinkedList([1, 3, 4]);

const res1 = mergeTwoLists(linkedList1.head.next, linkedList2.head.next);
