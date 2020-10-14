/*
 * @lc app=leetcode.cn id=705 lang=javascript
 *
 * [705] 设计哈希集合
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
class MyHashSet {
  // TTODO：参考官方题解方法1去优化下
  constructor() {
    this.container = [];
  }

  /**
   * @param {number} key
   * @return {void}
   */
  add(key) {
    if (!this.contains(key)) {
      this.container.push(key);
    }
  }

  /**
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    const index = this.container.findIndex((value) => value === key);
    if (index > -1) {
      this.container.splice(index, 1);
    }
  }

  /**
   * Returns true if this set contains the specified element
   * @param {number} key
   * @return {boolean}
   */
  contains(key) {
    return this.container.includes(key);
  }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
// @lc code=end

// class MyHashSet {
//   // 基于数组实现的
//   // 空间复杂度O(n)
//   // 插入O(1)，读，删O(n)
//   constructor() {
//     this.container = [];
//   }

//   /**
//    * @param {number} key
//    * @return {void}
//    */
//   add(key) {
//     if (!this.contains(key)) {
//       this.container.push(key);
//     }
//   }

//   /**
//    * @param {number} key
//    * @return {void}
//    */
//   remove(key) {
//     const index = this.container.findIndex((value) => value === key);
//     if (index > -1) {
//       this.container.splice(index, 1);
//     }
//   }

//   /**
//    * Returns true if this set contains the specified element
//    * @param {number} key
//    * @return {boolean}
//    */
//   contains(key) {
//     return this.container.includes(key);
//   }
// }

const hashSet = new MyHashSet();
hashSet.add(1);
hashSet.add(2);
hashSet.contains(1); // 返回 true
hashSet.contains(3); // 返回 false (未找到)
hashSet.add(2);
hashSet.contains(2); // 返回 true
hashSet.remove(2);
hashSet.contains(2); // 返回  false (已经被删除)
// console.log(hashSet);
