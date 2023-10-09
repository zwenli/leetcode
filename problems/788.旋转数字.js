/*
 * @lc app=leetcode.cn id=788 lang=javascript
 *
 * [788] 旋转数字
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var rotatedDigits = function (n) {
  /**
   * dp[i] = 0, invalid number (3,4,7)
   * dp[i] = 1, valid and same number (0,1,8)
   * dp[i] = 2, valid and different number (2,5,6,9)
   */
  const dp = new Array(n + 1).fill(0)
  let count = 0
  for (let i = 0; i <= n; i++) {
    if (i < 10) {
      if (i === 0 || i === 1 || i === 8) {
        dp[i] = 1
      } else if (i === 2 || i === 5 || i === 6 || i === 9) {
        dp[i] = 2
        count += 1
      }
    } else {
      const a = dp[Math.floor(i / 10)]
      const b = dp[i % 10]
      if (a === 1 && b === 1) {
        dp[i] = 1
      } else if (a >= 1 && b >= 1) {
        dp[i] = 2
        count += 1
      }
    }
  }

  return count
}
// var rotatedDigits = function (n) {

//   const check = [0, 0, 1, -1, -1, 1, 1, -1, 0, 1]
//   let ans = 0
//   for (let i = 1; i <= n; i++) {
//     if (isGood(i)) {
//       ans += 1
//     }
//   }
//   return ans
//   /**
//     根据题目的要求，一个数是好数，当且仅当：
//       数中没有出现 3，4，7；
//       数中至少出现一次 2 或 5 或 6 或 9；
//       对于 0，1，8 则没有要求。
//    */
//   function isGood(num) {
//     let ans = false
//     while (num > 0) {
//       const r = num % 10
//       if (check[r] === -1) {
//         // 出现3，4，7
//         return false
//       } else if (check[r] === 1) {
//         // 出现2 或 5 或 6 或 9
//         ans = true
//       }
//       num = Math.floor(num / 10)
//     }
//     return ans
//   }
// }
// @lc code=end
