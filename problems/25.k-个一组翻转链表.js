/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
 * @param {number} k
 * @return {ListNode}
 */

// TODO: 1刷

// 递归
function reverseKGroup(head, k) {
  let curr = head;
  let count = 0;
  while (curr !== null && count !== k) {
    // 找到k + 1个节点
    curr = curr.next;
    count += 1;
  }
  if (count === k) {
    curr = reverseKGroup(curr, k); // 翻转k+1节点的链表
    while (count-- > 0) {
      const temp = head.next;
      head.next = curr;
      curr = head;
      head = temp;
    }
    head = curr;
  }
  return head;
}
// @lc code=end

// function reverseKGroup(head, k) {
//   const dummy = new ListNode();
//   dummy.next = head; // 伪头节点，方便头节点交换位置后，通过此节点访问到正确的位置
//   let pre = dummy; // pre 记录反转链表的前一个节点
//   let end = dummy; // end 记录反转链表的最后一个节点

//   while (end.next) {
//     for (let i = 0; i < k && end !== null; i += 1) {
//       end = end.next;
//     }
//     // end 为空，说明链表长度不等于k，无须翻转
//     if (end === null) break;
//     const start = pre.next; // start 为反转链表的第一个节点
//     const { next } = end; // next 为反转链表末尾的下一个节点
//     end.next = null; // 先将最后一个节点的链接断开
//     pre.next = reverse(start); // pre.next 指向翻转后的新头节点
//     start.next = next; // 翻转后的原头节点就是最后的节点，和下个节点链接
//     pre = start; // pre，end都移动到最后一个节点，也就是下一个翻转链表的前一个节点
//     end = pre;
//   }
//   return dummy.next;

//   // 反转链表
//   function reverse(head) {
//     let pre = null;
//     let curr = head;
//     while (curr) {
//       const temp = curr.next;
//       curr.next = pre;
//       pre = curr;
//       curr = temp;
//     }
//     return pre;
//   }
// }

// 迭代
// 递归

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}
