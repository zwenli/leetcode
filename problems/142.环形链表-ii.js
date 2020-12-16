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
  // 快慢指针：slow进1，fast进2，当指针相遇，
  // 设环一圈的距离为d，起点到交叉点的距离为a，交叉点到相遇点的距离为b，c表示d-b
  // 则有等式： 2(a + b) = a + 2b + c + (n-1)d // n表示转的圈数
  // =》 a = c + (n-1)d , c + (n-1)d意为走n-1圈，加上c的距离，会到达交叉点
  // 也就是说，设置多一个指针third，从头节点出发，slow继续，两两进一，最后在a距离的时候相遇，
  // 也就是开始入环的第一个节点
  // if (!head || !head.next) return null;
  // let slow = head;
  // let fast = head;
  // let isCycle = false; // 环形链表标示，默认为否
  // while (fast) {
  //   if (fast.next === null) return null;
  //   slow = slow.next;
  //   fast = fast.next.next;
  //   if (fast === slow) {
  //     isCycle = true;
  //     break;
  //   }
  // }
  // if (!isCycle) return null;
  // let ptr = head;
  // while (ptr !== slow) {
  //   ptr = ptr.next;
  //   slow = slow.next;
  // }
  // return ptr;

  if (!head || !head.next) return null;
  let slow = head;
  let fast = head;
  let entry = head;
  while (fast.next && fast.next.next) {
    // 先前进，在判断
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      while (entry !== slow) {
        entry = entry.next;
        slow = slow.next;
      }
      return entry;
    }
  }
  return null;
}

// @lc code=end
// function detectCycle(head) {
//   // 快慢指针
//   // 时间复杂度O(n)：链表长度
//   // 空间复杂度O(1)：只使用fast，slow，ptr三个指针，常量级

//   // 此题的重点是数学推导
//   // 设链表中环外部分的长度为 a, slow指针进入环后，又走了b的距离与fast指针相遇
//   // 相遇点到入环点的长度为c，此时fast指针已经走完了环的n圈。
//   // 因此fast距离为：fast = a + n * (b + c) + b = a + (n + 1) * b + n * c
//   // 有因为任意时刻 fast = 2 * slow，且 slow = a + b
//   // => a + (n + 1) * b + n * c = 2 * (a + b)
//   // => a = (n - 1)(b + c) + c
//   // 即相遇点到入环点的距离加上n-1圈的环长等于链表头部到入环点的距离
//   // 因此fast和slow相遇后，再额外使用个指针ptr，指向链表头部head，
//   // 随后slow和ptr每次向后移动一个位置。最终它们会再入环点相遇
//   if (head === null) return null;
//   let fast = head;
//   let slow = head;
//   while (fast !== null) {
//     slow = slow.next;
//     if (fast.next === null) {
//       return null;
//     }
//     fast = fast.next.next;
//     if (fast === slow) {
//       let ptr = head;
//       while (ptr !== slow) {
//         ptr = ptr.next;
//         slow = slow.next;
//       }
//       return ptr;
//     }
//   }
//   return null;
// }

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

const res0 = detectCycle(makeParams([3, 2, 0, -4], 1)); // 2
const res1 = detectCycle(makeParams([1, 2], 0)); // 1
const res2 = detectCycle(makeParams([1], -1));
