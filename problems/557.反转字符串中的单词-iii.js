/*
 * @lc app=leetcode.cn id=557 lang=javascript
 *
 * [557] 反转字符串中的单词 III
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

function reverseWords(s) {
  // time complexity O(n)
  // space complexity O(n)
  if (!s || !s.length) return s;
  let ans = '';
  let i = 0;
  while (i < s.length) {
    while (i < s.length && s.charAt(i) === ' ') i += 1;
    const start = i;
    while (i < s.length && s.charAt(i) !== ' ') i += 1;
    for (let j = i - 1; j >= start; j -= 1) {
      ans += s.charAt(j);
    }
    ans += ' ';
  }
  return ans.substring(0, ans.length - 1);
}

// @lc code=end

const assert = require('assert').strict;

const res1 = reverseWords("Let's take LeetCode contest");
assert.equal(res1, 's\'teL ekat edoCteeL tsetnoc');

/**
1. 额外空间翻转，
2. 原地翻转，但是JS的字符串是不可变的，所以这个方法不适用
   具体通过两个指针定位单词的边界，然后翻转
 */