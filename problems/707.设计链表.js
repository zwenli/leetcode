/*
 * @lc app=leetcode.cn id=707 lang=javascript
 *
 * [707] 设计链表
 */

// @lc code=start
class DoublyListNode {
  // 双链表节点
  constructor(val) {
    this.next = null;
    this.prev = null;
    this.val = val;
  }
}

class MyLinkedList {
  // 单链表
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.head = new DoublyListNode(null);
  }

  /**
   * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
   * @param {number} index
   * @return {number}
   */
  get(index) {
    let node = this.head.next;
    let j = 0;
    while (node !== null) {
      if (j === index) {
        return node.val;
      }
      j += 1;
      node = node.next;
    }
    return -1;
  }

  /**
   * Add a node of value val before the first element of the linked list.
   * After the insertion, the new node will be the first node of the linked list.
   * @param {number} val
   * @return {void}
   */
  addAtHead(val) {
    const nextNode = this.head.next;
    const currNode = new DoublyListNode(val);
    currNode.next = nextNode;
    currNode.prev = this.head;
    this.head.next = currNode;
    if (nextNode) {
      nextNode.prev = currNode;
    }
  }

  /**
   * Append a node of value val to the last element of the linked list.
   * @param {number} val
   * @return {void}
   */
  addAtTail(val) {
    const tailNode = new DoublyListNode(val);
    let prevNode = this.head;
    while (prevNode.next) {
      prevNode = prevNode.next;
    }
    prevNode.next = tailNode;
    tailNode.prev = prevNode;
  }

  /**
   * Add a node of value val before the index-th node in the linked list.
   * If index equals to the length of linked list,
   * the node will be appended to the end of linked list.
   * If index is greater than the length, the node will not be inserted.
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  addAtIndex(index, val) {
    let prevNode = this.head;
    let j = -1;
    // 如果index不是大于0，直接不循环
    while (index > 0 && j < index - 1 && prevNode.next) {
      prevNode = prevNode.next;
      j += 1;
    }
    // 两种情况：插入到head；index在链表的长度之内
    if (index <= 0 || j === index - 1) {
      const currNode = new DoublyListNode(val);
      const nextNode = prevNode.next;
      currNode.next = nextNode;
      currNode.prev = prevNode;
      prevNode.next = currNode;
      if (nextNode) {
        nextNode.prev = currNode;
      }
    }
  }

  /**
   * Delete the index-th node in the linked list, if the index is valid.
   * @param {number} index
   * @return {void}
   */
  deleteAtIndex(index) {
    let currNode = this.head.next;
    if (index < 0 || !currNode) return;

    let j = 0;
    while (currNode.next && j < index) {
      currNode = currNode.next;
      j += 1;
    }
    if (j === index) {
      const prevNode = currNode.prev;
      const nextNode = currNode.next;
      prevNode.next = nextNode;
      if (nextNode) {
        nextNode.prev = prevNode;
      }
    }
  }

  // toString() {
  //   const arr = [];
  //   let curNode = this.head.next;
  //   while (curNode) {
  //     arr.push(curNode.val);
  //     curNode = curNode.next;
  //   }
  //   return arr.join(' -> ');
  // }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end

// class SinglyListNode {
//   // 单链表节点
//   constructor(val) {
//     this.next = null;
//     this.val = val;
//   }
// }

// class MyLinkedList {
//   // 单链表
//   /**
//    * Initialize your data structure here.
//    */
//   constructor() {
//     this.head = new SinglyListNode(null);
//   }

//   /**
//    * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
//    * @param {number} index
//    * @return {number}
//    */
//   get(index) {
//     // 取首个节点
//     let node = this.head.next;
//     let j = 0;
//     while (node !== null) {
//       if (j === index) {
//         return node.val;
//       }
//       j += 1;
//       node = node.next;
//     }
//     return -1;
//   }

//   /**
//    * Add a node of value val before the first element of the linked list.
//    * After the insertion, the new node will be the first node of the linked list.
//    * @param {number} val
//    * @return {void}
//    */
//   addAtHead(val) {
//     const curNode = new SinglyListNode(val);
//     const nextNode = this.head.next;
//     this.head.next = curNode;
//     curNode.next = nextNode;
//   }

//   /**
//    * Append a node of value val to the last element of the linked list.
//    * @param {number} val
//    * @return {void}
//    */
//   addAtTail(val) {
//     const curNode = new SinglyListNode(val);
//     let preNode = this.head;
//     while (preNode.next !== null) {
//       preNode = preNode.next;
//     }
//     preNode.next = curNode;
//   }

//   /**
//    * Add a node of value val before the index-th node in the linked list.
//    * If index equals to the length of linked list,
//    * the node will be appended to the end of linked list.
//    * If index is greater than the length, the node will not be inserted.
//    * @param {number} index
//    * @param {number} val
//    * @return {void}
//    */
//   addAtIndex(index, val) {
//     if (index <= 0) {
//       this.addAtHead(val);
//       return;
//     }
//     // 这里理解为找上一个元素
//     let j = 0;
//     let preNode = this.head.next;
//     while (preNode.next !== null && j < index - 1) {
//       preNode = preNode.next;
//       j += 1;
//     }
//     if (j === index - 1) {
//       const curNode = new SinglyListNode(val);
//       const nextNode = preNode.next;
//       preNode.next = curNode;
//       curNode.next = nextNode;
//     }
//   }

//   /**
//    * Delete the index-th node in the linked list, if the index is valid.
//    * @param {number} index
//    * @return {void}
//    */
//   deleteAtIndex(index) {
//     if (index < 0) return;
//     let j = 0;
//     let preNode = this.head;
//     let curNode = this.head.next;
//     while (curNode.next !== null && j < index) {
//       preNode = curNode;
//       curNode = curNode.next;
//       j += 1;
//     }
//     if (j === index) {
//       preNode.next = curNode.next;
//       curNode.next = null;
//     }
//   }

//   toString() {
//     const arr = [];
//     let curNode = this.head.next;
//     while (curNode) {
//       arr.push(curNode.val);
//       curNode = curNode.next;
//     }
//     return arr.join(' -> ');
//   }
// }

const linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1, 2); // 链表变为1-> 2-> 3
linkedList.get(1); // 返回2
linkedList.deleteAtIndex(1); // 现在链表是1-> 3
linkedList.get(1); // 返回3
