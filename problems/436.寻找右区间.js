/*
 * @lc app=leetcode.cn id=436 lang=javascript
 *
 * [436] 寻找右区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
// var findRightInterval = function (intervals) {
//   // 二分查找
//   // time complexity O(nlogn): 排序的时间复杂度为O(nlogn), 每次进行二分查找需要的时间为O(logn)
//   //   总共需要进行n次二分查找，因此总的时间复杂度为O(nlogn)
//   // space complexity O(n)
//   // 
//   const n = intervals.length
//   // startIntervals 存储每个起始位置intervals[i][0] 和对应索引i
//   // [[starti, index]]
//   const startIntervals = new Array(n).fill(0).map(() => new Array(2).fill(0))
//   for (let i = 0; i < n; i++) {
//     startIntervals[i][0] = intervals[i][0]
//     startIntervals[i][1] = i
//   }
//   // 并对进行排序
//   startIntervals.sort((o1, o2) => o1[0] - o2[0])

//   const ans = new Array(n).fill(0)
//   for (let i = 0; i < n; i++) {
//     // 之后枚举intervals[i][1]，利用二分查找
//     // 找到大于等于intervals[i][1] 的最小值 startIntervals[mid][0]
//     // 此时区间i对应的右侧区间即为右端点 startIntervals[mid][0] 对应的索引
//     // 即 startIntervals[mid][1]
//     let left = 0
//     let right = n - 1
//     let target = -1
//     while (left <= right) {
//       const mid = (right + left) >> 1
//       if (startIntervals[mid][0] >= intervals[i][1]) {
//         target = startIntervals[mid][1]
//         right = mid - 1
//       } else {
//         left = mid + 1
//       }
//     }
//     ans[i] = target
//   }
//   return ans
// }

var findRightInterval = function (intervals) {
  // 双指针
  // time complexity O(nlogn)
  // space complexity O(n)
  const n = intervals.length
  const startIntervals = new Array(n).fill(0).map(() => new Array(2).fill(0))
  const endIntervals = new Array(n).fill(0).map(() => new Array(2).fill(0))
  for (let i = 0; i < n; i++) {
    startIntervals[i][0] = intervals[i][0]
    startIntervals[i][1] = i
    endIntervals[i][0] = intervals[i][1]
    endIntervals[i][1] = i
  }
  startIntervals.sort((o1, o2) => o1[0] - o2[0])
  endIntervals.sort((o1, o2) => o1[0] - o2[0])

  // 设endIntervals数组中的第i个元素的右区间为startIntervals数组中的第j个元素
  // 此时可以知道 startIntervals[j-1][0]<endIntervals[i][0], startIntervals[j][0]>=endIntervals[i][0]
  // 在遍历endIntervals数组中的第i+1个元素时，不需要从第一个索引开始扫描 startIntervals 数组，
  // 可以直接从第 j 个元素开始扫描 startIntervals 数组。
  // 由于数组是排序过的，因此可以知道 startIntervals[j-1][0] < endIntervals[i][0] <= endIntervals[i+1][0]
  // 所以数组 startIntervals 的前 j-1 的元素的起始点都小于 endIntervals[i+1][0]，
  // 因此可以直接跳过前 j-1 个元素，只需要从 j 开始搜索即可。

  const ans = new Array(n).fill(-1)
  for (let i = 0, j = 0; i < n; i++) {
    while (j < n && endIntervals[i][0] > startIntervals[j][0]) {
      j += 1
    }
    if (j < n) {
      ans[endIntervals[i][1]] = startIntervals[j][1]
    } else {
      ans[endIntervals[i][1]] = -1
    }
  }
  return ans
}
// @lc code=end
const assert = require('node:assert').strict

const res1 = findRightInterval([[1, 2]])
assert.deepEqual(res1, [-1])

const res2 = findRightInterval([
  [3, 4],
  [2, 3],
  [1, 2],
])
assert.deepEqual(res2, [-1, 0, 1])

const res3 = findRightInterval([
  [1, 4],
  [2, 3],
  [3, 4],
])
assert.deepEqual(res3, [-1, 2, -1])
