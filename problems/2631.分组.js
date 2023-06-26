/*
 * @lc app=leetcode.cn id=2631 lang=javascript
 *
 * [2631] 分组

 */

// @lc code=start
/**
 * @typedef Fn
 * @type {(item: any) => string}
 * @param {Fn} fn
 * @return {Record<string, any[]>}
 */
Array.prototype.groupBy = function (fn) {
  const obj = {}
  for (const item of this) {
    const key = fn(item)
    if (!obj[key]) obj[key] = []
    obj[key].push(item)
  }
  return obj
}
// @lc code=end

const assert = require('node:assert/strict')

const arr1 = [{ id: '1' }, { id: '1' }, { id: '2' }]
assert.deepEqual(
  arr1.groupBy((item) => item.id),
  {
    1: [{ id: '1' }, { id: '1' }],
    2: [{ id: '2' }],
  }
)

const arr2 = [
  [1, 2, 3],
  [1, 3, 5],
  [1, 5, 9],
]
assert.deepEqual(
  arr2.groupBy((list) => String(list[0])),
  {
    1: [
      [1, 2, 3],
      [1, 3, 5],
      [1, 5, 9],
    ],
  }
)

const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
assert.deepEqual(
  arr3.groupBy((n) => String(n > 5)),
  {
    true: [6, 7, 8, 9, 10],
    false: [1, 2, 3, 4, 5],
  }
)
