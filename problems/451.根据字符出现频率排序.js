/*
 * @lc app=leetcode.cn id=451 lang=javascript
 *
 * [451] 根据字符出现频率排序
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  // 桶排序
  const mp = new Map()
  let maxFreq = 0
  for (const c of s) {
    const freq = (mp.get(c) || 0) + 1
    mp.set(c, freq)
    maxFreq = Math.max(freq, maxFreq)
  }

  const buckets = new Array(maxFreq + 1).fill(null).map(() => [])
  for (const [c, num] of mp.entries()) {
    buckets[num].push(c)
  }
  let ans = []
  for (let i = maxFreq; i > 0; i--) {
    const bucket = buckets[i]
    for (const c of bucket) {
      ans.push(c.repeat(i))
    }
  }

  return ans.join('')
}

// var frequencySort = function (s) {
//   // 按照出现频率排序
//   // time complexity (n + klogk): n为字符串s的长度，k为字符串s包含的不同字符的个数。
//   // space complexity (n + k):
//   const cnt = new Map()
//   for (const c of s) {
//     cnt.set(c, (cnt.get(c) || 0) + 1)
//   }
//   return Array.from(cnt)
//     .sort((a, b) => b[1] - a[1])
//     .map(([c, n]) => c.repeat(n))
//     .join('')
// }
// @lc code=end

const assert = require('node:assert/strict')

const res1 = frequencySort('tree')
assert.equal(res1, 'eetr')
