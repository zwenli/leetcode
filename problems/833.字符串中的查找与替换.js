/*
 * @lc app=leetcode.cn id=833 lang=javascript
 *
 * [833] 字符串中的查找与替换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[]} indices
 * @param {string[]} sources
 * @param {string[]} targets
 * @return {string}
 */
function findReplaceString(s, indices, sources, targets) {
  // 模拟，从右到左遍历替换
  // map，记录[indices[index], index]映射
  const map = indices.map((value, index) => [value, index])
  // [3, 8, 5] => [[3, 0], [8, 1], [5, 2]]
  // [[3, 0],[5, 2],[8, 1]]
  // i = ind[0], j = ind[1]
  // source = sources[j], target = targets[j]
  // 
  map.sort((a, b) => b[0] - a[0]) // 降序
  for (const ind of map) {
    const i = ind[0] // 当前字符串s的第i位
    const j = ind[1] // indices的第j位
    const source = sources[j]
    const target = targets[j]
    // 字符串s从ix位开始和sources[j]是否匹配
    if (s.substring(i, i + source.length) === source) {
      // 替换
      // 因为是从右到左替换，字符串的长度变化对下标i没有影响
      s = s.substring(0, i) + target + s.substring(i + source.length)
    }
  }
  return s
}
// function findReplaceString(s, indices, sources, targets) {
//   // 模拟
//   const n = s.length
//   // match[ix] = j，表示字符串s从ix位开始和sources[j]匹配，并且会替换成targets[j]
//   // 也就是，sources[j]是s[ix:]的前缀和
//   const match = new Array(n).fill(-1)
//   for (let i = 0; i < indices.length; i++) {
//     const ix = indices[i]
//     if (s.substring(ix, ix + sources[i].length) === sources[i]) {
//       match[ix] = i
//     }
//   }
//   let ans = ''
//   let ix = 0
//   while (ix < n) {
//     if (match[ix] > -1) {
//       // 如果匹配得上，
//       // ans 添加 targets[j]
//       // 下标ix移动sources[i].length的长度
//       const i = match[ix]
//       ans += targets[i]
//       ix += sources[i].length
//     } else {
//       // 否则添加字母s[ix]
//       // 下标ix移动一位
//       ans += s[ix]
//       ix += 1
//     }
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = findReplaceString('abcd', [0, 2], ['a', 'cd'], ['eee', 'ffff'])
assert.equal(res1, 'eeebffff')

const res2 = findReplaceString('abcd', [0, 2], ['ab', 'ec'], ['eee', 'ffff'])
assert.equal(res2, 'eeecd')
