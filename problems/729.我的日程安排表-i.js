/*
 * @lc app=leetcode.cn id=729 lang=javascript
 *
 * [729] 我的日程安排表 I
 */

// @lc code=start

class MyCalendar {
  constructor() {
    this.booked = []
  }
  /** 
   * @param {number} start 
   * @param {number} end
   * @return {boolean}
   */
  book(start, end) {
    for (const arr of this.booked) {
      const [l, r] = arr
      // [start, end) 与 [l, r) 无交集，需要满足 start >= r || l >= end
      // 反过来，如果满足 start < r && l < end，则说明两个区间有交集
      if (start < r && l < end) {
        return false
      }
    }
    this.booked.push([start, end])
    return true
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
// @lc code=end

const assert = require('assert').strict

const calendar = new MyCalendar()
assert.equal(calendar.book(10, 20), true)
assert.equal(calendar.book(15, 25), false)
assert.equal(calendar.book(20, 30), true)
