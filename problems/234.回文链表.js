/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function endOfFirstHalf(head) {
  let slow = head;
  let fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
function isPalindrome(head) {
  // 快慢指针找到中间节点，分为前后部分，奇数链表，中间节点归前部分
  // 后部分链表反转
  // 前部分，后部分同时遍历都为相等，说明是回文
  // PS：再将反转的链表恢复过来
  // 时间复杂度O(n)
  // 空间复杂度O(1)

  if (head === null) return true;
  const firstHalfEnd = endOfFirstHalf(head);
  const secondHalfStart = reverseList(firstHalfEnd.next);

  let p1 = head;
  let p2 = secondHalfStart;
  let result = true;
  while (result && p2 !== null) {
    if (p1.val !== p2.val) {
      result = false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }
  firstHalfEnd.next = reverseList(secondHalfStart);
  return result;
}
// @lc code=end

// function isPalindrome(head) {
//   // 递归方法
//   // 时间复杂度 O(n)：n为链表长度
//   // 空间复杂度 O(n)：n为链表长度，这里递归调用会产生n个堆栈
//   // 和方法“将值复制到数组后用双指针”看似空间，时间一样，
//   // 实际递归产生的堆栈空间更大，性能比上者差
//   let frontPointer = head;

//   // 递归检查，画图加以理解
//   function recursivelyCheck(currentNode) {
//     if (currentNode) {
//       // 这里会递归到尾部，
//       if (!recursivelyCheck(currentNode.next)) {
//         return false;
//       }
//       // 头尾节点的值对不上，说明不是回文串
//       if (frontPointer.val !== currentNode.val) {
//         return false;
//       }
//       // 注意若相等，头节点前进一步
//       frontPointer = frontPointer.next;
//     }
//     // base case
//     // 遍历到链表尾部.next 返回true
//     // or 头尾节点值对上，
//     return true;
//   }

//   return recursivelyCheck(frontPointer);
// }

// function isPalindrome(head) {
//   // 将值复制到数组后用双指针
//   // 时间复杂度O(n)： 遍历链表n，遍历数组n/2，链表数组的长度都为n
//   // 空间复杂度O(n)： 需要组数存储链表，长度为n
//   const list = [];
//   let node = head;
//   while (node) {
//     list.push(node.val);
//     node = node.next;
//   }
//   let l = 0;
//   let r = list.length - 1;
//   while (l < r) {
//     if (list[l] !== list[r]) {
//       return false;
//     }
//     l += 1;
//     r -= 1;
//   }
//   return true;
// }

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

// 递归逆序遍历链表
// function printValueInReverse(head) {
//   if (head) {
//     printValueInReverse(head.next);
//     console.log(head.val);
//   }
// }

// printValueInReverse(makeParams([1, 2, 3, 4, 5]));

const res1 = isPalindrome(makeParams([1, 2, 2, 1]));
const res2 = isPalindrome(makeParams([6, 8, 5, 8, 6]));
