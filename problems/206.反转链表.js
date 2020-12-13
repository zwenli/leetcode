/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @return {ListNode}
 */

function reverseList(head) {
  // 1. 双指针迭代
  // let prev = null;
  // while (head) {
  //   const nextTemp = head.next;
  //   head.next = prev;
  //   prev = head;
  //   head = nextTemp;
  // }
  // return prev;
  // 2. 递归
  // if (!head || !head.next) {
  //   return head;
  // }
  // const p = reverseList(head.next);
  // head.next.next = head;
  // head.next = null;
  // return p;
  // 3. 尾递归
  // function reverseHelper(head, newHead) {
  //   if (!head) return newHead;
  //   const nextTemp = head.next;
  //   head.next = newHead;
  //   return reverseHelper(nextTemp, head);
  // }
  // return reverseHelper(head, null);
  // 4. 双指针
  // 原头节点就是反转后的链表尾节点，用head标记
  // 定义指针cur，初始化为head
  // 每次都让head的下一个节点的next指针指向cur，实现一次局部反转
  // 局部反转之后，cur和head的next指针都前移动一个位置
  // cur指向head的下个节点，head的next指针指向下下个节点
  if (!head) return head;
  let cur = head;
  while (head.next) {
    const temp = head.next.next;
    head.next.next = cur;
    cur = head.next;
    head.next = temp;
  }
  return cur;
}

// @lc code=end

// function reverseList(head) {
//   // 1. 双指针
//   // 定义两个指针，prev在cur后面，
//   // let prev = null;
//   // let cur = head;
//   // while (cur) {
//   //   const nextTemp = cur.next;
//   //   // cur的next指针指向prev，实现一次局部反转
//   //   cur.next = prev;
//   //   // 反转完后，两个指针都前进一位
//   //   prev = cur;
//   //   cur = nextTemp;
//   // }
//   // return prev;
//   // 2. 递归
//   // if (!head || !head.next) {
//   //   // 一直使用递归，直至找到链表的最后一个节点，该节点就是反转后的头节点，返回
//   //   return head;
//   // }
//   // // p是反转后的头节点
//   // const p = reverseList(head.next);
//   // head.next.next = head; // 当前节点的下个节点的next指针指向当前节点，实现一次局部反转
//   // head.next = null; // 当前节点的next指针必须置为null，防止链表循环
//   // return p;
//   // 3. 另一种双指针迭代，
//   // 原链表的头结点就是反转之后链表的尾结点，使用 head 标记 .
//   // 定义指针 cur，初始化为 head
//   // 每次都让head的下一个节点的next指针指向cur，实现一次局部反转
//   // 局部反转完成后，cur和head的next指针往前移动一个位置。
//   // 直到循环到最后一个节点
//   // if (!head) return head;
//   // let cur = head;
//   // while (head.next) {
//   //   const temp = head.next.next;
//   //   head.next.next = cur;
//   //   cur = head.next;
//   //   head.next = temp;
//   // }
//   // return cur;
//   // 4. 递归，尾递归,思路和1.的解法一样的，
//   return reverseHelper(head, null);
//   function reverseHelper(head, newHead) {
//     if (!head) return newHead;
//     const nextTemp = head.next;
//     head.next = newHead;
//     return reverseHelper(nextTemp, head);
//   }
// }

/**
 * 1. 双指针迭代
 * 2. 递归
 * 3. hash加两次遍历
 *
 */

// function reverseList(head) {
//   // 递归
//   // f(x)
//   // if x = null || x.next = null, return x;
//   // else do reverse, f(x.next) and f(x.next).next = x x.next=null return head
//   // 时间复杂度O(n): n为链表长度，每个节点遍历一次
//   // 空间复杂度O(n): 递归产生栈，栈的深度等于链表长度
//   if (!head || !head.next) {
//     return head;
//   }
//   // 假设链表的其余部分已被反转，然后在再处理当前节点的反转
//   const p = reverseList(head.next);
//   head.next.next = head;
//   head.next = null;
//   // 返回反转后的head
//   return p;
// }
// function reverseList(head) {
//   // 递归
//   // 不是最优雅的，还要继续优化
//   // f(x)
//   // if x = tail, return x;
//   // else do reverse, f(x.next) and f(x.next).next = x x.next=null returnn x
//   // 时间复杂度O(n): n为链表长度，每个节点遍历一次
//   // 空间复杂度O(n): 递归产生栈，栈的深度等于链表长度
//   if (!head) return head;
//   let newHead = null;
//   reverseHelper(head);
//   return newHead;
//   function reverseHelper(head) {
//     if (!head.next) {
//       // 定位尾节点，并记录为新的头节点
//       // 返回尾节点
//       newHead = head;
//       return head;
//     }
//     // 递归先处理后面节点的反转
//     const reverse = reverseHelper(head.next);
//     // 将反转后的节点的next指向当前节点
//     reverse.next = head;
//     // 当前节点的指针置为null，返回自身
//     head.next = null;
//     return head;
//   }
// }

// function reverseList(head) {
//   // 迭代
//   // 时间复杂度O(n)
//   // 空间复杂度O(1)，三个指针常量级
//   let pre = null;
//   let cur = head;
//   // 在遍历列表时，将当前节点的next指针改为指向前一个元素。
//   while (cur !== null) {
//     const nextTemp = cur.next;
//     cur.next = pre;
//     pre = cur;
//     cur = nextTemp;
//   }
//   return pre;
// }

// function reverseList(head) {
//   // 遍历法
//   // 逐个将原head的下一个节点nextNode的next指向原head
//   // 原head的next指向原head的next.next
//   // 记录新head为nextNode
//   let newHead = head;
//   while (head !== null && head.next !== null) {
//     const nextNode = head.next;
//     head.next = head.next.next;
//     nextNode.next = newHead;
//     newHead = nextNode;
//   }
//   return newHead;
// }

// hash加两次遍历
// function reverseList(head) {
//   if (!head) return head;
//   const map = new Map();
//   let n = 0;
//   for (let cur = head; cur; cur = cur.next) {
//     map.set(n, cur);
//     n += 1;
//   }
//   for (let i = n - 1; i >= 0; i -= 1) {
//     const cur = map.get(i);
//     cur.next = map.get(i - 1) || null;
//   }
//   return map.get(n - 1);
// }
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function makeParams(list) {
  const head = new ListNode();
  let pre = head;
  for (let i = 0; i < list.length; i += 1) {
    pre.next = new ListNode(list[i]);
    pre = pre.next;
  }
  return head.next;
}

const res1 = reverseList(makeParams([1, 2, 3, 4, 5]));
