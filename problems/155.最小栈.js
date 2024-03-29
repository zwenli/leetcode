/*
 * @lc app=leetcode.cn id=155 lang=javascript
 *
 * [155] 最小栈
 */

// @lc code=start
// TODO：1刷

// 方案4: 一个栈，无须二维的
// class MinStack {
//   constructor() {
//     this.stack = [];
//     this.min = Infinity;
//   }

//   /**
//    * @param {number} x
//    * @return {void}
//    */
//   push(x) {
//     if (x <= this.min) {
//       // 如果入栈的值小于等于当前最小值，就会先将当前最小值入栈，然后更新最小值为新的值。
//       this.stack.push(this.min);
//       this.min = x;
//     }
//     this.stack.push(x);
//   }

//   /**
//    * @return {void}
//    */
//   pop() {
//     // 出栈的值等于当前最小值时，说明当前最小值被弹出了。
//     // 因此需要再次调用this.stack.pop()来移除栈中的下一个元素，
//     // 并将这个元素的值赋给this.min，从而更新当前最小值。
//     // 如果 POP 操作可能导致当前最小值的更改，则 POP 两次并将当前最小值更改为最后一个最小值。
//     if (this.stack.pop() === this.min) this.min = this.stack.pop();
//   }

//   /**
//    * @return {number}
//    */
//   top() {
//     return this.stack[this.stack.length - 1];
//   }

//   /**
//    * @return {number}
//    */
//   getMin() {
//     return this.min;
//   }
// }

// 方案3: 链表实现
// 结点，记录当前值和最小值
class ListNode {
  constructor(val, min, next) {
    this.val = val;
    this.min = min;
    this.next = next;
  }
}

class MinStack {
  constructor() {
    // 用链表实现
    this.head = null;
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    if (this.isEmpty()) {
      this.head = new ListNode(x, x, null);
      return;
    }
    this.head = new ListNode(x, Math.min(this.head.min, x), this.head);
  }

  /**
   * @return {void}
   */
  pop() {
    this.head = this.head.next;
  }

  /**
   * @return {number}
   */
  top() {
    if (this.isEmpty()) return null;
    return this.head.val;
  }

  /**
   * @return {number}
   */
  getMin() {
    if (this.isEmpty()) return null;
    return this.head.min;
  }

  isEmpty() {
    return this.head === null;
  }
}

// class MinStack {
//   constructor() {
//     // 栈，存[val, min]
//     // {val, min} 也是可以的
//     this.stack = [];
//   }

//   /**
//    * @param {number} x
//    * @return {void}
//    */
//   push(x) {
//     if (this.isEmpty()) {
//       this.stack.push([x, x]);
//       return;
//     }
//     const cur = this.stack[this.stack.length - 1];
//     this.stack.push([x, Math.min(x, cur[1])]);
//   }

//   /**
//    * @return {void}
//    */
//   pop() {
//     this.stack.pop();
//   }

//   /**
//    * @return {number}
//    */
//   top() {
//     if (this.isEmpty()) return null;
//     return this.stack[this.stack.length - 1][0];
//   }

//   /**
//    * @return {number}
//    */
//   getMin() {
//     if (this.isEmpty()) return null;
//     return this.stack[this.stack.length - 1][1];
//   }

//   isEmpty() {
//     return this.stack.length === 0;
//   }
// }

// class MinStack {
//   constructor() {
//     // 栈加辅助栈实现
//     this.stack = [];
//     this.helper = [Infinity]; // 辅助栈
//   }

//   /**
//    * @param {number} x
//    * @return {void}
//    */
//   push(x) {
//     this.stack.push(x);
//     this.helper.push(Math.min(this.helper[this.helper.length - 1], x));
//   }

//   /**
//    * @return {void}
//    */
//   pop() {
//     this.helper.pop();
//     this.stack.pop();
//   }

//   /**
//    * @return {number}
//    */
//   top() {
//     return this.stack[this.stack.length - 1];
//   }

//   /**
//    * @return {number}
//    */
//   getMin() {
//     return this.helper[this.helper.length - 1];
//   }
// }

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end

// Your MinStack object will be instantiated and called as such:
const obj = new MinStack();
obj.push(-2);
obj.push(0);
obj.push(-3);
const param_3 = obj.getMin(); // -3
obj.pop();
const param_4 = obj.top(); // 0
const param_5 = obj.getMin(); // -2
