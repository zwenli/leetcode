/*
 * @lc app=leetcode.cn id=641 lang=javascript
 *
 * [641] 设计循环双端队列
 */

// @lc code=start

// TODO
// 2.链表实现；
class MyCircularDeque {
  // 1. 数组实现，两个指针
  /**
   * Initialize your data structure here. Set the size of the deque to be k.
   * @param {number} k
   */
  constructor(k) {
    // front 指向队列头部第 1 个有效数据的位置
    // rear 指向队列尾部（即最后 1 个有效数据）的 下一个位置，即下一个从队尾入队元素的位置。
    this.capacity = k + 1; // 预留一个空白位置，解决队列满和队列空判断条件冲突的问题
    this.data = new Array(this.capacity);
    this.front = 0; // insert 先-1再赋值，front指向的就是当前front
    this.rear = 0; // insert 先赋值，再+1，rear-1才是指向rear
  }

  /**
   * Adds an item at the front of Deque. Return true if the operation is successful.
   * @param {number} value
   * @return {boolean}
   */
  insertFront(value) {
    if (this.isFull()) return false;
    // 往前移一位，注意越界问题
    this.front = (this.front - 1 + this.capacity) % this.capacity;
    this.data[this.front] = value;
    return true;
  }

  /**
   * Adds an item at the rear of Deque. Return true if the operation is successful.
   * @param {number} value
   * @return {boolean}
   */
  insertLast(value) {
    if (this.isFull()) return false;
    this.data[this.rear] = value;
    this.rear = (this.rear + 1) % this.capacity;
    return true;
  }

  /**
   * Deletes an item from the front of Deque. Return true if the operation is successful.
   * @return {boolean}
   */
  deleteFront() {
    if (this.isEmpty()) return false;
    this.front = (this.front + 1) % this.capacity;
    return true;
  }

  /**
   * Deletes an item from the rear of Deque. Return true if the operation is successful.
   * @return {boolean}
   */
  deleteLast() {
    if (this.isEmpty()) return false;
    this.rear = (this.rear - 1 + this.capacity) % this.capacity;
    return true;
  }

  /**
   * Get the front item from the deque.
   * @return {number}
   */
  getFront() {
    if (this.isEmpty()) return -1;
    return this.data[this.front];
  }

  /**
   * Get the last item from the deque.
   * @return {number}
   */
  getRear() {
    if (this.isEmpty()) return -1;
    return this.data[(this.rear - 1 + this.capacity) % this.capacity];
  }

  /**
   * Checks whether the circular deque is empty or not.
   * @return {boolean}
   */
  isEmpty() {
    return this.front === this.rear;
  }

  /**
   * Checks whether the circular deque is full or not.
   * @return {boolean}
   */
  isFull() {
    return (this.rear + 1) % this.capacity === this.front;
  }
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
// @lc code=end

const obj = new MyCircularDeque(3);
const param_1 = obj.insertLast(1); // true
const param_2 = obj.insertLast(2); // true
const param_3 = obj.insertFront(3); // true
const param_4 = obj.insertFront(4); // false
const param_5 = obj.getRear(); // 2
const param_6 = obj.isFull(); // true
const param_7 = obj.deleteLast(); // true
const param_8 = obj.insertFront(4); // true
const param_9 = obj.getFront(4); // true
