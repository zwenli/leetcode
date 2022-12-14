class MinPQ {
  constructor(compareTo = (a, b) => a - b) {
    this.compareTo = compareTo
    this.N = 0
    this.pq = [null] // 位置0为哨兵
  }

  peek() {
    return this.pq[1]
  }

  poll() {
    const min = this.pq[1]
    this.exch(1, this.N)
    this.pq[this.N] = null
    this.N -= 1
    this.sink(1)
    return min
  }

  offer(e) {
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

function magicTower(nums) {
  // 贪心+优先队列
  let sum = 1
  for (let num of nums) {
    sum += num
  }
  // 算出所有回合后的血量是否为正数
  if (sum <= 0) return -1

  let health = 1
  let step = 0
  const pq = new MinPQ()
  for (let num of nums) {
    if (num < 0) {
      // 记录扣减的血量
      pq.offer(num)
      if (health + num <= 0) {
        // 这个回合扣血后会死亡，需要把先前扣最多的血移动到最后面去
        step += 1 // 记录移动次数
        health -= pq.poll() // 回复之前扣最多的血量
      }
    }
    health += num
  }
  return step
}

const assert = require('node:assert').strict

const res1 = magicTower([100, 100, 100, -250, -60, -140, -50, -50, 100, 150])
assert.equal(res1, 1)

const res2 = magicTower([-200, -300, 400, 0])
assert.equal(res2, -1)
