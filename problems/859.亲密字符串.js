/*
 * @lc app=leetcode.cn id=859 lang=javascript
 *
 * [859] 亲密字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */

var buddyStrings = function (s, goal) {
  // 另一种
  if (s.length !== goal.length) return false
  const cnt1 = new Array(26).fill(0)
  const cnt2 = new Array(26).fill(0)
  const BASE_CHAR_CODE = 'a'.charCodeAt(0)
  let diffSum = 0
  for (let i = 0; i < s.length; i++) {
    // 记录词频
    cnt1[s.charCodeAt(i) - BASE_CHAR_CODE] += 1
    cnt2[goal.charCodeAt(i) - BASE_CHAR_CODE] += 1
    // 记录不同字符的数量
    if (s[i] !== goal[i]) diffSum += 1
  }
  // 出现数量大于2的字符标识
  let repeat = false
  for (let i = 0; i < 26; i++) {
    // 词频不同，说明不是亲密
    if (cnt1[i] !== cnt2[i]) return false
    if (cnt1[i] > 1) repeat = true
  }
  // 综述，什么情况下才是亲密的
  // 1. 字符串长度、词频不同，必定不是亲密的
  // 2. 当出现 s 和 goal 不同的字符数量为2（能够互相交换）或者
  //    s 和 goal 不同的字符数量为0，但同时出现数量超过2的字符（能够互相交换）
  //    两者必定为亲密字符串
  return diffSum === 2 || (diffSum === 0 && repeat)
}
// var buddyStrings = function (s, goal) {
//   // 枚举
//   // 长度不等，说明不是亲密字符串
//   if (s.length !== goal.length) return false
//   // 长度相等时，有两种情况
//   if (s === goal) {
//     // 两个字符串相等，需要找出是否有出现数量超过2的字符
//     const cnt = new Array(26).fill(0)
//     const BASE_CHAR_CODE = 'a'.charCodeAt(0)
//     for (let i = 0; i < s.length; i++) {
//       const charCode = s.charCodeAt(i) - BASE_CHAR_CODE
//       cnt[charCode] += 1
//       if (cnt[charCode] > 1) {
//         // 数量超过2，能够相互交换
//         // 其实就是 s[i] = s[j] = goal[i] = goal[j] 情况
//         return true
//       }
//     }
//     return false
//   } else {
//     // 两个字符串不等时，需要找出两者不同的字符数量。
//     const diff = []
//     for (let i = 0; i < s.length; i++) {
//       if (s[i] !== goal[i]) {
//         diff.push(i)
//       }
//       // 不同数量超过2，不符合亲密字符串
//       if (diff.length > 2) return false
//     }
//     // 不同数量为2，且满足 s[i] === goal[j] && s[j] === goal[i]
//     return (
//       diff.length === 2 &&
//       s[diff[0]] === goal[diff[1]] &&
//       s[diff[1]] === goal[diff[0]]
//     )
//   }
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = buddyStrings('ab', 'ba')
assert.equal(res1, true)

const res2 = buddyStrings('ab', 'ab')
assert.equal(res2, false)

const res3 = buddyStrings('aa', 'aa')
assert.equal(res3, true)
