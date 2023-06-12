/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
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
var deleteDuplicates = function (head) {
  if (!head) return head
  const dummy = new ListNode(null, head) // 哨兵节点，用来处理边界值head为空的情况
  let pre = dummy // 表示已经处理的节点
  let cur = head // 表示当前待处理的节点
  while (cur) {
    while (cur.next && cur.val === cur.next.val) {
      // 如果存在下一个节点且两者的值相等
      // 移动到下一个节点
      cur = cur.next
    }
    if (pre.next === cur) {
      // 待处理节点没有移动过，即不存在重复节点
      // 已处理节点移动到当前节点
      pre = pre.next
    } else {
      // 存在重复节点的情况
      // 这时候已处理节点不移动，而是更新已处理节点pre的next指针
      // 指向重复节点的下一个节点
      pre.next = cur.next
    }
    // 更新当前待处理的节点
    cur = cur.next
  }
  return dummy.next
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
// @lc code=end
