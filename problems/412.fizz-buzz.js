/*
 * @lc app=leetcode.cn id=412 lang=javascript
 *
 * [412] Fizz Buzz
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */

function fizzBuzz(n) {
  let ans = []
  for (let i = 1; i <= n; i += 1) {
    if (i % 3 === 0 && i % 5 === 0) {
      ans.push('FizzBuzz')
    } else if (i % 3 === 0) {
      ans.push('Fizz')
    } else if (i % 5 === 0) {
      ans.push('Buzz')
    } else {
      ans.push(String(i))
    }
  }
  return ans
}
// @lc code=end

const assert = require('assert').strict

const res1 = fizzBuzz(3)
assert.deepEqual(res1, ['1', '2', 'Fizz'])

const res2 = fizzBuzz(5)
assert.deepEqual(res2, ['1', '2', 'Fizz', '4', 'Buzz'])

const res3 = fizzBuzz(15)
assert.deepEqual(res3, [
  '1',
  '2',
  'Fizz',
  '4',
  'Buzz',
  'Fizz',
  '7',
  '8',
  'Fizz',
  'Buzz',
  '11',
  'Fizz',
  '13',
  '14',
  'FizzBuzz',
])
