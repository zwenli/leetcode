/*
 * @lc app=leetcode.cn id=447 lang=javascript
 *
 * [447] 回旋镖的数量
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
function numberOfBoomerangs(points) {
  let ans = 0
  // 枚举每个 points[i]，其为 V 型的拐点
  for (const p of points) {
    const cnt = new Map() // dis -> cnt
    // 枚举其他点，计算两点间的距离，将每个距离出现的记录在哈希表中
    // 由于相同点的距离结果为0，不影响计算结果，因此就不做查重
    for (const q of points) {
      const dis = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2
      cnt.set(dis, (cnt.get(dis) || 0) + 1)
    }
    for (const [_, m] of cnt.entries()) {
      // 有 m 个点到 points[i] 的距离相等，从这 m 个点中选出2个点当作回旋镖的2个端点
      // 由于需要考虑元组的顺序，因此方案数就是在 m 个元素中选出2个元素的排列数
      ans += m * (m - 1)
    }
  }
  return ans
}

// var numberOfBoomerangs = function (points) {
//   // Time Limit Exceeded
//   const n = points.length
//   if (n < 3) return 0
//   let ans = 0
//   const list = []
//   const visited = new Set()
//   const dfs = (index) => {
//     if (index === 3) {
//       if (checkBoomerang(...list)) {
//         ans += 1
//       }
//       return
//     }
//     for (let i = 0; i < n; i++) {
//       if (visited.has(i)) continue
//       visited.add(i)
//       list.push(points[i])
//       dfs(index + 1)
//       visited.delete(i)
//       list.pop()
//     }
//   }
//   dfs(0)
//   return ans
// }

// function checkBoomerang(i, j, k) {
//   return (
//     (j[0] - i[0]) ** 2 + (j[1] - i[1]) ** 2 ===
//     (k[0] - i[0]) ** 2 + (k[1] - i[1]) ** 2
//   )
// }

const assert = require('node:assert/strict')

const res1 = numberOfBoomerangs([
  [0, 0],
  [1, 0],
  [2, 0],
])
assert.equal(res1, 2)

const res2 = numberOfBoomerangs([
  [1, 1],
  [2, 2],
  [3, 3],
])
assert.equal(res2, 2)

const res3 = numberOfBoomerangs([[1, 1]])
assert.equal(res3, 0)
