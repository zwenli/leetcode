/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=138 lang=javascript
 *
 * [138] 复制带随机指针的链表
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
  if (!head) return head;
  const map = new Map();
  let curr = head;
  // 第一次循环，复制节点
  while (curr) {
    const copyNode = new Node(curr.val, curr.next, curr.random);
    map.set(curr, copyNode);
    curr = curr.next;
  }
  curr = head;
  // 第二次循环，将复制节点的next，random指向对应的复制节点
  while (curr) {
    const copyNode = map.get(curr);
    copyNode.next = map.get(copyNode.next) || null;
    copyNode.random = map.get(copyNode.random) || null;
    curr = curr.next;
  }
  return map.get(head);
}
// @lc code=end

// Definition for a Node.
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

// [[7,null],[13,0],[11,4],[10,2],[1,0]]
function makeParams(list) {
  if (!list) return null;
  const map = [];
  const dummy = new Node(null, null, null);
  let prev = dummy;
  let curr = dummy;
  const l = list.length;
  for (let i = 0; i < l; i += 1) {
    curr = new Node(list[i][0], null, null);
    prev.next = curr;
    map.push(curr);
    prev = curr;
  }
  for (let i = 0; i < l; i += 1) {
    const random = list[i][1];
    const node = map[i];
    if (random != null) {
      node.random = map[random];
    }
  }
  return dummy.next;
}

const res1 = copyRandomList(makeParams([[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]));
