/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 合并两个有序链表
const merge = (head1, head2) => {
  const dummyHead = new ListNode(0)
  let prev = dummyHead
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

  if (head1 !== null) {
    prev.next = head1
  } else if (head2 !== null) {
    prev.next = head2
  }

  return dummyHead.next
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  // 自底向上的归并排序
  // https://leetcode.cn/problems/sort-list/solutions/492301/pai-xu-lian-biao-by-leetcode-solution/?envType=study-plan-v2&envId=top-interview-150
  if (head === null) return head
  const dummyHead = new ListNode(0, head)
  // 计算链表总长度
  let length = 0
  while (head !== null) {
    length++
    head = head.next
  }
  // 外层循环：按子链表长度倍增（1,2,4...）
  for (let subLength = 1; subLength < length; subLength <<= 1) {
    let prev = dummyHead // 用于连接合并后的链表
    let curr = dummyHead.next // 当前处理节点

    // 内层循环：处理当前subLength长度的所有子链表对
    while (curr !== null) {
      // 切割第一个subLength长度的子链表
      let head1 = curr
      for (let i = 1; i < subLength && curr.next !== null; i++) {
        curr = curr.next
      }

      // 切割第二个subLength长度的子链表
      let head2 = curr.next
      curr.next = null // 断开第一个子链表
      curr = head2
      for (
        let i = 1;
        i < subLength && curr !== null && curr.next !== null;
        i++
      ) {
        curr = curr.next
      }

      // 记录剩余链表并断开第二个子链表
      let next = null
      if (curr !== null) {
        next = curr.next
        curr.next = null
      }

      // 合并两个子链表并连接到结果链表
      const merged = merge(head1, head2)
      prev.next = merged
      // 移动prev到已排序部分的末尾
      while (prev.next !== null) {
        prev = prev.next
      }
      curr = next // 处理剩余链表
    }
  }

  return dummyHead.next
}

// var sortList = function (head) {
//   // 排序
//   if (!head) return null
//   const nodes = []
//   while (head) {
//     nodes.push(head)
//     head = head.next
//   }
//   nodes.sort((a, b) => a.val - b.val)
//   for (let i = 0; i < nodes.length; i++) {
//     nodes[i].next = i < nodes.length - 1 ? nodes[i + 1] : null
//   }
//   return nodes[0]
// }
// @lc code=end

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

const head = {
  val: 4,
  next: {
    val: 2,
    next: {
      val: 1,
      next: {
        val: 3,
        next: null,
      },
    },
  },
}

const res1 = sortList(head) // [1,2,3,4]
