/*
 * @lc app=leetcode.cn id=187 lang=javascript
 *
 * [187] 重复的DNA序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */

function findRepeatedDnaSequences(s) {
  // rabin-karp
  // time complexity O(N-L): 
  if (!s || s.length <= 10) return []
  const map = {
    A: 0,
    C: 1,
    G: 2,
    T: 3,
  }
  const R = 4 // 字母表大小
  const M = 10 // 子串长度
  const RM = Math.pow(R, M - 1)
  const seen = new Set()
  const ans = new Set()
  let hash = 0
  for (let i = 0; i < M; i += 1) {
    hash = hash * R + map[s[i]]
  }
  seen.add(hash)
  for (let i = 1; i <= s.length - M; i += 1) {
    hash = (hash - map[s[i - 1]] * RM) * R + map[s[i + M - 1]]
    if (seen.has(hash)) {
      ans.add(s.substr(i, M))
    }
    seen.add(hash)
  }
  return Array.from(ans)
}
// function findRepeatedDnaSequences(s) {
//   // 暴力解法
//   // time complexity O((N-L)L): L等于10，循环内有O(N-L+1)个字符串，
//   // 每个子串获取的时间复杂度为O(L)
//   if (!s || s.length <= 10) return [];
//   let ans = new Set()
//   let seen = new Set()
//   for (let i = 0; i <= s.length - 10; i += 1) {
//     const sub = s.substr(i, 10)
//     if (seen.has(sub)) {
//       ans.add(sub)
//     }
//     seen.add(sub)
//   }
//   return Array.from(ans)
// }
// @lc code=end

const assert = require('assert').strict

const res1 = findRepeatedDnaSequences('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT')
assert.deepEqual(res1.sort(), ['AAAAACCCCC', 'CCCCCAAAAA'].sort())

const res2 = findRepeatedDnaSequences('AAAAAAAAAAAAA')
assert.deepEqual(res2, ['AAAAAAAAAA'])

/**

1. 暴力解法

2. rabin-krap

3. 位运算

https://leetcode.com/problems/repeated-dna-sequences/discuss/53867/Clean-Java-solution-(hashmap-%2B-bits-manipulation)
此解还不是最优，没有用到滑动窗口

A: 00
C: 01
G: 10
T: 11

 */
