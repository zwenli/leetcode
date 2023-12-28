/*
 * @lc app=leetcode.cn id=904 lang=javascript
 *
 * [904] 水果成篮
 */

// @lc code=start
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  // 滑动窗口
  // 其实就是最长连续子序列的问题
  // 从任意位置开始，同时使用两个篮子采摘
  const n = fruits.length
  const cnt = new Map()
  let ans = 0
  let left = 0
  for (let right = 0; right < n; right++) {
    // 采摘此种类的水果，数量加1
    cnt.set(fruits[right], (cnt.get(fruits[right]) || 0) + 1)
    // 窗口内种类不能超过两个
    while (cnt.size > 2) {
      // 由于种类超过两个，移动left，删除对应水果数量
      cnt.set(fruits[left], cnt.get(fruits[left]) - 1)
      // 为0说明没有此种类了
      if (cnt.get(fruits[left]) === 0) {
        cnt.delete(fruits[left])
      }
      left += 1
    }
    // 最后计算窗口内水果数量。
    ans = Math.max(ans, right - left + 1)
  }

  return ans
}
// @lc code=end
