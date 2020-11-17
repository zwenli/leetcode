/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 */

// TODO

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
  // 递归
  // 时间复杂度O(n): n为节点数量，需要对每个节点更新指针
  // 空间复杂度O(n): 递归产生调用栈的空间，大小为n/2，故为O(n)
  if (!head || !head.next) return head;
  const newHead = head.next;
  head.next = swapPairs(head.next.next);
  newHead.next = head;
  return newHead;
}
// @lc code=end
