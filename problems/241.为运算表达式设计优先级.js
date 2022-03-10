/*
 * @lc app=leetcode.cn id=241 lang=javascript
 *
 * [241] 为运算表达式设计优先级
 */

// @lc code=start
/**
 * @param {string} expression
 * @return {number[]}
 */
function diffWaysToCompute(expression) {
  
  const ops = ['+', '-', '*']
  const cache = new Map()
  return backtrack(expression)
  function backtrack(expression) {
    if (cache.has(expression)) {
      return cache.get(expression)
    }
    let res = []
    if (!Number.isNaN(Number(expression))) {
      res = [Number(expression)]
      cache.set(expression, res)
      return res
    }
    for (let i = 0; i < expression.length; i += 1) {
      const char = expression[i]
      if (ops.includes(char)) {
        const left = backtrack(expression.slice(0, i))
        const right = backtrack(expression.slice(i + 1))
        for (let l of left) {
          for (let r of right) {
            switch (char) {
              case '+':
                res.push(l + r)
                break
              case '-':
                res.push(l - r)
                break
              default:
                res.push(l * r)
                break
            }
          }
        }
      }
    }
    cache.set(expression, res)
    return res
  }
}
// @lc code=end
const assert = require('assert').strict

const res1 = diffWaysToCompute('2-1-1')
assert.deepEqual(
  res1.sort((a, b) => a - b),
  [0, 2]
)

const res2 = diffWaysToCompute('2*3-4*5')
assert.deepEqual(
  res2.sort((a, b) => a - b),
  [-34, -14, -10, -10, 10]
)
