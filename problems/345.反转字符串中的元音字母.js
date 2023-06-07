/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

function isVowel(char) {
  return 'aeiouAEIOU'.includes(char)
}

var reverseVowels = function (s) {
  const arr = Array.from(s)
  let l = 0
  let r = arr.length - 1
  while (l < r) {
    while (l < r && !isVowel(arr[l])) {
      l++
    }
    while (l < r && !isVowel(arr[r])) {
      r--
    }
    const temp = arr[l]
    arr[l] = arr[r]
    arr[r] = temp
    l++
    r--
  }
  return arr.join('')
}
// @lc code=end

const assert = require('node:assert/strict')

const res1 = reverseVowels('hello')
assert.equal(res1, 'holle')

const res2 = reverseVowels('leetcode')
assert.equal(res2, 'leotcede')
