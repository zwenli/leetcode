/*
 * @lc app=leetcode.cn id=839 lang=javascript
 *
 * [839] 相似字符串组
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function (strs) {
  const n = strs.length
  const m = strs[0].length
  const parent = Array.from({ length: n }, (_, i) => i)

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x])
    }
    return parent[x]
  }

  const check = (a, b, len) => {
    let num = 0
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        num++
        if (num > 2) return false
      }
    }
    return true
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const pi = find(i)
      const pj = find(j)
      if (pi === pj) continue
      if (check(strs[i], strs[j], m)) {
        parent[pi] = pj
      }
    }
  }
  let res = 0
  for (let i = 0; i < n; i++) {
    if (parent[i] === i) {
      res++
    }
  }
  return res
}
// @lc code=end
