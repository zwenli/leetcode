/*
 * @lc app=leetcode.cn id=757 lang=javascript
 *
 * [757] 设置交集大小至少为2
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
// function intersectionSizeTwo(intervals) {
//   // 贪心
//   // 参考： https://leetcode.cn/problems/set-intersection-size-at-least-two/solution/she-zhi-jiao-ji-da-xiao-zhi-shao-wei-by-18mq2/
//   intervals.sort((a, b) => {
//     // 先升序，再降序
//     // 左区间相同，右区间降序，保证在左区间相同的情况下让区间范围最小的在最右边
//     // 小区间满足交集大于等于2时，大区间必定也满足，反之则不一定。
//     if (a[0] === b[0]) {
//       return b[1] - a[1]
//     }
//     return a[0] - b[0]
//   })
//   const n = intervals.length
//   // 初始化一开始的交集区间
//   let cur = intervals[n - 1][0]
//   let next = cur + 1
//   // 答案至少为2
//   let ans = 2
//   // 从后往前遍历
//   for (let i = n - 2; i >= 0; i--) {
//     const [start, end] = intervals[i]
//     if (end >= next) {
//       // 当前为大区间，一定有两个交集
//       continue
//     } else if (end < cur) {
//       // 没有交集
//       // 取左边界 和 左边界 + 1
//       ans += 2
//       cur = start
//       next = start + 1
//     } else {
//       // 有一个交集
//       // 更新左边界
//       ans += 1
//       next= cur
//       cur = start
//     }
//   }
//   return ans
// }

function intersectionSizeTwo(intervals) {
  // 贪心
  // 参考： https://leetcode.cn/problems/set-intersection-size-at-least-two/solution/she-zhi-jiao-ji-da-xiao-zhi-shao-wei-by-18mq2/
  intervals.sort((a, b) => {
    // 右端点从小到大，左端点从大到小
    return a[1] === b[1] ? b[0] - a[0] : a[1] - b[1]
  })
  const n = intervals.length
  let ans = 0
  // 取区间的最大值，次最大值
  let left = -2
  let right = -1
  for (let i = 0; i < n; i++) {
    const [s, e] = intervals[i]
    if (s > right) {
      //   left  right
      //               s  e
      // 说明两个区间不重合，
      // 因此要取两个点，并区间更新为最大值，次最大值
      ans += 2
      left = e - 1
      right = e
    } else if (s > left) {
      //     left    right
      //          s         e
      // 说明两个区间存在一个重合点，
      // 取一个点，更新区间，左边为重合点right，右边取最大值。
      ans += 1
      left = right
      right = e
    }
    // 另一种情况时完全重合，此时无需更新
  }
  return ans
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = intersectionSizeTwo([
  [1, 3],
  [3, 7],
  [8, 9],
])
assert.equal(res1, 5)

const res2 = intersectionSizeTwo([
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 5],
])
assert.equal(res2, 3)

const res3 = intersectionSizeTwo([
  [1, 2],
  [2, 3],
  [2, 4],
  [4, 5],
])
assert.equal(res3, 5)

const res4 = intersectionSizeTwo([
  [6, 21],
  [1, 15],
  [15, 20],
  [10, 21],
  [0, 7],
])
assert.equal(res4, 4)
