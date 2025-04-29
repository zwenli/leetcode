/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

function findKthLargest(nums, k) {
  const pq = new MinPQ()
  for (const num of nums) {
    if (pq.size < k) {
      pq.insert(num)
    } else {
      if (num > pq.min()) {
        pq.delMin()
        pq.insert(num)
      }
    }
  }
  return pq.min()
}

class MinPQ {
  constructor(compareTo = (a, b) => a - b) {
    this.compareTo = compareTo;
    this.N = 0;
    this.pq = [null]; // 位置0为哨兵
  }

  // peek
  min() {
    return this.pq[1];
  }

  // poll
  delMin() {
    const min = this.pq[1];
    this.exch(1, this.N);
    this.pq[this.N] = null;
    this.N -= 1;
    this.sink(1);
    return min;
  }

  // offer
  insert(e) {
    this.N += 1;
    this.pq[this.N] = e;
    this.swim(this.N);
  }

  get size() {
    return this.N;
  }

  /** 辅助函数 */
  /** 上浮第 k 个元素，以维护最小堆性质 */
  swim(k) {
    while (k > 1 && this.greater(this.parent(k), k)) {
      // 如果第k个元素比父元素小，交换
      this.exch(k, this.parent(k));
      k = this.parent(k);
    }
  }

  /** 下沉第 k 个元素，以维护最小堆性质 */
  sink(k) {
    while (this.left(k) <= this.N) {
      let j = this.left(k);
      // 找出左右节点的最小节点
      if (j < this.N && this.greater(j, j + 1)) {
        j += 1;
      }
      // 如果k比两个元素都小，不必下沉
      if (this.greater(j, k)) break;
      this.exch(j, k);
      k = j;
    }
  }

  exch(i, j) {
    const tmp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = tmp;
  }

  /** pq[i] 是否比 pq[j] 大 */
  greater(i, j) {
    return this.compareTo(this.pq[i], this.pq[j]) > 0;
  }

  parent(k) {
    return k >> 1;
  }

  left(k) {
    return k * 2;
  }

  right(k) {
    return k * 2 + 1;
  }
}

// function findKthLargest(nums, k) {
//   const n = nums.length
//   nums.sort((a, b) => a - b)
//   return nums[n - k]
// }
// @lc code=end

const assert = require('assert').strict

const res1 = findKthLargest([3, 2, 1, 5, 6, 4], 2)
assert.equal(res1, 5)

const res2 = findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)
assert.equal(res2, 4)

/**
 * https://leetcode.com/problems/kth-largest-element-in-an-array/discuss/60294/Solution-explained
 */
