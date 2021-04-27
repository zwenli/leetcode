/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */

function findContentChildren(g, s) {
  // 贪心
  // 两个数组都从小到大排序，以小的饼干满足小胃口的小孩
  // 时间复杂度O(mlogm + nlogn): m，n分别为两个数组的长度，数组排序的时间复杂度为O(nlogn)
  // 空间复杂度O(logm + logn): 排序占用的额外空间
  if (!g || !g.length || !s || !s.length) return 0;
  g.sort((a, b) => a - b); // 胃口, i
  s.sort((a, b) => a - b); // 饼干尺寸, j
  let i = 0;
  for (let j = 0; i < g.length && j < s.length; j += 1) {
    // 如果饼干满足小孩的胃口，累加一，继续下一位小孩
    if (s[j] >= g[i]) {
      i += 1;
    }
  }
  return i;
}
// function findContentChildren(g, s) {
//   // 贪心
//   // 两个数组都从小到大排序，以小的饼干满足小胃口的小孩
//   // 时间复杂度O(mlogm + nlogn): m，n分别为两个数组的长度，数组排序的时间复杂度为O(nlogn)
//   // 空间复杂度O(logm + logn): 排序占用的额外空间
//   if (!g || !g.length || !s || !s.length) return 0;
//   let ans = 0;
//   g.sort((a, b) => a - b); // 胃口, i
//   s.sort((a, b) => a - b); // 饼干尺寸, j
//   let i = 0;
//   let j = 0;
//   while (i < g.length && j < s.length) {
//     // 如果饼干满足小孩的胃口，累加一，继续下一位小孩
//     if (s[j] >= g[i]) {
//       ans += 1;
//       i += 1;
//     }
//     j += 1;
//   }
//   return ans;
// }
// @lc code=end

const res1 = findContentChildren([1, 2, 3], [1, 1]); // 1

const res2 = findContentChildren([1, 2], [1, 2, 3]); // 2

const res3 = findContentChildren([10, 9, 8, 7], [5, 6, 7, 8]); // 2

// 贪心
