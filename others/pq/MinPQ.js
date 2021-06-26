/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */

/**
 * 最小优先队列
 */
class MinPQ {
  constructor(compareTo = (a, b) => a - b) {
    this.compareTo = compareTo;
    this.N = 0;
    this.pq = [null]; // 位置0为哨兵
  }

  max() {
    return this.pq[1];
  }

  delMax() {
    const min = this.pq[1];
    this.exch(1, this.N);
    this.pq[this.N] = null;
    this.N -= 1;
    this.sink(1);
    return min;
  }

  insert(e) {
    this.N += 1;
    this.pq[this.N] = e;
    this.swim(this.N);
  }

  get size() {
    return this.N;
  }

  /** 辅助函数 */
  /** 上浮第 k 个元素，以维护最大堆性质 */
  swim(k) {
    while (k > 1 && this.greater(this.parent(k), k)) {
      // 如果第k个元素比父元素小，交换
      this.exch(k, this.parent(k));
      k = this.parent(k);
    }
  }

  /** 下沉第 k 个元素，以维护最大堆性质 */
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

const minpq = new MinPQ();
minpq.insert(3); //
minpq.insert(6); //
minpq.insert(1); //
minpq.insert(8); //
console.log(minpq.max()); // 1
minpq.delMax(); // 1
console.log(minpq.max()); // 3
minpq.insert(2);
console.log(minpq.max()); // 2
