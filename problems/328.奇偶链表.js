/*
 * @lc app=leetcode.cn id=328 lang=javascript
 *
 * [328] 奇偶链表
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
 * @return {ListNode}
 */
function oddEvenList(head) {
  if (!head || !head.next) return head;
  // 奇数节点头
  const oddHead = head;
  // 偶数节点头
  const evenHead = head.next;
  // 奇数节点
  let odd = head;
  // 偶数节点
  let even = evenHead;
  while (odd.next !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return oddHead;
}
// @lc code=end

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function makeParams(list) {
  const dummy = new ListNode();
  let node = dummy;
  for (let i = 0; i < list.length; i += 1) {
    node.next = new ListNode(list[i]);
    node = node.next;
  }
  return dummy.next;
}

const res1 = oddEvenList(makeParams([1, 2, 3, 4, 5]));
