/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */

/**
 * 最大优先队列
 */
class MaxPQ {
  constructor(compareTo = (a, b) => a - b) {
    this.compareTo = compareTo;
    this.N = 0;
    this.pq = [null]; // 位置0为哨兵
  }

  max() {
    return this.pq[1];
  }

  delMax() {
    const max = this.pq[1];
    // 把这个最大元素换到最后，删除之
    this.exch(1, this.N);
    this.pq[this.N] = null;
    this.N -= 1;
    // 让 pq[1] 下沉到正确位置
    this.sink(1);
    return max;
  }

  insert(e) {
    this.N += 1;
    // 先把新元素加到最后
    this.pq[this.N] = e;
    // 然后让它上浮到正确的位置
    this.swim(this.N);
  }

  get size() {
    return this.N;
  }

  /** 辅助函数 */
  /** 上浮第 k 个元素，以维护最大堆性质 */
  swim(k) {
    // 浮到堆顶，停止上浮
    while (k > 1 && this.less(this.parent(k), k)) {
      // 如果第k个元素比父级元素大，交换
      this.exch(k, this.parent(k));
      k = this.parent(k);
    }
  }

  /** 下沉第 k 个元素，以维护最大堆性质 */
  sink(k) {
    while (this.left(k) <= this.N) {
      // 先找出左节点
      let j = this.left(k);
      // 如果右节点存在，对比大小，取最大值
      if (j < this.N && this.less(j, j + 1)) {
        j += 1;
      }
      // 如果左右节点的最大值都比k小，就不必下沉了。
      if (this.less(j, k)) break;
      this.exch(j, k);
      k = j;
    }
  }

  exch(i, j) {
    const tmp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = tmp;
  }

  /** pq[i] 是否比 pq[j] 小 */
  less(i, j) {
    return this.compareTo(this.pq[i], this.pq[j]) < 0;
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

const maxpq = new MaxPQ();
maxpq.insert(3); //
maxpq.insert(6); //
maxpq.insert(1); //
maxpq.insert(8); //
console.log(maxpq.max()); // 8
maxpq.delMax(); // 8
console.log(maxpq.max()); // 6
maxpq.insert(11);
console.log(maxpq.max()); // 11
