/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

function findAnagrams(s, p) {
  // 双指针
  // time complexity O(m+n):
  // space complexity O(26)
  if (p.length > s.length) return [];
  const A_CHAR_CODE = 'a'.charCodeAt();
  const n = s.length;
  const m = p.length;
  const count = new Array(26).fill(0);
  const ans = [];
  for (let i = 0; i < m; i += 1) {
    count[p.charCodeAt(i) - A_CHAR_CODE] -= 1;
  }
  for (let left = 0, right = 0; right < n; right += 1) {
    const x = s.charCodeAt(right) - A_CHAR_CODE;
    count[x] += 1;
    while (count[x] > 0) {
      count[s.charCodeAt(left) - A_CHAR_CODE] -= 1;
      left += 1;
    }
    if (right - left + 1 === m) {
      ans.push(left);
    }
  }
  return ans;
}

// function findAnagrams(s, p) {
//   // 滑动窗口
//   // time complexity O(26 * n): n为s的长度，每次判断count的时间为O(26)
//   // space complexit O(26): count的空间
//   if (p.length > s.length) return [];
//   const A_CHAR_CODE = 'a'.charCodeAt();
//   const n = s.length;
//   const m = p.length;
//   const count = new Array(26).fill(0);
//   const ans = [];
//   for (let i = 0; i < m; i += 1) {
//     count[p.charCodeAt(i) - A_CHAR_CODE] += 1;
//     count[s.charCodeAt(i) - A_CHAR_CODE] -= 1;
//   }
//   if (allZero(count)) ans.push(0);
//   for (let i = m; i < n; i += 1) {
//     count[s.charCodeAt(i) - A_CHAR_CODE] -= 1;
//     count[s.charCodeAt(i - m) - A_CHAR_CODE] += 1;
//     if (allZero(count)) ans.push(i - m + 1);
//   }
//   return ans;
//   function allZero(count) {
//     for (let i = 0; i < 26; i += 1) {
//       if (count[i] !== 0) return false;
//     }
//     return true;
//   }
// }

// function findAnagrams(s, p) {
//   // 排序， 会超时
//   if (p.length > s.length) return [];
//   const pKey = Array.from(p).sort().join('');
//   const width = p.length;
//   const n = s.length;
//   const ans = [];
//   for (let i = 0; i <= n - width; i += 1) {
//     const key = Array.from(s.substr(i, width)).sort().join('');
//     if (key === pKey) ans.push(i);
//   }
//   return ans;
// }
// @lc code=end

const assert = require('assert').strict;

const res1 = findAnagrams('cbaebabacd', 'abc');
assert.deepEqual(res1, [0, 6]);

const res2 = findAnagrams('abab', 'ab');
assert.deepEqual(res2, [0, 1, 2]);

/**

1. 暴力，排序后对比，会超时
2. 窗口，固定长度的
https://leetcode.com/problems/find-all-anagrams-in-a-string/discuss/92015/ShortestConcise-JAVA-O(n)-Sliding-Window-Solution
3. 双指针

相关题目
https://leetcode-cn.com/problems/permutation-in-string/
 */
