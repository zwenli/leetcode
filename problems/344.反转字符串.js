/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// TODO：2

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */

// function reverseString(s) {
//   // 递归
//   if (!s || !s.length) return;
//   helper(s, 0, s.length - 1);
//   function helper(s, left, right) {
//     if (left >= right) return;
//     [s[left], s[right]] = [s[right], s[left]];
//     helper(s, left + 1, right - 1);
//   }
// }

function reverseString(s) {
  // 双指针
  if (!s || !s.length) return s;
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}
// @lc code=end

const assert = require('assert').strict;

const res1 = ['h', 'e', 'l', 'l', 'o'];
assert.deepEqual(
  reverseString(res1),
  ['o','l','l','e','h'],
);

const res2 = ['H', 'a', 'n', 'n', 'a', 'h'];
assert.deepEqual(
  reverseString(res2),
  ['h','a','n','n','a','H'],
);
