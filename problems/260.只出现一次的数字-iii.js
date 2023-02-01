/*
 * @lc app=leetcode.cn id=260 lang=javascript
 *
 * [260] 只出现一次的数字 III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  // hash
  let xorsum = 0 // x = x1 ^ x2，因为x1，x2不相等，所有结果x != 0
  for (const num of nums) {
    xorsum ^= num
  }
  let x1 = 0
  let x2 = 0
  const lsb = xorsum & -xorsum // 取得最低位的1，设为第l位
  // 显然x1，x2中的某个数的二进制数的第l位为0，另外一个数的二进制数的第l位为1
  // 因此可以将nums中的所有元素分成两类，
  // 一类包含所有二进制表示的第l位为0的数，
  // 另一类包含所有二进制表示的第l位为1的数
  // 可以发现：
  // * 对于任意一个在nums中出现两次的元素，该元素的两次出现都会包含在同一类中
  // * 对于任意一个在nums中只出现一次的元素，即x1和x2，它们会包含在不同类中
  for (const num of nums) {
    if (num & lsb) {
      x1 ^= num
    } else {
      x2 ^= num
    }
  }
  return [x1, x2]
}
// var singleNumber = function (nums) {
//   // hash
//   const freq = new Map()
//   for (const num of nums) {
//     freq.set(num, (freq.get(num) ?? 0) + 1)
//   }
//   const ans = []
//   for (const [num, count] of freq.entries()) {
//     if (count === 1) {
//       ans.push(num)
//     }
//   }
//   return ans
// }
// @lc code=end
