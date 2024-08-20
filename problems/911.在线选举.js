/*
 * @lc app=leetcode.cn id=911 lang=javascript
 *
 * [911] 在线选举
 */

// @lc code=start
/**
 * @param {number[]} persons
 * @param {number[]} times
 */
var TopVotedCandidate = function (persons, times) {
  this.times = times
  this.tops = []
  this.voteCounts = new Map()
  this.voteCounts.set(-1, -1)
  let top = -1
  for (const p of persons) {
    if (!this.voteCounts.has(p)) {
      this.voteCounts.set(p, 0)
    }
    this.voteCounts.set(p, this.voteCounts.get(p) + 1)
    if (this.voteCounts.get(p) >= this.voteCounts.get(top)) {
      top = p
    }
    this.tops.push(top)
  }
}

/**
 * @param {number} t
 * @return {number}
 */
TopVotedCandidate.prototype.q = function (t) {
  let l = 0
  let r = this.times.length - 1
  while (l < r) {
    const m = l + ((r - l + 1) >> 1)
    if (this.times[m] <= t) {
      l = m
    } else {
      r = m - 1
    }
  }
  return this.tops[l]
}

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */
// @lc code=end
