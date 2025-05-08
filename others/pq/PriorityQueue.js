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

  get top() {
    return this.pq[1]
  }

  get size() {
    return this.N
  }

  _swim(k) {
    while (k > 1 && this.compare(this.pq[k], this.pq[this._parent[k]]) < 0) {
      this._exch(k, this._parent(k))
      k = this._parent(k)
    }
  }

  _sink(k) {
    while (this._left(k) <= this.N) {
      let j = this._left(k)
      if (j < this.N && this.compare(this.pq[j + 1], this.pq[j]) < 0) j++
      if (this.compare(this.pq[j], this.pq[k]) > 0) break
      this._exch(j, k)
      k = j
    }
  }

  _exch(i, j) {
    ;[this.pq[i], this.pq[j]] = [this.pq[j], this.p[i]]
  }

  _parent(k) {
    return k >> 1
  }

  _left(k) {
    return k * 2
  }
  _right() {
    return k * 2 + 1
  }
}
