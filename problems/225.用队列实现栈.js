/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
class MyStack {
  constructor() {
    this.data = [];
  }

  get length() {
    return this.data.length;
  }

  /**
   * Push element x onto stack.
   * @param {number} x
   * @return {void}
   */
  push(x) {
    this.data[this.length] = x;
  }

  /**
   * Removes the element on top of the stack and returns that element.
   * @return {number}
   */
  pop() {
    return this.data.pop();
  }

  /**
   * Get the top element.
   * @return {number}
   */
  top() {
    return this.data[this.length - 1];
  }

  /**
   * Returns whether the stack is empty.
   * @return {boolean}
   */
  empty() {
    return this.length === 0;
  }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end
