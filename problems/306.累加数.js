/*
 * @lc app=leetcode.cn id=306 lang=javascript
 *
 * [306] 累加数
 */

// @lc code=start
/**
 * @param {string} num
 * @return {boolean}
 */
var isAdditiveNumber = function (num) {
  const n = num.length
  const list = []
  const backtrack = (u) => {
    const m = list.length
    if (u === n) return m >= 3 //至少包含3个数
    const max = num.charAt(u) === '0' ? u + 1 : n // 处理前导0
    const cur = []
    // 枚举[u,n - 1]
    // 对于是前导0的情况，只能枚举到u，在check时会失败，退出循环
    for (let i = u; i < max; i++) {
      // 注意是低位在前，高位在后，方便check计算
      cur.unshift(num.charAt(i) - '0')
      if (m < 2 || check(list[m - 2], list[m - 1], cur)) {
        // 不足两个数，或者cur check 合法，继续递归处理下个数字
        list.push(cur)
        if (backtrack(i + 1)) {
          return true
        }
        list.pop()
      }
    }
    return false
  }
  const check = (a, b, c) => {
    const ans = []
    let t = 0
    for (let i = 0; i < a.length || i < b.length; i++) {
      if (i < a.length) t += a[i]
      if (i < b.length) t += b[i]
      ans.push(t % 10)
      t = Math.floor(t / 10)
    }
    if (t > 0) ans.push(t) // 处理最高位的进位
    let ok = c.length === ans.length // 检查长度
    for (let i = 0; i < c.length && ok; i++) {
      // 逐位检查
      if (c[i] !== ans[i]) {
        ok = false
      }
    }
    return ok
  }
  return backtrack(0)
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = isAdditiveNumber('199100199')
assert.equal(res1, true)
const res2 = isAdditiveNumber('199001200')
assert.equal(res2, false)
