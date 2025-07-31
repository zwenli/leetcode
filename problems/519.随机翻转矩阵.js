/*
 * @lc app=leetcode.cn id=519 lang=javascript
 *
 * [519] 随机翻转矩阵
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 */
var Solution = function (m, n) {
  this.m = m
  this.n = n
  this.cnt = m * n
  this.map = new Map()
};

/**
 * @return {number[]}
 */
Solution.prototype.flip = function () {
  const r = Math.floor(Math.random() * this.cnt)
  this.cnt--
  const idx = this.map.get(r) || r
  this.map.set(r, this.map.get(this.cnt) || this.cnt)
  return [Math.floor(idx / this.n), idx % this.n]
};

/**
 * @return {void}
 */
Solution.prototype.reset = function () {
  this.cnt = this.m * this.n
  this.map.clear()
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(m, n)
 * var param_1 = obj.flip()
 * obj.reset()
 */
// @lc code=end
