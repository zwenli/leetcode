/* eslint-disable no-plusplus */
/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// TODO 1刷

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // 双指针，i,j 两边向中间收敛
  if (!height) return null;
  let max = 0;
  // 注意i,j不要重复
  for (let i = 0, j = height.length - 1; i < j;) {
    // 两边比较，小的一遍继续收敛
    const minHeight = height[i] < height[j] ? height[i++] : height[j--];
    // 坐标已经是下一次的了，需要补上差值
    const area = (j - i + 1) * minHeight;
    max = Math.max(area, max);
  }
  return max;
}

// function maxArea(height) {
//   // 枚举
//   if (!height) return null;
//   let max = 0;
//   // 注意i,j不要重复
//   for (let i = 0; i < height.length - 1; i += 1) {
//     for (let j = i + 1; j < height.length; j += 1) {
//       const area = (j - i) * Math.min(height[i], height[j]);
//       max = Math.max(max, area);
//     }
//   }
//   return max;
// };
// @lc code=end

const res1 = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]); // 49

/**
 * 思路
 * 求面积最大
 * i,j表示两点
 * 长为两点距离 distance(i,j) = j - i, i < j
 * 宽为 min(ai, aj)
 * 因此面积等于min(ai,aj) * (j - i);
 *
 * 两种解题方法：
 *
 * 1. 枚举i、j，分别计算出来取最大，时间复杂度O(n)，（暴力法）
 * 2. 左右边界i、j，向中间收敛，i、j对比，小的继续进/减1，时间复杂度O(n)，左右夹逼，（双指针）
 */
