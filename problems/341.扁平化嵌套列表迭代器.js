/*
 * @lc app=leetcode.cn id=341 lang=javascript
 *
 * [341] 扁平化嵌套列表迭代器
 */

// @lc code=start
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */

// class NestedIterator {
//   /**
//    * @constructor
//    * @param {NestedInteger[]} nestedList
//    */
//   constructor(nestedList) {
//     this.queue = []
//     this._flat(nestedList)
//   }
//   /**
//    * @this NestedIterator
//    * @returns {boolean}
//    */
//   hasNext() {
//     return this.queue.length > 0
//   }
//   /**
//    * @this NestedIterator
//    * @returns {integer}
//    */
//   next() {
//     return this.queue.shift()
//   }
//   _flat(arr) {
//     // dfs
//     for (const item of arr) {
//       if (item.isInteger()) {
//         this.queue.push(item.getInteger())
//       } else {
//         this._flat(item.getList())
//       }
//     }
//   }
// }

class NestedIterator {
  /**
   * @constructor
   * @param {NestedInteger[]} nestedList
   */
  constructor(nestedList) {
    // 这种方式是不对所有元素进行预处理，
    // 而是先将所有的 NestedInteger 逆序放到栈中，当需要展开的时候才进行展开。
    this.stack = []
    this.prepareStack(nestedList)
  }
  /**
   * @this NestedIterator
   * @returns {boolean}
   */
  hasNext() {
    while (this.stack.length > 0 && !this.stack[this.stack.length - 1].isInteger()) {
      const list = this.stack.pop().getList()
      this.prepareStack(list)
    }
    return this.stack.length > 0
  }
  /**
   * @this NestedIterator
   * @returns {integer}
   */
  next() {
    if (!this.hasNext()) return null
    return this.stack.pop().getInteger()
  }
  prepareStack(nestedList) {
    for (let i = nestedList.length - 1; i >= 0; i--) {
      this.stack.push(nestedList[i])
    }
  }
}

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
 */
// @lc code=end

const assert = require('node:assert/strict')

// function getResult(nestedList) {
//   const i = new NestedIterator(nestedList)
//   const res = []
//   while (i.hasNext()) {
//     res.push(i.next())
//   }
//   return res
// }

// const res1 = getResult([[1, 1], 2, [1, 1]])
// assert.deepEqual(res1, [1, 1, 2, 1, 1])

// const res2 = getResult([1, [4, [6]]])
// assert.deepEqual(res2, [1, 4, 6])
