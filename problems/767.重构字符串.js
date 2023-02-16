/*
 * @lc app=leetcode.cn id=767 lang=javascript
 *
 * [767] 重构字符串
 */
// @lc code=start
class MaxPQ {
  constructor(compareTo = (a, b) => a - b) {
    this.compareTo = compareTo
    this.N = 0
    this.pq = [null] // 位置0为哨兵
  }

  max() {
    return this.pq[1]
  }

  delMax() {
    const max = this.pq[1]
    // 把这个最大元素换到最后，删除之
    this.exch(1, this.N)
    this.pq[this.N] = null
    this.N -= 1
    // 让 pq[1] 下沉到正确位置
    this.sink(1)
    return max
  }

  insert(e) {
    this.N += 1
    // 先把新元素加到最后
    this.pq[this.N] = e
    // 然后让它上浮到正确的位置
    this.swim(this.N)
  }

  get size() {
    return this.N
  }

  /** 辅助函数 */
  /** 上浮第 k 个元素，以维护最大堆性质 */
  swim(k) {
    // 浮到堆顶，停止上浮
    while (k > 1 && this.less(this.parent(k), k)) {
      // 如果第k个元素比父级元素大，交换
      this.exch(k, this.parent(k))
      k = this.parent(k)
    }
  }

  /** 下沉第 k 个元素，以维护最大堆性质 */
  sink(k) {
    while (this.left(k) <= this.N) {
      // 先找出左节点
      let j = this.left(k)
      // 如果右节点存在，对比大小，取最大值
      if (j < this.N && this.less(j, j + 1)) {
        j += 1
      }
      // 如果左右节点的最大值都比k小，就不必下沉了。
      if (this.less(j, k)) break
      this.exch(j, k)
      k = j
    }
  }

  exch(i, j) {
    const tmp = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = tmp
  }

  /** pq[i] 是否比 pq[j] 小 */
  less(i, j) {
    return this.compareTo(this.pq[i], this.pq[j]) < 0
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
// /**
//  * @param {string} s
//  * @return {string}
//  */
// var reorganizeString = function (s) {
//   // 基于最大堆的贪心，每次取前两个最大的字母
//   const length = s.length
//   let maxCount = 0
//   const counts = {}
//   // 统计字母数量
//   for (const c of s) {
//     counts[c] = (counts[c] ?? 0) + 1
//     maxCount = Math.max(maxCount, counts[c])
//   }
//   // 重复字母最大数量超过长度一半，必定会出现现相邻的字母相同的情况，
//   // 故是无法重构的
//   if ((length + 1) >> 1 < maxCount) return ''

//   const pq = new MaxPQ((a, b) => a.count - b.count)
//   Object.keys(counts).forEach((char) => {
//     pq.insert({
//       char,
//       count: counts[char],
//     })
//   })
//   let ans = []
//   while (pq.size > 1) {
//     const x = pq.delMax()
//     const y = pq.delMax()
//     ans.push(x.char + y.char)
//     x.count -= 1
//     y.count -= 1
//     if (x.count > 0) pq.insert(x)
//     if (y.count > 0) pq.insert(y)
//   }
//   if (pq.size) {
//     ans.push(pq.delMax().char)
//   }
//   return ans.join('')
// }

/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function (s) {
  // 贪心 + 桶思想
  // 1. 将相同的字母放入不同的桶中以保证其彼此不会相邻，因此桶的数目应等于字符串中最多的元素的数目
  // 2. 按贪心策略，优先填充数目最多的元素，对于每一种元素，循环在不同桶中进行填充，
  //    由于桶的个数等于字符串中最多的元素的数目，因此每个桶中不会出现相同的元素，填充完毕后将桶依次相连即为答案
  // 3. 
  const length = s.length
  let maxCount = 0
  const counts = {}
  // 统计字母数量
  for (const c of s) {
    counts[c] = (counts[c] ?? 0) + 1
    maxCount = Math.max(maxCount, counts[c])
  }
  if ((length + 1) >> 1 < maxCount) return ''
  const buckets = new Array(maxCount).fill('')
  const pq = new MaxPQ((a, b) => a.count - b.count)
  Object.keys(counts).forEach((char) => {
    pq.insert({
      char,
      count: counts[char],
    })
  })
  let index = 0
  while (pq.size) {
    // 优先填充数目最多的元素
    let { char, count } = pq.delMax()
    while (count) {
      buckets[index] += char
      count -= 1
      // 循环在不同桶中进行填充
      index = (index + 1) % maxCount
    }
  }
  return buckets.join('')
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = reorganizeString('aab')
assert.equal(res1, 'aba')

const res2 = reorganizeString('aaab')
assert.equal(res2, '')

const res3 = reorganizeString('aaabbc')
assert.equal(res3, 'ababac')

const res4 = reorganizeString('baaba')
assert.equal(res4, 'ababa')
