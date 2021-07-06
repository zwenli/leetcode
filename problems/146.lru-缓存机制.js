/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存机制
 */

// @lc code=start

class DLinkedNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.tail = null;
  }
}

class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.cache = new Map();
    this.head = new DLinkedNode(null, 'head');
    this.tail = new DLinkedNode(null, 'tail');
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this.moveToHead(node);
    return node.value;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    let node = this.cache.get(key);
    if (!node) {
      // 节点不存在创建新节点
      node = new DLinkedNode(key, value);
      this.cache.set(key, node);
      this.addToHead(node);
      this.size += 1;
      // 超过容量，删除最后一个节点
      if (this.size > this.capacity) {
        const tail = this.removeTail();
        this.cache.delete(tail.key);
        this.size -= 1;
      }
    } else {
      // key对应的节点已存在，更新value，并将节点移动到头部
      node.value = value;
      this.moveToHead(node);
    }
  }

  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  removeTail() {
    const tail = this.tail.prev;
    this.removeNode(tail);
    return tail;
  }
}

// class Node {
//   constructor(key, val) {
//     this.key = key;
//     this.val = val;
//     this.prev = null;
//     this.next = null;
//   }
// }
// class DoubleLinkedList {
//   constructor() {
//     this.size = 0;
//     this.head = new Node(null, 'head');
//     this.tail = new Node(null, 'tail');
//     this.head.next = this.tail;
//     this.tail.prev = this.head;
//   }

//   addFirst(x) {
//     this.size += 1;
//     this.head.next.prev = x;
//     x.next = this.head.next;
//     this.head.next = x;
//     x.prev = this.head;
//   }

//   remove(x) {
//     if (this.size === 0) return null;
//     this.size -= 1;
//     x.prev.next = x.next;
//     x.next.prev = x.prev;
//     x.next = null;
//     x.prev = null;
//     return x;
//   }

//   removeLast() {
//     if (this.size === 0) return null;
//     this.size -= 1;
//     const x = this.tail.prev;
//     x.prev.next = this.tail;
//     this.tail.prev = x.prev;
//     x.next = null;
//     x.prev = null;
//     return x;
//   }
// }

// class LRUCache {
//   /**
//    * @param {number} capacity
//    */
//   constructor(capacity) {
//     this.capacity = capacity;
//     this.map = new Map();
//     this.cache = new DoubleLinkedList();
//   }

//   /**
//    * @param {number} key
//    * @return {number}
//    */
//   get(key) {
//     if (!this.map.has(key)) return -1;
//     const { val } = this.map.get(key);
//     // 将数据提前到头部
//     this.put(key, val);
//     return val;
//   }

//   /**
//    * @param {number} key
//    * @param {number} value
//    * @return {void}
//    */
//   put(key, value) {
//     const x = new Node(key, value);
//     if (this.map.has(key)) {
//       // 删除旧节点，新节点插入到头部
//       this.cache.remove(this.map.get(key));
//       this.cache.addFirst(x);
//       this.map.set(key, x);
//     } else {
//       // 判断容量是否已满
//       if (this.capacity === this.cache.size) {
//         // 删除最后一个元素
//         // node什么要同时存key,val的原因，
//         // 删除的时候可以找到对应的key，删除map对应的键
//         const last = this.cache.removeLast();
//         this.map.delete(last.key);
//       }
//       // 新节点插入到头部
//       this.cache.addFirst(x);
//       this.map.set(key, x);
//     }
//   }
// }

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

// const linkedList = new DoubleLinkedList();
// const tre = new Node(3, '3');
// linkedList.addFirst(tre); // 3
// linkedList.addFirst(new Node(5, '5')); // 3 -> 5
// linkedList.remove(tre); // 5
// linkedList.addFirst(new Node(6, '6')); // 6 -> 5
// linkedList.removeLast(); // 6

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lRUCache.get(1)); // 返回 1
lRUCache.put(3, 3);// 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
console.log(lRUCache.get(2)); // 返回 -1 (未找到)
lRUCache.put(4, 4);// 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(lRUCache.get(1)); // 返回 -1 (未找到)
console.log(lRUCache.get(3)); // 返回 3
console.log(lRUCache.get(4)); // 返回 4
