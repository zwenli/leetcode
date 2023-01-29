/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let ans = 0
  for (let num of nums) {
    ans ^= num
  }
  return ans
}

// var singleNumber = function (nums) {
//   const map = new Map()
//   for (const num of nums) {
//     let cnt = map.get(num)
//     cnt = cnt ? cnt + 1 : 1
//     map.set(num, cnt)
//   }
//   for (const [num, cnt] of map.entries()) {
//     if (cnt === 1) return num
//   }
//   return -1
// }
// @lc code=end
