/*
 * @lc app=leetcode.cn id=522 lang=javascript
 *
 * [522] 最长特殊序列 II
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {number}
 */

function findLUSlength(strs) {
  // 排序 + 哈希判重
  // 以字符串长度降序排序，如果数组中没有重复项，那么最长的字符串就是答案
  // 但是如果有重复，且最长的字符串不是答案，那么我们需要检查其他字符串。
  // 因为较小的字符串可以是较大字符串的子序列，我们需要检查字符串是否是所有大于自身的字符串的子序列。如果不是，那就是答案。
  strs.sort((a, b) => b.length - a.length)
  const n = strs.length
  const duplicates = getDuplicates(strs)
  for (let i = 0; i < n; i += 1) {
    if (!duplicates.has(strs[i])) {
      if (i === 0) return strs[i].length
      for (let j = 0; j < i; j += 1) {
        if (isSubseq(strs[i], strs[j])) break
        if (j === i - 1) return strs[i].length
      }
    }
  }
  return -1

  // 判断s是否为t的子序列
  function isSubseq(s, t) {
    let pS = 0
    let pT = 0
    while (pS < s.length && pT < t.length) {
      if (s[pS] === t[pT]) {
        pS += 1
      }
      pT += 1
    }
    return pS === s.length
  }
  // 获取重复项字符串
  function getDuplicates(strs) {
    const set = new Set()
    const duplicates = new Set()
    for (let str of strs) {
      if (set.has(str)) {
        duplicates.add(str)
      }
      set.add(str)
    }
    return duplicates
  }
}
// function findLUSlength(strs) {
//   // 枚举每个字符串
//   // 对于给定的某个字符串str[i], 如果它的一个子序列是特殊序列，那么str[i]本身也是一个特殊序列
//   // 因为sub没有在除了str[i]之外的字符串以子序列的形式出现，那么给 \textit{sub}sub 不断地添加字符，它也不会出现
//   // 而str[i]就是sub添加若干个字符得到的结果
//   const n = strs.length
//   let ans = -1
//   for (let i = 0; i < n; i += 1) {
//     // 枚举 strs[i] 作为特殊序列
//     let check = true
//     for (let j = 0; j < n; j += 1) {
//       // 判断 strs[i] 是否为 strs[j] 的子序列
//       if (i !== j && isSubseq(strs[i], strs[j])) {
//         // 如果是子序列，那么说明不是特俗序列，也无需继续枚举对比了
//         check = false
//         break
//       }
//     }
//     if (check) {
//       ans = Math.max(ans, strs[i].length)
//     }
//   }
//   return ans

//   // 判断s是否为t的子序列
//   function isSubseq(s, t) {
//     let pS = 0
//     let pT = 0
//     while (pS < s.length && pT < t.length) {
//       if (s[pS] === t[pT]) {
//         pS += 1
//       }
//       pT += 1
//     }
//     return pS === s.length
//   }
// }
// @lc code=end
