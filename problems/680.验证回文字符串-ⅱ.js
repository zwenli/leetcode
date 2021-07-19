/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文字符串 Ⅱ
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */

function validPalindrome(s) {
  // 贪心算法
  // time complexity O(n):
  // space complexity O(1):
  for (let left = 0, right = s.length - 1; left < right; left++, right--) {
    if (s.charCodeAt(left) === s.charCodeAt(right)) continue;
    return valid(s, left + 1, right) || valid(s, left, right - 1);
  }
  return true;
  function valid(s, left, right) {
    while (left < right) {
      if (s.charCodeAt(left++) !== s.charCodeAt(right--)) {
        return false;
      }
    }
    return true;
  }
}

// function validPalindrome(s) {
//   // 1. 暴力解法，会超时
//   // time complexity O(n^2):
//   const arr = Array.from(s);
//   if (isPalindrome(arr)) return true;
//   for(let i = 0; i < arr.length; i += 1) {
//     if (isPalindrome(arr, i)) return true;
//   }
//   return false;
//   function isPalindrome(arr, disable) {
//     for (let left = 0, right = arr.length - 1; left < right; left++, right--) {
//       while (left < right && left === disable) left++;
//       while (left < right && right === disable) right--;
//       if (arr[left] !== arr[right]) return false;
//     }
//     return true;
//   }
// }
// @lc code=end

const assert = require('assert').strict;

const res1 = validPalindrome('aba');
assert.equal(res1, true);

const res2 = validPalindrome('abca');
assert.equal(res2, true);

const res3 = validPalindrome('abc');
assert.equal(res3, false);

const res4 = validPalindrome('cbbcc');
assert.equal(res4, true);

/**
1. 暴力，每删除一个字母都对比一次
2. 贪心
在允许最多只能删除一个字符的情况下，也可以用双指针。
一开始也是初始化为left为头，right为尾，
每次判断两个指针的字符是否相等，
相等则更新指针，left+=1; right+=1;
若不相等，则两个字符中必须有一个需要被删除，这时候有两种情况
删除left字符，留下[left+1, right]的子串；或者删除right字符，
留下[left, right - 1]子串，分别对两个子串进行验证，
当至少有一个子串为回文串时，就说明删除原始字符串删除一个字符之后就以成为回文串

 */
