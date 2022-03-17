/*
 * @lc app=leetcode.cn id=1663 lang=javascript
 *
 * [1663] 具有给定数值的最小字符串
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
// function getSmallestString(n, k) {
//   // a = 97 z = 122
//   // 贪心
//   let ans = '';
//   for (let rest = n; rest >= 1; rest -= 1) {
//     const bound = k - 26 * (rest - 1)
//     if (bound <= 0) {
//       ans += 'a'
//       k -= 1
//     } else {
//       ans += String.fromCharCode(bound + 96)
//       k -= bound
//     }
//   }
//   return ans
// }
function getSmallestString(n, k) {
  // a = 97 z = 122
  const arr = new Array(n).fill(1)
  const POINT = 96;
  const BASE = 25;
  k -= n;
  let i = arr.length - 1;
  while (k > 0) {
    const temp = Math.min(k, BASE)
    arr[i] += temp;
    k -= temp;
    i -= 1;
  }
  return arr.map(i => String.fromCharCode(i + POINT)).join('')
}
// @lc code=end

const assert = require('assert').strict

const res1 = getSmallestString(3, 27)
assert.equal(res1, 'aay')

const res2 = getSmallestString(5, 73)
assert.equal(res2, 'aaszz')

/**
 * https://leetcode-cn.com/problems/smallest-string-with-a-given-numeric-value/solution/ju-you-gei-ding-shu-zhi-de-zui-xiao-zi-fu-chuan-by/
 * 贪心
 * 由于我们要使得构造出的字符串字典序最小，
 * 因此可以考虑贪心地从字符串的开头处开始构造，
 * 每次选择一个满足要求的最小的字母，
 * 即可得到最终答案。

假设当前构造到某一个位置，剩下n' 个位置没有放入字符，并且这些位置之和为k'，那么如果
放入字符c，那么剩余 n' - 1 以及 k' - c ，那么必须满足：
      n' - 1 <= k' - c <= 26 * (n' - 1)
==>   k' - 26(n' - 1) <= c <= k' - (n' - 1)

那么可得出c的取值下线为 k' - 26(n' - 1), 因此：
当 k' - 26(n' - 1) <= 0, 选择字符a
当 k' - 26(n' - 1) <= 0, 选择该数值对应的字符
 */