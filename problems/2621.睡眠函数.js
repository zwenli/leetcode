/*
 * @lc app=leetcode.cn id=2621 lang=javascript
 *
 * [2621] 睡眠函数

 */

// @lc code=start
/**
 * @param {number} millis
 * @return {Promise<void>}
 */
async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis))
}
// @lc code=end
