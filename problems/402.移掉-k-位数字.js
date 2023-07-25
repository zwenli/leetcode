/*
 * @lc app=leetcode.cn id=402 lang=javascript
 *
 * [402] 移掉 K 位数字
 */

// @lc code=start
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
  // 贪心+单调栈：https://leetcode.cn/problems/remove-k-digits/solution/yi-diao-kwei-shu-zi-by-leetcode-solution/
  // 国际版：https://leetcode.cn/problems/remove-k-digits/solution/yi-diao-kwei-shu-zi-by-leetcode-solution/
  // 核心思想：对于两个相同长度的数字序列，最左边不同的数字决定了这两个数字的大小，
  // 假如A = 1axxx, B = 1bxxx, 如果 a>b，那么 A>B
  // 「删除一个数字」的贪心策略就是：从左往右遍历序列，找到一个位置i，使得i-1的数字是大于i的数字的，
  // 此时可以删除i-1位置的数字。

  // 两种base case
  if (num.length <= k) return '0'
  if (k === 0) return num
  const stack = [] // 用来维护当前数字序列的栈，栈中的元素代表截止到当前位置，删除不超过k次个数字后，所能得到的最小整数。
  for (const digit of num) {
    while (k && stack.length && stack[stack.length - 1] > digit) {
      // 小于栈顶的元素，此时应该删除栈顶的元素，注意需要不断弹出直到不满足条件
      k -= 1
      stack.pop()
    }
    stack.push(digit)

    // 处理前导0
    if (stack.length === 1 && stack[0] === '0') {
      stack.pop()
    }
  }

  // 存在删除了m个数字但m<k的情况，此时需要从尾部删除额外的m-k个数字
  while (k && stack.length) {
    stack.pop()
    k -= 1
  }

  return stack.length ? stack.join('') : '0'
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = removeKdigits('1432219', 3)
assert.equal(res1, '1219')

const res2 = removeKdigits('10200', 1)
assert.equal(res2, '200')

const res3 = removeKdigits('10', 2)
assert.equal(res3, '0')

const res4 = removeKdigits('1234567890', 9)
assert.equal(res4, '0')
