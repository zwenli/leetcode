/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
function getIntersectionNode(headA, headB) {
  // 双指针
  // A，B指针各自从head向后逐步遍历节点，到达链表尾部后
  // 重定位到另一个链表的head继续遍历，
  // 当pA，pB相等时说明节点相交
  // 如果两个链表相交，有公式成立
  // => a + res + b = b + res + a
  // 即两个不同起点，遍历的距离长度时一样的

  let pA = headA;
  let pB = headB;
  // pA,pB 都为null时说明不相交，
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
}
// @lc code=end

// function getIntersectionNode(headA, headB) {
//   // 哈希
//   if (headA === null || headB === null) return null;
//   const aSet = new Set();
//   // 记录A链表的哈希
//   while (headA !== null) {
//     aSet.add(headA);
//     headA = headA.next;
//   }
//   while (headB !== null) {
//     if (aSet.has(headB)) {
//       return headB;
//     }
//     headB = headB.next;
//   }
//   return null;
// }

// function getIntersectionNode(headA, headB) {
//   // 暴力法
//   // 时间复杂度O(mn)
//   // 空间复杂度O(1)
//   if (!headA || !headB) return null;
//   let nodeA = headA;
//   while (nodeA !== null) {
//     let nodeB = headB;
//     while (nodeB !== null) {
//       if (nodeA === nodeB) {
//         return nodeA;
//       }
//       nodeB = nodeB.next;
//     }
//     nodeA = nodeA.next;
//   }
//   return null;
// }
