/*
 * @lc app=leetcode.cn id=398 lang=javascript
 *
 * [398] 随机数索引
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if (!this.map.has(num)) {
      this.map.set(num, [])
    }
    this.map.get(num).push(i)
  }
}

/**
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function (target) {
  const arr = this.map.get(target)
  return arr[Math.floor(arr.length * Math.random())]
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
// @lc code=end
