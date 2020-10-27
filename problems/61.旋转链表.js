/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
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
 * @param {number} k
 * @return {ListNode}
 */
function rotateRight(head, k) {
  if (!head) return head;
  const dummy = new ListNode(null);
  dummy.next = head;
  let tail = dummy;
  let n = 0;
  while (tail.next) {
    n += 1;
    tail = tail.next;
  }
  // 尾连接到头，方便处理
  tail.next = head;
  let target = tail;
  const rk = k % n;
  for (let i = 0; i < n - rk; i += 1) {
    target = target.next;
  }
  const newHead = target.next;
  target.next = null;
  return newHead;
}
// @lc code=end

// Definition for singly-linked list.
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

const param1 = new LinkedList([1, 2, 3, 4, 5]);
const param2 = new LinkedList([0, 1, 2]);
const res1 = rotateRight(param1.head.next, 2); // 4->5->1->2->3->NULL
const res2 = rotateRight(param2.head.next, 4); // 2->0->1->NULL
