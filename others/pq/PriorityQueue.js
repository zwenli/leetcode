class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.compare = compare // 负数，优先级 a> b, 0 a = b, 正数 a < b
    this.pq = [null]
    this.N = 0
  }
  insert(e) {
    this.N++
    this.pq[this.N] = e
    this._swim(this.N)
  }
  delTop() {
    if (this.N === 0) return null
    const top = this.pq[1]
    this._exch(1, this.N)
    this.pq[this.N] = null
    this.N--
    this._sink(1)
    return top
  }
  get size() {
    return this.N
  }
  get top() {
    return this.pq[1]
  }

  _swim(i) {
    while (i > 1 && this.compare(this.pq[i], this.pq[this._parent(i)]) < 0) {
      this._exch(i, this._parent(i))
      i = this._parent(i)
    }
  }
  _sink(i) {
    while (this._left(i) <= this.N) {
      let j = this._left(i)
      if (j < this.N && this.compare(this.pq[j + 1], this.pq[j]) < 0) {
        j++
      }
      if (this.compare(this.pq[j], this.pq[i]) > 0) break
      this._exch(i, j)
      i = j
    }
  }
  _exch(i, j) {
    ;[this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]]
  }
  _parent(i) {
    return i >> 1
  }
  _left(i) {
    return i * 2
  }
  _right(i) {
    return i * 2 + 1
  }
}
