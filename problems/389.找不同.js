/*
 * @lc app=leetcode.cn id=389 lang=javascript
 *
 * [389] 找不同
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  // 求和
  // 字符串s每个字符的ASCII码值求和，为as
  // 字符串t每个字符的ASCII码值求和，为at
  // at-as的差值即为被添加的字符
  let as = 0
  let at = 0
  for (let ch of s) {
    as += ch.charCodeAt()
  }
  for (let ch of t) {
    at += ch.charCodeAt()
  }
  return String.fromCharCode(at - as)
}
// var findTheDifference = function (s, t) {
//   // 计数
//   const A_CODE = 'a'.charCodeAt()
//   const cnt = new Array(26).fill(0)
//   for (const char of s) {
//     cnt[char.charCodeAt() - A_CODE] += 1
//   }
//   for (const char of t) {
//     cnt[char.charCodeAt() - A_CODE] -= 1
//     if (cnt[char.charCodeAt() - A_CODE] < 0) {
//       return char
//     }
//   }
//   return ''
// }
// @lc code=end
