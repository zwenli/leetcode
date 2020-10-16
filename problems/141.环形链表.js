/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
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
 * @return {boolean}
 */
function hasCycle(head) {
  const seen = new Set();
  let node = head;
  while (node !== null) {
    if (seen.has(node)) {
      return true;
    }
    seen.add(node);
    node = node.next;
  }
  return false;
}
// @lc code=end
