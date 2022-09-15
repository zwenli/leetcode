/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

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
  let node = head
  while (node && node.next) {
    const next = node.next
    if (node.val === next.val) {
      node.next = next.next
    } else {
      node = next
    }
  }
  return head
}
// @lc code=end
const res1 = deleteDuplicates({
  val: 1,
  next: {
    val: 1,
    next: {
      val: 2,
    },
  },
})

const res2 = deleteDuplicates({
  val: 1,
  next: {
    val: 1,
    next: {
      vale: 2,
      next: {
        val: 3,
        next: {
          val: 3,
        },
      },
    },
  },
})
