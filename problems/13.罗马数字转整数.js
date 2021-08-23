/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 
function romanToInt(s) {
  // 模拟
  // time complexity O(n)
  // space compexity O(1)
  // 通常情况下，罗马数字中小的数字在大的数字的右边。
  // 若输入的字符串满足该情况，那么可以将每个字符视作一个单独的值，累加每个字符对应的数值即可。
  // 若存在小的数字在大的数字的左边的情况，根据规则需要减去小的数字。
  // 对于这种情况，我们也可以将每个字符视作一个单独的值，若一个数字右侧的数字比它大，则将该数字的符号取反。
  const numericalMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let ans = 0
  for (let i = 0; i < s.length; i += 1) {
    const value = numericalMap[s[i]];
    if (i + 1 < s.length && value < numericalMap[s[i + 1]]) {
      ans -= value;
    } else {
      ans += value;
    }
  }
  return ans;
}
// function romanToInt(s) {
//   const numericalMap = {
//     I: 1,
//     V: 5,
//     X: 10,
//     L: 50,
//     C: 100,
//     D: 500,
//     M: 1000,
//   }
//   let ans = 0
//   let i = 0
//   while (i < s.length) {
//     if (
//       i + 1 < s.length &&
//       ((s[i] === 'I' && ['V', 'X'].includes(s[i + 1])) ||
//         (s[i] === 'X' && ['L', 'C'].includes(s[i + 1])) ||
//         (s[i] === 'C' && ['D', 'M'].includes(s[i + 1])))
//     ) {
//       ans += numericalMap[s[i + 1]] - numericalMap[s[i]]
//       i += 2
//     } else {
//       ans += numericalMap[s[i]]
//       i += 1
//     }
//   }
//   return ans
// }
// @lc code=end

const assert = require('assert').strict

const res1 = romanToInt('III')
assert.equal(res1, 3)

const res2 = romanToInt('IV')
assert.equal(res2, 4)

const res3 = romanToInt('IX')
assert.equal(res3, 9)

const res4 = romanToInt('LVIII')
assert.equal(res4, 58)

const res5 = romanToInt('MCMXCIV')
assert.equal(res5, 1994)