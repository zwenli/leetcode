/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
function intToRoman(num) {
  // 模拟
  // time complexity O(1)： 由于valueSymbols长度是固定的，
  // 且这 13 字符中的每个字符的出现次数均不会超过 3，
  // 因此循环次数有一个确定的上限。对于本题给出的数据范围，循环次数不会超过 15 次。
  // space complexity O(1)
  // 罗马数字的规则是：对于罗马数字从左到右的每一位，选择尽可能大的符号值。
  const valueSymbols = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let ans = ''
  for (const [value, symbol] of valueSymbols) {
    while (num >= value) {
      num -= value
      ans += symbol
    }
    if (num === 0) {
      break;
    }
  }
  return ans;
}
// @lc code=end

const assert = require('assert').strict

const res1 = intToRoman(3)
assert.equal(res1, 'III')

const res2 = intToRoman(4)
assert.equal(res2, 'IV')

const res3 = intToRoman(9)
assert.equal(res3, 'IX')

const res4 = intToRoman(58)
assert.equal(res4, 'LVIII')

const res5 = intToRoman(1994)
assert.equal(res5, 'MCMXCIV')

/**

解法：
1. 模拟

2. 生成编码表

    thousands hundreds tens ones
0   -         -        -    -
1   M         C        X    I
2   MM        CC       XX   II
3   MMM       CCC      XXX  III
4   -         CD       XL   IV
5   -         D        L    V
6   -         DC       LX   VI
7   -         DCC      LXX  VII
8   -         DCCC     LXXX VIII
9   -         CM       XC   IX

roman = thousands[Math.floor(num / 1000)]
        + hundreds[Math.floor(num % 1000 / 100)]
        + tens[Math.floor(num % 100 / 10)]
        + ones[num % 10]
 */
