/**
 * 线段树
 */
class SegmentTree {
  /**
   *
   * @param {number[]} arr
   */
  constructor(arr) {
    this.arr = arr
    this.tree = new Array(4 * arr.length).fill(0)
    this.build(1, 0, arr.length - 1)
  }

  /**
   * 构建线段树
   * @param {number} node
   * @param {number} start
   * @param {number} end
   * @returns
   */
  build(node, start, end) {
    if (start === end) {
      this.tree[node] = this.arr[start]
      return
    }
    const mid = start + ((end - start) >> 1)
    this.build(this.leftChild(node), start, mid)
    this.build(this.rightChild(node), mid + 1, end)
    this.tree[node] =
      this.tree[this.leftChild(node)] + this.tree[this.rightChild(node)]
  }

  /**
   * 更新节点的值
   * @param {number} index
   * @param {number} value
   */
  update(index, value) {
    this._update(1, 0, this.arr.length - 1, index, value)
  }

  _update(node, start, end, index, value) {
    if (start === end) {
      // PS: 某些场景下是累加/记的逻辑，那么只需要改为 +=，其他不变
      this.arr[index] = value
      this.tree[node] = value
      return
    }
    const mid = start + ((end - start) >> 1)
    if (index <= mid) {
      this._update(this.leftChild(node), start, mid, index, value)
    } else {
      this._update(this.rightChild(node), mid + 1, end, index, value)
    }
    this.tree[node] =
      this.tree[this.leftChild(node)] + this.tree[this.rightChild(node)]
  }

  /**
   * 查询 [left, right] 的总数
   * @param {number} left
   * @param {number} right
   * @returns
   */
  query(left, right) {
    return this._query(1, 0, this.arr.length - 1, left, right)
  }

  _query(node, start, end, left, right) {
    if (start === left && end === right) {
      return this.tree[node]
    }
    const mid = start + ((end - right) >> 1)
    if (right <= mid) {
      return this._query(this.leftChild(node), start, mid, left, right)
    } else if (left > mid) {
      return this._query(this.rightChild(node), mid + 1, end, left, right)
    } else {
      return (
        this._query(this.leftChild(node), start, mid, left, mid) +
        this._query(this.rightChild(node), mid + 1, end, mid + 1, right)
      )
    }
  }

  leftChild(node) {
    return node * 2
  }

  rightChild(node) {
    return node * 2 + 1
  }
}

const assert = require('node:assert').strict

const arr = [1, 2, 3, 4, 5]
const st = new SegmentTree(arr)
assert.equal(st.query(0, 4), 15)

st.update(4, 6)
assert.equal(st.query(0, 4), 16)
