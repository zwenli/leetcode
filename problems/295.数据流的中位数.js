/*
 * @lc app=leetcode.cn id=295 lang=javascript
 *
 * [295] 数据流的中位数
 */

// @lc code=start

class MedianFinder {
  constructor() {
    this.queMin = new PQ((a, b) => b - a) // 最大堆，维护小于等于中位数的数
    this.queMax = new PQ((a, b) => a - b) // 最小堆，维护大于中位数的数
  }
  /**
   * @param {number} num
   * @return {void}
   */
  addNum(num) {
    if (this.queMin.size === 0 || num <= this.queMin.top) {
      // num 小于等于中位数
      // 将元素加入 queMin
      this.queMin.insert(num)
      // 维护队列平衡：保证较小半区数量最多比大的半区多1个
      if (this.queMax.size + 1 < this.queMin.size) {
        // 将较小半区的最大值移到较大半区
        this.queMax.insert(this.queMin.delTop())
      }
    } else {
      // 将新元素加入较大数值半区（最小堆）
      this.queMax.insert(num)
      // 维护队列平衡：保证较小半区数量始终 >= 较大半区
      if (this.queMin.size < this.queMax.size) {
        // 将较大半区的最小值移到较小半区
        this.queMin.insert(this.queMax.delTop())
      }
    }
  }
  /**
   * @return {number}
   */
  findMedian() {
    if (this.queMin.size > this.queMax.size) {
      // 添加的数量为奇数时，由于 queMin 中的数的数量比 queMax 多一个
      // 此时中位数为 queMin 的队头
      return this.queMin.top
    }
    // 当累计添加的数的数量为偶数时，两个优先队列中的数的数量相同，
    // 此时中位数为它们的队头的平均值。
    return (this.queMin.top + this.queMax.top) / 2
  }
}

class PQ {
  constructor(compare = (a, b) => a - b) {
    this.compare = compare // 负数，优先级 a> b, 0 a = b, 正数 a < b
    this.pq = [null]
    this.N = 0
  }

  insert(e) {
    this.N++
    this.pq[this.N] = e
    this._swim(this.N)
  }

  delTop() {
    if (this.N === 0) return null
    const top = this.pq[1]
    this._exch(1, this.N)
    this.pq[this.N] = null
    this.N--
    this._sink(1)
    return top
  }

  get top() {
    return this.pq[1]
  }

  get size() {
    return this.N
  }

  _swim(k) {
    while (k > 1 && this.compare(this.pq[k], this.pq[this._parent(k)]) < 0) {
      this._exch(k, this._parent(k))
      k = this._parent(k)
    }
  }

  _sink(k) {
    while (this._left(k) <= this.N) {
      let j = this._left(k)
      if (j < this.N && this.compare(this.pq[j + 1], this.pq[j]) < 0) j++
      if (this.compare(this.pq[j], this.pq[k]) > 0) break
      this._exch(j, k)
      k = j
    }
  }

  _exch(i, j) {
    ;[this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]]
  }

  _parent(k) {
    return k >> 1
  }

  _left(k) {
    return k * 2
  }
  _right() {
    return k * 2 + 1
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end

const assert = require('node:assert/strict')

const res1 = new MedianFinder()
res1.addNum(1)
res1.addNum(2)
assert.equal(res1.findMedian(), 1.5)
res1.addNum(3)
assert.equal(res1.findMedian(), 2)
