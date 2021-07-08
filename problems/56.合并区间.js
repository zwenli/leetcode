/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

function merge(intervals) {
  // 排序+双指针
  // time complexity O(nlogn): 排序的时间复杂度位O(nlogn)，还有个循环的开销O(n)
  // space complexity O(logn): 其中 nn 为区间的数量。这里计算的是存储答案之外，使用的额外空间。
  //                           O(logn)即为排序所需要的空间复杂度。
  if (intervals.length < 2) return intervals;
  // 左端升序排序
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  let i = 0;
  for (let j = 1; j < intervals.length; j += 1) {
    if (res[i][1] < intervals[j][0]) {
      // 区间不重合，直接添加
      res.push(intervals[j]);
      i += 1;
    } else {
      // res[i][0] = Math.min(res[i][0], intervals[j][0]);
      // 排序后保证左端必定是最小的，合并右端区间
      res[i][1] = Math.max(res[i][1], intervals[j][1]);
    }
  }
  return res;
}
// @lc code=end

const res1 = merge([[1, 3], [2, 6], [8, 10], [15, 18]]);
// [[1,6],[8,10],[15,18]]
const res2 = merge([[1, 4], [4, 5]]);
// [[1,5]]
const res3 = merge([[1, 4], [0, 0]]);
// [[0,0],[1,4]]
const res4 = merge([[1, 4], [5, 6]]);
// [[1,6]]
