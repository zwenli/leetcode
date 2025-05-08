/*
 * @lc app=leetcode.cn id=502 lang=javascript
 *
 * [502] IPO
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
function findMaximizedCapital(k, w, profits, capital) {
  // 使用贪心算法结合最大堆来高效选择最优项目组合

  // 组合资本需求和利润，创建二维数组
  const n = profits.length
  const arr = new Array(n)
  for (let i = 0; i < n; i++) {
    arr[i] = [capital[i], profits[i]]
  }
  // 按资本需求升序排序（方便后续筛选可执行项目）
  arr.sort((a, b) => a[0] - b[0]) // 创建最大堆（用于快速获取最大利润）
  const pq = new MaxPQ() // 数组遍历指针（跟踪处理进度）
  let cur = 0
  // 主逻辑：最多选择k个项目
  for (let i = 0; i < k; i++) {
    while (cur < n && arr[cur][0] <= w) {
      pq.insert(arr[cur][1]) // 将利润加入最大堆
      cur++
    }
    // 选择利润最大的项目
    if (pq.size) {
      w += pq.delMax() // 累加最大利润，更新资金池
    } else {
      break // 没有可选项目时提前终止
    }
  }
  return w
}

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
// @lc code=end
