/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  // 不能有前导0
  // 数字 <= 0xff
  // 4
  // 至多3个为一组选择
  const ans = []
  const temp = []
  const backtrack = (start) => {
    if (temp.length > 4) return
    if (start === s.length) {
      if (temp.length === 4) {
        ans.push(temp.join('.'))
      }
      return
    }

    let cur = 0
    const end = Math.min(start + 2, s.length)
    for (let i = start; i <= end; i++) {
      if (i !== start && s[start] === '0') break
      cur = cur * 10 + Number(s[i])
      if (cur > 0xff) break
      temp.push(cur)
      backtrack(i + 1)
      temp.pop()
    }
  }
  backtrack(0)
  return ans
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = restoreIpAddresses('25525511135')
assert.deepEqual(res1, ['255.255.11.135', '255.255.111.35'])

const res2 = restoreIpAddresses('0000')
assert.deepEqual(res2, ['0.0.0.0'])

const res3 = restoreIpAddresses('101023')
assert.deepEqual(res3, [
  '1.0.10.23',
  '1.0.102.3',
  '10.1.0.23',
  '10.10.2.3',
  '101.0.2.3',
])
