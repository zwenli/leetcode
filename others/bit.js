/**
 * 树状数组，又名Fenwick树
 * 数组中的索引从1开始计数，索引0不放元素。
 * 数组C是对数组A的预处理数组
 */
class BinaryIndexedTree {
  constructor(size) {
    this.size = size
    this.tree = new Array(size + 1).fill(0)
  }
  add(index, value) {
    // 从下到上更新
    // 注意，预处理数组，比原始数组的大小大1
    // 故预处理索引的最大值为 size
    while (index <= this.size) {
      this.tree[index] += value
      index += this.lowbit(index)
    }
  }
  /**
   * 查询前缀和，即查询区间[0, index]的所有元素之和
   * @param {number} index
   * @returns
   */
  prefixSum(index) {
    let sum = 0
    while (index > 0) {
      sum += this.tree[index]
      index -= this.lowbit(index)
    }
    return sum
  }
  /**
   * 查询区间和 [left, right]
   * @param {number} left
   * @param {} right
   * @returns
   */
  range(left, right) {
    return this.prefixSum(right) - this.prefixSum(left - 1)
  }
  /**
   * 返回最后一个1的位置所代表的数值.
   * @param {number} x
   * @returns
   */
  lowbit(x) {
    return x & -x
  }
}

const assert = require('node:assert').strict
const arr = [1, 2, 3, 4, 5]
const bit = new BinaryIndexedTree(arr.length)
for (let i = 0; i < arr.length; i++) {
  bit.add(i + 1, arr[i])
}

assert.equal(bit.range(2 + 1, 3 + 1), 7)
