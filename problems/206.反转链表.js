/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// TODO

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
  // 递归
  // f(x)
  // if x = tail, return x;
  // else do reverse, f(x.next) and f(x.next).next = x x.next=null returnn x
  // 时间复杂度O(n): n为链表长度，每个节点遍历一次
  // 空间复杂度O(n): 递归产生栈，栈的深度等于链表长度
  if (!head) return head;
  let newHead = null;
  reverseHelper(head);
  return newHead;
  function reverseHelper(head) {
    if (!head.next) {
      // 定位尾节点，并记录为新的头节点
      // 返回尾节点
      newHead = head;
      return head;
    }
    // 递归先处理后面节点的反转
    const reverse = reverseHelper(head.next);
    // 将反转后的节点的next指向当前节点
    reverse.next = head;
    // 当前节点的指针置为null，返回自身
    head.next = null;
    return head;
  }
}
// @lc code=end

// function reverseList(head) {
//   // 迭代
//   // 时间复杂度O(n)
//   // 空间复杂度O(1)，三个指针常量级
//   let pre = null;
//   let cur = head;
//   // 在遍历列表时，将当前节点的next指针改为指向前一个元素。
//   while (cur !== null) {
//     const nextTemp = cur.next;
//     cur.next = pre;
//     pre = cur;
//     cur = nextTemp;
//   }
//   return pre;
// }

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
