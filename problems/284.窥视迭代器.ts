/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation
 * class Iterator {
 *      hasNext(): boolean {}
 *
 *      next(): number {}
 * }
 */

class PeekingIterator {
  private iterator: Iterator
  private nextElm: number | null = null
  constructor(iterator: Iterator) {
    this.iterator = iterator
    this.nextElm = iterator.next()
  }

  peek(): number {
    return this.nextElm!
  }

  next(): number {
    const ret = this.nextElm
    this.nextElm = this.iterator.hasNext() ? this.iterator.next() : null;
    return ret!
  }

  hasNext(): boolean {
    return this.nextElm !== null;
  }
}

/**
 * Your PeekingIterator object will be instantiated and called as such:
 * var obj = new PeekingIterator(iterator)
 * var param_1 = obj.peek()
 * var param_2 = obj.next()
 * var param_3 = obj.hasNext()
 */
