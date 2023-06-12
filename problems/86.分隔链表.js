/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  if (!head) return head
  let small = new ListNode()
  const smallHead = small
  let large = new ListNode()
  const largeHead = large
  while (head) {
    if (head.val < x) {
      small.next = head
      small = small.next
    } else {
      large.next = head
      large = large.next
    }
    head = head.next
  }
  // 遍历结束后需要将large的next指针置为null，防止指向其他节点
  large.next = null
  small.next = largeHead.next
  return smallHead.next
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
// @lc code=end

const assert = require('node:assert/strict')

function buildList(nums) {
  const dummy = new ListNode()
  let pre = dummy
  for (const num of nums) {
    pre.next = new ListNode(num)
    pre = pre.next
  }
  return dummy.next
}

function getNums(head) {
  const list = []
  while (head) {
    list.push(head.val)
    head = head.next
  }
  return list
}

const res1 = partition(buildList([1, 4, 3, 0, 2, 5, 2]), 3)
assert.deepEqual(getNums(res1), [1, 0, 2, 2, 4, 3, 5])
