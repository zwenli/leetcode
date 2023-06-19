/*
 * @lc app=leetcode.cn id=2618 lang=javascript
 *
 * [2618] 检查是否是类的对象实例

 */

// @lc code=start
/**
 * @param {any} obj
 * @param {any} classFunction
 * @return {boolean}
 */

function isUndef(value) {
  return value === null || value === undefined
}

function checkIfInstanceOf(obj, classFunction) {
  if (
    isUndef(obj) ||
    isUndef(classFunction) ||
    isUndef(classFunction.prototype)
  ) {
    return false
  }
  let proto = Object.getPrototypeOf(obj)
  while (proto) {
    if (proto === classFunction.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = checkIfInstanceOf(new Date(), Date)
assert.equal(res1, true)

const res2 = checkIfInstanceOf(null, null)
assert.equal(res2, false)

const res3 = checkIfInstanceOf(Number.NaN, Number)
assert.equal(res3, true)
