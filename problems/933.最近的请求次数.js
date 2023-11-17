/*
 * @lc app=leetcode.cn id=933 lang=javascript
 *
 * [933] 最近的请求次数
 */

// @lc code=start

var RecentCounter = function () {
  this.queue = []
  // this.left = -Infinity
  // this.right = -Infinity
}

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  // 由于题目保证了t是严格递增的，因此队列里的时间值也是严格递增的
  // this.left = t - 3000
  // this.right = t
  while (this.queue.length && this.queue[0] < t - 3000) {
    this.queue.shift()
  }
  this.queue.push(t)
  return this.queue.length
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end
