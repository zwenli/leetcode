/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// TODO 1刷

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
  // Floyd 判圈算法（本质快慢指针）
  // slow每次移动一位，fast每次移动两位
  // 起始slow0，fast1，保证while可以正常循环
  // if (head == null || head.next == null) {
  //   return false;
  // }
  // let slow = head;
  // let fast = head.next;
  // while (slow !== fast) {
  //   if (fast === null || fast.next === null) {
  //     return false;
  //   }
  //   slow = slow.next;
  //   fast = fast.next.next;
  // }
  // return true;
  // 这种相比上面是先走再对比，要保证首次对比时，两者不是再同一起点上，while循环才正常
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
  
  // if (!head || !head.next) return false;
  // let slow = head;
  // let fast = head.next;
  // while (fast && fast.next) {
  //   if (slow === fast) return true;
  //   slow = slow.next;
  //   fast = fast.next.next;
  // }
  // return false; 
}
// @lc code=end

// 2. 快慢指针
// 时间复杂度O(n): 每个节点遍历一次
// 空间复杂度O(1): 两个指针
// function hasCycle(head) {
//   if (!head || !head.next) return false;
//   let slow = head;
//   let fast = head.next;
//   // 快指针或快指针的下个节点为空，说明链表没有环
//   while (fast && fast.next) {
//     if (fast === slow) return true;
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false
// }
// 1. hash
// 时间复杂度O(n): 每个节点遍历一次
// 空间复杂度O(n): 极端情况下为没有环，即需要存n个节点
// function hasCycle(head) {
//   const cache = new Set();
//   while (head) {
//     if (cache.has(head)) return true;
//     cache.add(head);
//     head = head.next;
//   }
//   return false
// }
// -------
// function hasCycle(head) {
//   // 哈希表
//   // 时间复杂度O(n)
//   // 空间复杂度O(n)
//   const seen = new Set();
//   let node = head;
//   while (node !== null) {
//     if (seen.has(node)) {
//       return true;
//     }
//     seen.add(node);
//     node = node.next;
//   }
//   return false;
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

// param
const res1 = hasCycle(makeParams([3, 2, 0, -4], 1)); // true
