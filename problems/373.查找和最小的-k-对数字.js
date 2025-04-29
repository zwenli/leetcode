/*
 * @lc app=leetcode.cn id=373 lang=javascript
 *
 * [373] 查找和最小的 K 对数字
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  // https://leetcode.com/problems/find-k-pairs-with-smallest-sums/solutions/84551/simple-java-o-klogk-solution-with-explanation/?envType=study-plan-v2&envId=top-interview-150
  const pq = new MinPQ((a, b) => a[0] + a[1] - b[0] - b[1])
  const res = []
  if (!nums1.length || !nums2.length || !k) return res
  for (let i = 0; i < k && i < nums1.length; i++) {
    pq.insert([nums1[i], nums2[0], 0])
  }
  while (k-- > 0 && pq.size) {
    const cur = pq.delMin()
    res.push([cur[0], cur[1]])
    if (cur[2] === nums2.length - 1) continue
    pq.insert([cur[0], nums2[cur[2] + 1], cur[2] + 1])
  }
  return res
}

class MinPQ {
  constructor(compareTo = (a, b) => a - b) {
    this.compareTo = compareTo
    this.N = 0
    this.pq = [null] // 位置0为哨兵
  }

  // peek
  min() {
    return this.pq[1]
  }

  // poll
  delMin() {
    const min = this.pq[1]
    this.exch(1, this.N)
    this.pq[this.N] = null
    this.N -= 1
    this.sink(1)
    return min
  }

  // offer
  insert(e) {
    this.N += 1
    this.pq[this.N] = e
    this.swim(this.N)
  }

  get size() {
    return this.N
  }

  /** 辅助函数 */
  /** 上浮第 k 个元素，以维护最小堆性质 */
  swim(k) {
    while (k > 1 && this.greater(this.parent(k), k)) {
      // 如果第k个元素比父元素小，交换
      this.exch(k, this.parent(k))
      k = this.parent(k)
    }
  }

  /** 下沉第 k 个元素，以维护最小堆性质 */
  sink(k) {
    while (this.left(k) <= this.N) {
      let j = this.left(k)
      // 找出左右节点的最小节点
      if (j < this.N && this.greater(j, j + 1)) {
        j += 1
      }
      // 如果k比两个元素都小，不必下沉
      if (this.greater(j, k)) break
      this.exch(j, k)
      k = j
    }
  }

  exch(i, j) {
    const tmp = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = tmp
  }

  /** pq[i] 是否比 pq[j] 大 */
  greater(i, j) {
    return this.compareTo(this.pq[i], this.pq[j]) > 0
  }

  parent(k) {
    return k >> 1
  }

  left(k) {
    return k * 2
  }

  right(k) {
    return k * 2 + 1
  }
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = kSmallestPairs([1, 7, 11], [2, 4, 6], 3)
assert.deepEqual(res1, [
  [1, 2],
  [1, 4],
  [1, 6],
])

const res2 = kSmallestPairs([1, 1, 2], [1, 2, 3], 2)
assert.deepEqual(res2, [
  [1, 1],
  [1, 1],
])
