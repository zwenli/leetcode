/* eslint-disable no-unused-expressions */
/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// 参考[242] 有效的字母异位词

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // 2. 哈希表计数
  // 用字母表对字符串字母计数，生成key
  // 时间复杂度O(n(k+S)): n为strs的长度，k为strs中最大字符串的长度。S = 26,字母数量，字符集
  // 需要遍历n个字符串，每个字符串，需要O(k)的时间遍历，生成哈希表的键需要O(S)，更新哈希表需要O(1)，
  // 总的时间为O(n(k+S))
  // 空间复杂度(n(k+S)): n为strs的长度，k为strs中最大字符串的长度。
  // 需要用哈希表存储所有字符串，而记录每个字符串中字母出现的次数需要O(S)的空间
  if (!strs || !strs.length) return [[]];
  const A_CODE_POINT = 'a'.codePointAt(0);
  const map = new Map();
  for (let i = 0; i < strs.length; i += 1) {
    const str = strs[i];
    const table = new Array(26).fill(0); // 26个字母
    for (let j = 0; j < str.length; j += 1) {
      table[str.codePointAt(j) - A_CODE_POINT] += 1;
    }
    const key = table.toString();
    map.has(key) ? map.get(key).push(str) : map.set(key, [str]);
  }
  return Array.from(map.values());
}

// function groupAnagrams(strs) {
//   // 排序
//   // 字符串排序后在生成key，如果是字母异位词，key是相同的
//   // 时间复杂度O(nklogk): n为strs的长度，k为strs中最大字符串的长度。需要遍历n个字符串，
//   // 每个字符串需要O(klogk)的时间复杂度
//   // 空间复杂度(nk): n为strs的长度，k为strs中最大字符串的长度。需要用哈希表存储全部字符串。
//   if (!strs || !strs.length) return [[]];
//   const map = new Map();
//   for (let i = 0; i < strs.length; i += 1) {
//     const str = strs[i];
//     const key = Array.from(str).sort().toString();
//     map.has(key) ? map.get(key).push(str) : map.set(key, [str]);
//   }
//   return Array.from(map.values());
// }
// @lc code=end

const res1 = groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]

// 结合242，判断是否为字母异位词，有两种思路（目前已知的）排序，哈希表
// 第三种是质数
// ref:
// https://leetcode-cn.com/problems/group-anagrams/solution/zhi-shu-pai-xu-shu-zu-6xing-dai-ma-chao-9kdni/
// https://leetcode-cn.com/problems/count-primes/solution/mei-ju-ai-shi-shai-xian-xing-shai-qi-shu-shai-5xin/
