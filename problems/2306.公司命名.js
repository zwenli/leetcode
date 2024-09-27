/*
 * @lc app=leetcode.cn id=2306 lang=javascript
 *
 * [2306] 公司命名
 */

// @lc code=start
/**
 * @param {string[]} ideas
 * @return {number}
 */
var distinctNames = function (ideas) {
  // 题解：https://leetcode.cn/problems/naming-a-company/solutions/2924661/gong-si-ming-ming-by-leetcode-solution-v1s3/?envType=daily-question&envId=2024-09-25
  const names = new Map()
  for (const idea of ideas) {
    const suffix = idea.slice(1)
    if (!names.has(idea[0])) {
      names.set(idea[0], new Set())
    }
    names.get(idea[0]).add(suffix)
  }

  let ans = 0
  for (const [preA, setA] of names) {
    for (const [preB, setB] of names) {
      if (preA === preB) continue
      const intersect = getIntersectSize(setA, setB)
      ans += (setA.size - intersect) * (setB.size - intersect)
    }
  }
  return ans

  function getIntersectSize(a, b) {
    let count = 0
    for (const s of a) {
      if (b.has(s)) count++
    }
    return count
  }
}
// @lc code=end
