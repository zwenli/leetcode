/*
 * @lc app=leetcode.cn id=744 lang=javascript
 *
 * [744] 寻找比目标字母大的最小字母
 */

// @lc code=start
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  // 数组为递增序列,二分查找
  const len = letters.length
  if (target >= letters[len - 1]) {
    return letters[0]
  }
  let low = 0;
  let high = len - 1
  while (low < high) {
    const mid = ((high - low) >> 1) + low
    if (letters[mid] > target) {
      high = mid
    } else {
      low = mid + 1
    }
  }
  return letters[low]
}
// var nextGreatestLetter = function (letters, target) {
//   // 数组为递增序列
//   let nextGreater = letters[0]
//   for (const c of letters) {
//     if (c > target) {
//       nextGreater = c
//       break
//     }
//   }
//   return nextGreater
// }
// @lc code=end
