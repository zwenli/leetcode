/*
 * @lc app=leetcode.cn id=622 lang=javascript
 *
 * [622] 设计循环队列
 */

// @lc code=start

// 链表实现
// var Node = function(value, next) {
//   this.value = value
//   this.next = next || null
// }

// /**
//  * @param {number} k
//  */
// var MyCircularQueue = function (k) {
//   this.capacity = k
//   this.size = 0
//   this.head = this.tail = null
// }

// /**
//  * @param {number} value
//  * @return {boolean}
//  */
// MyCircularQueue.prototype.enQueue = function (value) {
//   if (this.isFull()) return false
//   const node = new Node(value)
//   if (this.head == null) {
//     this.head = node
//     this.tail = node
//   } else {
//     this.tail.next = node
//     this.tail = node
//   }
//   this.size += 1
//   return true
// }

// /**
//  * @return {boolean}
//  */
// MyCircularQueue.prototype.deQueue = function () {
//   if (this.isEmpty()) return false
//   this.head = this.head.next
//   this.size -= 1
//   return true
// }

// /**
//  * @return {number}
//  */
// MyCircularQueue.prototype.Front = function () {
//   if (this.isEmpty()) return -1
//   return this.head.value
// }

// /**
//  * @return {number}
//  */
// MyCircularQueue.prototype.Rear = function () {
//   if (this.isEmpty()) return -1
//   return this.tail.value
// }

// /**
//  * @return {boolean}
//  */
// MyCircularQueue.prototype.isEmpty = function () {
//   return this.size === 0
// }

// /**
//  * @return {boolean}
//  */
// MyCircularQueue.prototype.isFull = function () {
//   return this.size === this.capacity
// }

// 数组实现
var MyCircularQueue = function (k) {
  this.capacity = k + 1
  this.elements = new Array(this.capacity)
  this.front = this.rear = 0
}

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) return false
  this.elements[this.rear] = value
  this.rear = (this.rear + 1) % this.capacity
  return true
}

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false
  this.front = (this.front + 1) % this.capacity
  return true
}

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1
  return this.elements[this.front]
}

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1
  return this.elements[(this.rear - 1 + this.capacity) % this.capacity]
}

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return this.front === this.rear
}

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return (this.rear + 1) % this.capacity === this.front
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
// @lc code=end
