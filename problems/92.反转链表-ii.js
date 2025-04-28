/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  // https://leetcode.cn/problems/reverse-linked-list-ii/solutions/634701/fan-zhuan-lian-biao-ii-by-leetcode-solut-teyq/?envType=study-plan-v2&envId=top-interview-150
  if (left === right) return head
  const dummy = new ListNode(-1, head)
  let pre = dummy
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next
  }

  let cur = pre.next
  for (let i = 0; i < right - left; i++) {
    const next = cur.next
    cur.next = next.next
    next.next = pre.next
    pre.next = next
  }

  return dummy.next
}

// var reverseBetween = function (head, left, right) {
//   // 两次遍历
//   if (left === right) return head

//   const dummy = new ListNode(-1, head)
//   // pre, left, right, curr
//   let pre = dummy
//   for (let i = 0; i < left - 1; i++) {
//     pre = pre.next
//   }

//   // eg. 1, 2, 3, 4, 5 [2, 4]
//   let rightNode = pre
//   for (let i = 0; i < right - left + 1; i++) {
//     rightNode = rightNode.next
//   }

//   const leftNode = pre.next
//   const curr = rightNode.next

//   pre.next = null
//   rightNode.next = null

//   reverseList(leftNode, rightNode)

//   pre.next = rightNode
//   leftNode.next = curr

//   return dummy.next
// }

// function reverseList(head) {
//   let pre = null
//   let cur = head
//   while (cur) {
//     const next = cur.next
//     cur.next = pre
//     pre = cur
//     cur = next
//   }
//   return pre
// }
// @lc code=end

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

const res1 = reverseBetween({ val: 5 }, 1, 1) // [5]
const res2 = reverseBetween({ val: 3, next: { val: 5 } }, 1, 2) // [5, 3]
