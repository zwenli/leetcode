/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

/**
 * 用最大堆实现优先队列
 * 如果元素不只是数组，可以改造less函数，
 * 构建对象时，传compare(i,j)比较函数，0 表示相等，1表示i>j, -1表示i<j, less函数调用这个函数实现比较
 * 如数字可以的可以实现为
 * function compare(i, j) { return i - j } //
 * function less(i,j) { return compare(pq[i], pq[j]) < 0};
 */
class MaxPQ {
  constructor() {
    this.pq = [null]; // index0不用
    this.N = 0; // 元素个数
  }

  max() {
    return this.pq[1];
  }

  /*
   * 插入元素 e
   * // 先把要插入的元素添加到堆底的最后，然后让其上浮到正确位置。
   */
  insert(e) {
    this.N += 1;
    // 先把新元素加到最后
    this.pq[this.N] = e;
    // 然后让它上浮到正确的位置
    this.swim(this.N);
  }

  /*
   * 删除并返回当前队列中最大元素
   * 先把堆顶元素 A 和堆底最后的元素 B 对调，然后删除 A，最 后让 B 下沉到正确位置。
   */
  delMax() {
    // 最大堆的堆顶就是最大元素
    const max = this.pq[1];
    // 把这个最大元素换到最后，删除之
    this.exch(1, this.N);
    this.pq[this.N] = null;
    this.N -= 1;
    // 让 pq[1] 下沉到正确位置
    this.sink(1);
    return max;
  }

  /* 上浮第 k 个元素，以维护最大堆性质 */
  swim(k) {
    // 如果浮到堆顶，就不能再上浮了
    while (k > 1 && this.less(this.parent(k), k)) {
      // 如果第 k 个元素比上层大
      // 将 k 换上去
      this.exch(this.parent(k), k);
      k = this.parent(k);
    }
  }

  /* 下沉第 k 个元素，以维护最大堆性质 */
  sink(k) {
    // 如果沉到堆底，就沉不下去了
    while (this.left(k) <= this.N) {
      // 先假设左边节点较大
      let older = this.left(k);
      // 如果右边节点存在，比一下大小
      if (this.right(k) <= this.N && this.less(older, this.right(k))) {
        older = this.right(k);
      }
      // 结点 k 比俩孩子都大，就不必下沉了
      if (this.less(older, k)) break;
      // 否则，不符合最大堆的结构，下沉 k 结点
      this.exch(older, k);
      k = older;
    }
  }

  /* 交换数组的两个元素 */
  exch(i, j) {
    const t = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = t;
  }

  /* pq[i] 是否比 pq[j] 小? */
  less(i, j) {
    return this.pq[i] < this.pq[j];
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

const mpq = new MaxPQ();
mpq.insert(3); //
mpq.insert(6); //
mpq.insert(1); //
mpq.insert(8); //
mpq.max(); // 8
mpq.delMax(); // 8
mpq.max(); // 6
mpq.insert(11);
mpq.max(); // 11
