/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并 K 个升序链表
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 归并排序
  return merge(lists, 0, lists.length - 1)
}

const merge = (lists, l, r) => {
  if (l === r) return lists[l]
  if (l > r) return null
  const mid = (l + r) >> 1
  return mergeTwoLists(merge(lists, l, mid), merge(lists, mid + 1, r))
}

const mergeTwoLists = (head1, head2) => {
  const d = new ListNode(0)
  let prev = d
  while (head1 && head2) {
    if (head1.val <= head2.val) {
      prev.next = head1
      head1 = head1.next
    } else {
      prev.next = head2
      head2 = head2.next
    }
    prev = prev.next
  }
  if (head1) {
    prev.next = head1
  } else if (head2) {
    prev.next = head2
  }
  return d.next
}

// var mergeKLists = function (lists) {
//   let res = null
//   for (const head of lists) {
//     res = merge(res, head)
//   }
//   return res
// }
// const merge = (head1, head2) => {
//   const d = new ListNode(0)
//   let prev = d
//   while (head1 && head2) {
//     if (head1.val <= head2.val) {
//       prev.next = head1
//       head1 = head1.next
//     } else {
//       prev.next = head2
//       head2 = head2.next
//     }
//     prev = prev.next
//   }
//   if (head1) {
//     prev.next = head1
//   } else if (head2) {
//     prev.next = head2
//   }
//   return d.next
// }
// @lc code=end
