class MyQueue {
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.data = []
  }
  get length() {
    return this.data.length
  }
  set length(val) {
    this.data.length = val
  }
  /**
   * Push element x to the back of queue. 
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.data.push(x)
  }
  /**
   * Removes the element from in front of queue and returns that element.
   * @return {number}
   */
  pop() {
    if (!this.length) return null
    const res = this.peek()
    for (let i = 1; i < this.length; i++) {
      this.data[i - 1] = this.data[i]
    }
    this.length -= 1
    return res
  }
  /**
   * Get the front element.
   * @return {number}
   */
  peek() {
    if (!this.length) return null
    return this.data[0]
  }
  /**
   * Returns whether the queue is empty.
   * @return {boolean}
   */
  empty() {
    return this.length === 0
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

var queue = new MyQueue()
queue.push(1)
queue.push(2)
queue.peek()
queue.pop()
queue.empty()
console.log(queue)