/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

function isAnagram(s, t) {
  // 哈希
  // 相关排序，计数排序
  if (s.length !== t.length) return false;
  const map = {};
  for (const char of s) {
    if (!map[char]) map[char] = 0;
    map[char] += 1;
  }
  for (const char of t) {
    if (!map[char] || map[char] - 1 < 0) {
      return false;
    }
    map[char] -= 1;
  }
  return true;
}

// function isAnagram(s, t) {
//   // 3. 哈希表，对2的优化，解决unicode的问题
//   // 时间复杂度O(n): n为s的长度
//   // 空间复杂度O(S): S = 26，字母表需要O(S)的空间
//   if (s.length !== t.length) return false;
//   const table = new Map(); // codepoint -> time
//   for (let i = 0; i < s.length; i += 1) {
//     const charCodePoint = s.codePointAt(i);
//     table.set(
//       charCodePoint,
//       table.has(charCodePoint) ? table.get(charCodePoint) + 1 : 1,
//     );
//   }
//   for (let i = 0; i < t.length; i += 1) {
//     const charCodePoint = t.codePointAt(i);
//     if (!table.has(charCodePoint) || table.get(charCodePoint) - 1 < 0) {
//       return false;
//     }
//     table.set(charCodePoint, table.get(charCodePoint) - 1);
//   }
//   return true;
// }

// function isAnagram(s, t) {
//   // 2. 哈希表
//   // 时间复杂度O(n): n为s的长度
//   // 空间复杂度O(S): S = 26，字母表需要O(S)的空间
//   if (s.length !== t.length) return false;
//   const A_CODE_POINT = 'a'.codePointAt(0);
//   const table = new Array(26).fill(0); // 26个字母
//   for (let i = 0; i < s.length; i += 1) {
//     table[s.codePointAt(i) - A_CODE_POINT] += 1;
//   }
//   for (let i = 0; i < t.length; i += 1) {
//     table[t.codePointAt(i) - A_CODE_POINT] -= 1;
//     // 小于0说明出现了s字符串中不存在的字母
//     if (table[t.codePointAt(i) - A_CODE_POINT] < 0) {
//       return false;
//     }
//   }
//   return true;
//   // 另一种处理是，同时遍历s,t，s累加t累减
//   // 最后再遍历字母表，出现不等于0的，为false
//   // if (s.length !== t.length) return false;
//   // const A_CODE_POINT = 'a'.codePointAt(0);
//   // const table = new Array(26).fill(0);
//   // for (let i = 0; i < s.length; i += 1) {
//   //   table[s.codePointAt(i) - A_CODE_POINT] += 1;
//   //   table[t.codePointAt(i) - A_CODE_POINT] -= 1;
//   // }
//   // for (let i = 0; i < table.length; i += 1) {
//   //   if (table[i] !== 0) return false;
//   // }
//   // return true;
// }

// function isAnagram(s, t) {
//   // 1.排序
//   // 时间复杂度O(nlogn): 排序的时间复杂度O(nlogn)，比较两个字符串是否相等的时间复杂度为O(n)
//   // 总为O(nlogn + n) = O(nlogn)
//   // 空间复杂度O(logn): 排序会产生O(logn)
//   if (s.length !== t.length) return false;
//   return s.split('').sort().join('') === t.split('').sort().join('');
// }
// @lc code=end

/**
 * t相对s来说就是s的字母的排列组合
 * 解题思路
 * 1. 排序后对比
 * 2. 哈希表，字典表存s字母的出现次数，t减，出现小于0就说明有不存在s的字母出现，
 */

const res1 = isAnagram('anagram', 'nagaram'); // true
const res2 = isAnagram('rat', 'cat'); // false
