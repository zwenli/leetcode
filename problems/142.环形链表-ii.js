/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
 */
function detectCycle(head) {
  // 快慢指针
  // 时间复杂度O(n)：链表长度
  // 空间复杂度O(1)：只使用fast，slow，ptr三个指针，常量级

  // 此题的重点是数学推导
  // 设链表中环外部分的长度为 a, slow指针进入环后，又走了b的距离与fast指针相遇
  // 相遇点到入环点的长度为c，此时fast指针已经走完了环的n圈。
  // 因此fast距离为：fast = a + n * (b + c) + b = a + (n + 1) * b + n * c
  // 有因为任意时刻 fast = 2 * slow，且 slow = a + b
  // => a + (n + 1) * b + n * c = 2 * (a + b)
  // => a = (n - 1)(b + c) + c
  // 即相遇点到入环点的距离加上n-1圈的环长等于链表头部到入环点的距离
  // 因此fast和slow相遇后，再额外使用个指针ptr，指向链表头部head，
  // 随后slow和ptr每次向后移动一个位置。最终它们会再入环点相遇
  if (head === null) return null;
  let fast = head;
  let slow = head;
  while (fast !== null) {
    slow = slow.next;
    if (fast.next === null) {
      return null;
    }
    fast = fast.next.next;
    if (fast === slow) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }
  return null;
}
// @lc code=end

// function detectCycle(head) {
//   // 哈希表解答
//   const seen = new Set();
//   let node = head;
//   while (node) {
//     if (seen.has(node)) {
//       return node;
//     }
//     seen.add(node);
//     node = node.next;
//   }
//   return null;
// }

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function makeParams(list, pos) {
  const head = new ListNode(null);
  let posNode = null;
  let node = head;
  for (let i = 0; i < list.length; i += 1) {
    node.next = new ListNode(list[i]);
    if (pos === i) {
      posNode = node.next;
    }
    node = node.next;
  }
  if (posNode) {
    node.next = posNode;
  }
  return head.next;
}

const res1 = detectCycle(makeParams([1, 2], 0)); // 1
const res2 = detectCycle(makeParams([1], -1));
