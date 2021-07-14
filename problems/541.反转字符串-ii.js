/*
 * @lc app=leetcode.cn id=541 lang=javascript
 *
 * [541] 反转字符串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
function reverseStr(s, k) {
  if (k < 2) return s;
  const str = Array.from(s);
  let left = 0;
  while (left < str.length) {
    const right = left + k - 1;
    reverse(str, left, Math.min(right, str.length - 1));
    left += 2 * k;
  }
  return str.join('');
  function reverse(str, begin, end) {
    while (begin < end) {
      [str[begin], str[end]] = [str[end], str[begin]];
      begin++;
      end--;
    }
  }
};
// @lc code=end

const assert = require('assert').strict;

const res1 = reverseStr('abcdefg', 2);
assert.equal(res1, 'bacdfeg');
/**
 */