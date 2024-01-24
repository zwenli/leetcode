/*
 * @lc app=leetcode.cn id=380 lang=javascript
 *
 * [380] O(1) 时间插入、删除和获取随机元素
 */

// @lc code=start

var RandomizedSet = function () {
  // 变长数组: 取数O(1)，不能在O(1)完成插入和删除O
  // 哈希表: 插入和删除O(1)，但是无法根据下标定位到特定元素，因此不能在O(1)完成取数
  // 变长数组和哈希表结合，变长数组中存储元素，哈希表中存储每个元素在变长数组中的下标。
  this.nums = []
  this.indices = new Map()
}

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.indices.has(val)) return false
  const index = this.nums.length
  this.nums.push(val)
  this.indices.set(val, index)
  return true
}

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!this.indices.has(val)) return false
  const id = this.indices.get(val)
  this.nums[id] = this.nums[this.nums.length - 1]
  this.indices.set(this.nums[id], id)
  this.nums.pop()
  this.indices.delete(val)
  return true
}

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const index = Math.floor(Math.random() * this.nums.length)
  return this.nums[index]
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end
