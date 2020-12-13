/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 */

// TODO 1刷

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
 * @return {ListNode}
 */
function swapPairs(head) {
  // 2. 迭代
  // 时间复杂度O(n): 每个节点只遍历一次
  // 空间复杂度O(1): 常量级
  // 伪头节点，方便处理，对于要交换节点位置的都可以这么操作，
  const dummyHead = new ListNode();
  dummyHead.next = head;
  let prev = dummyHead; // 交换的两个节点的前一个节点，默认为dummy节点
  while (prev.next && prev.next.next) {
    // node1,node2交换位置，prev.next指向node2，
    // 完成交换后，prev指向node1，继续下一个交换
    const node1 = prev.next;
    const node2 = prev.next.next;
    // [prev.next, node2.next, node1.next] = [node2, node1, node2.next];
    node1.next = node2.next;
    node2.next = node1;
    prev.next = node2;
    prev = node1;
  }
  return dummyHead.next;
}
// @lc code=end

// function swapPairs(head) {
//   // 1. 递归
//   // 时间复杂度O(n): n为节点数量，需要对每个节点更新指针
//   // 空间复杂度O(n): 递归产生调用栈的空间，大小为n/2，故为O(n)
//   // 只有一个节点或没有节点，无法交换，返回
//   if (!head || !head.next) return head;
//   const newHead = head.next;
//   head.next = swapPairs(newHead.next); // head.next 指向后面交换完成的子链表
//   newHead.next = head; // 调换位置
//   return newHead;
// }

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function LinkedList(list) {
  this.head = new ListNode(null);
  let prev = this.head;
  if (list && list.length) {
    for (let i = 0; i < list.length; i += 1) {
      const curr = new ListNode(list[i]);
      prev.next = curr;
      prev = curr;
    }
  }
}

const param1 = new LinkedList([1, 2, 3, 4]);

const res1 = swapPairs(param1.head.next);
