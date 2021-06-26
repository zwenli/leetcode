/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */
/**
 * 索引最大优先队列
 * 索引优先队列，用一个索引数组保存了元素在数组中的位置。
 * 对于pq是连续的，但是qp，keys是不连续的，
 */
class IndexMaxPQ {
  constructor(maxN, compareTo = (a, b) => a - b) {
    // `keys`存放对象，`pq`存放与对象相关的整数，也就是对象在数组中的位置。
    // `qp`存储与对象相关的整数在`pq`数组中的下标
    // qp[pq[i]] = i, pq[qp[j]] = j
    this.compareTo = compareTo;
    this.maxN = maxN;
    this.N = 0;
    this.keys = new Array(maxN + 1);
    this.pq = new Array(maxN + 1);
    // 整数没对象没关联的时候，设置为-1
    this.qp = new Array(maxN + 1).fill(-1);
  }

  insert(i, key) {
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
    // 修改对象后，通过上浮/下沉恢复堆有序
    this.swim(this.qp[i]);
    this.sink(this.qp[i]);
  }

  /** 删除整数i关联的对象 */
  delete(i) {
    if (!this.validateIndex(i)) return;
    if (!this.contains(i)) return;
    // i对应的对象和最后一个交换，上浮/下沉，删除最后一个
    const index = this.pq[i];
    this.exch(index, this.N);
    this.N -= 1;
    this.swim(index);
    this.sink(index);
    this.keys[i] = null;
    this.pq[i] = -1;
  }

  maxKey() {
    return this.keys[this.pq[1]];
  }

  maxIndex() {
    return this.pq[1];
  }

  /** 删除堆顶元素，并返回关联的整数 */
  delMax() {
    if (this.isEmpty()) return undefined;
    const index = this.maxIndex();
    // 堆顶和最后一个交换，之后堆顶下沉，删除最后的元素
    this.exch(1, this.N);
    this.N -= 1;
    this.sink(1);
    this.keys[index] = null;
    this.qp[index] = -1;
    this.pq[this.N + 1] = null;
    return index;
  }

  /** 查找有没有和整数i关联的对象 */
  contains(i) {
    return this.qp[i] !== -1;
  }

  /** 检查整数是否在有效 */
  validateIndex(i) {
    return i >= 0 && i < this.maxN;
  }

  isEmpty() {
    return this.N === 0;
  }

  get size() {
    return this.N;
  }

  exch(i, j) {
    const swap = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
  }

  less(i, j) {
    return this.compareTo(this.keys[this.pq[i]], this.keys[this.pq[j]]) < 0;
  }

  swim(i) {
    while (i > 1 && this.less(this.parent(i), i)) {
      // 如果i对应的对象大于父节点的，上浮
      this.exch(i, this.parent(i));
      i = this.parent(i);
    }
  }

  sink(i) {
    while (this.left(i) <= this.N) {
      let child = this.left(i);
      // 左右两个节点中找出最大的一个
      if (child < this.N && this.less(child, child + 1)) {
        child += 1;
      }
      // 如果i对应的对象没比最大的子节点小，那么无需下沉
      if (!this.less(i, child)) break;
      this.exch(i, child);
      i = child;
    }
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

const strings = ['nkg', 'nmi', 'liba'];
const strArr = strings.map((str) => str.split(''));
const ipq = new IndexMaxPQ(strArr.length, (a, b) => a.charCodeAt(0) - b.charCodeAt(0));
let ans = '';
for (let i = 0; i < strArr.length; i += 1) {
  ipq.insert(i, strArr[i].shift());
}
while (!ipq.isEmpty()) {
  ans += ipq.maxKey();
  const i = ipq.delMax();
  const char = strArr[i].shift();
  if (char) {
    ipq.insert(i, char);
  }
}
console.log(ans);
console.log(ans === 'nnmlkiigba');
