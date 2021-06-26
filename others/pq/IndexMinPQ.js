/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */
/**
 * 索引最小优先队列
 */
class IndexMinPQ {
  constructor(maxN, compareTo = (a, b) => a - b) {
    this.maxN = maxN;
    this.compareTo = compareTo;
    this.keys = new Array(maxN + 1);
    this.pq = new Array(maxN + 1);
    this.qp = new Array(maxN + 1).fill(-1);
    this.N = 0;
  }

  insert(i, key) {
    // 整数超过
    if (!this.validateIndex(i)) return;
    if (this.contains(i)) return;
    this.N += 1;
    this.pq[this.N] = i;
    this.qp[i] = this.N;
    this.keys[i] = key;
    this.swim(this.N);
  }

  change(i, key) {
    if (!this.validateIndex(i)) return;
    if (!this.contains(i)) return;
    this.keys[i] = key;
    // 修改对象之后，需要调整下堆有序，上浮或下沉，
    // 两个都操作一下，就不用判断具体是执行哪个操作了。
    this.swim(this.qp[i]);
    this.sink(this.qp[i]);
  }

  contains(i) {
    return this.qp[i] !== -1;
  }

  delete(i) {
    if (!this.validateIndex(i)) return;
    if (!this.contains(i)) return;
    // i对应的对象和最后一个交换，上浮/下沉，删除最后一个
    const index = this.qp[i];
    this.exch(this.pq, i, this.N);
    this.N -= 1;
    this.swim(index);
    this.sink(index);
    this.qp[i] = -1;
    this.keys[i] = null;
  }

  /** 返回堆顶对象 */
  minKey() {
    return this.keys[this.pq[1]];
  }

  /** 返回堆顶对象关联的整数 */
  minIndex() {
    return this.pq[1];
  }

  /** 删除堆顶对象，并返回堆顶对象关联的整数 */
  delMin() {
    if (this.isEmpty()) return undefined;
    const index = this.minIndex();
    // 堆顶和最后一个元素交换，然后删除最后一个元素
    this.exch(1, this.N);
    this.N -= 1;
    this.sink(1);
    this.keys[index] = null;
    this.qp[index] = -1;
    this.pq[this.N + 1] = null;
    return index;
  }

  isEmpty() {
    return this.N === 0;
  }

  get size() {
    return this.N;
  }

  swim(k) {
    while (k > 1 && this.greater(this.parent(k), k)) {
      this.exch(k, this.parent(k));
      k = this.parent(k);
    }
  }

  sink(k) {
    while (this.left(k) <= this.N) {
      let child = this.left(k);
      if (child < this.N && this.greater(child, child + 1)) {
        child += 1;
      }
      if (!this.greater(k, child)) break;
      this.exch(k, child);
      k = child;
    }
  }

  greater(i, j) {
    return this.compareTo(this.keys[this.pq[i]], this.keys[this.pq[j]]) > 0;
  }

  exch(i, j) {
    const swap = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
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

  /** 检查整数是否在有效 */
  validateIndex(i) {
    return i >= 0 && i < this.maxN;
  }
}

const ipq = new IndexMinPQ(4, (a, b) => a.charCodeAt(0) - b.charCodeAt(0));
ipq.insert(2, 'b');
ipq.insert(0, 'e');
ipq.insert(1, 's');
ipq.insert(3, 't'); // pq = [2,0,1,3]
console.log(ipq.minIndex()); // 2
ipq.change(1, 'a');
console.log(ipq.minIndex()); // 1
console.log(ipq.delMin()); // 1

// 多个有序字符串合并成一个有序字符串， 多项归并
{
  const strings = ['afg', 'beh', 'ccdi'];
  const ipq = new IndexMinPQ(4, (a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  const strArrs = strings.map((str) => str.split(''));
  for (let i = 0; i < strArrs.length; i += 1) {
    const char = strArrs[i].shift();
    ipq.insert(i, char);
  }
  let res = '';
  while (!ipq.isEmpty()) {
    res += ipq.minKey();
    const i = ipq.delMin();
    const char = strArrs[i].shift();
    if (char) ipq.insert(i, char);
  }
  console.log(res);
  console.log(res === 'abccdefghi');
}
