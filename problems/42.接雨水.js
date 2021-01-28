/* eslint-disable prefer-destructuring */
/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 * 类似题目，84.柱状图中最大的矩形，为单调递增栈的应用，此题是单调递减栈
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */

function trap(height) {
  // 4. 双指针，从2动态规划中可知，如果left_max[i] < right_max[i], 则积水高度由left_max决定，right_max[i] < left_max[i]也类似
  // 时间复杂度O(n): 每个元素遍历一次
  // 空间复杂度O(1)
  let ans = 0;
  if (!height || height.length < 3) return ans;
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    if (height[left] < height[right]) {
      let i = left + 1;
      while (i < right && height[i] < height[left]) {
        ans += height[left] - height[i];
        i += 1;
      }
      left = i;
    } else {
      let i = right - 1;
      while (i > left && height[i] < height[right]) {
        ans += height[right] - height[i];
        i -= 1;
      }
      right = i;
    }
  }
  return ans;
}

// function trap(height) {
//   // 3. 单调递减栈，相对1，2是以列的高度差累加，此解是以行，宽度差累加
//   let ans = 0;
//   if (!height || height.length < 3) return ans;
//   const n = height.length;
//   const stack = []; // 栈的数据满足单调递减
//   for (let i = 0; i < n; i += 1) {
//     while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
//       const top = stack.pop();
//       // 栈长度不为0，左侧才有不低于当前top的柱子，也就是才可以积水
//       if (stack.length > 0) {
//         const distance = i - stack[stack.length - 1] - 1; // 右侧-左侧-1
//         // 如果左侧柱子等于top，其实高度就是为0，也就是累加0
//         const boundHeight = Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
//         ans += distance * boundHeight;
//       }
//     }
//     stack.push(i);
//   }
//   return ans;
// }

// function trap(height) {
//   // 2. 动态规划，在1中，为了找最大值每次向左，向右都扫描一遍，可用数组提前存储这些值，左右各遍历一边
//   // 时间复杂度O(n): 三次循环，每次都是O(n)
//   // 空间复杂度O(n): 左右都需要O(n)的数组空间
//   const n = height.length;
//   const letfMax = new Array(n).fill(0);
//   const rightMax = new Array(n).fill(0);
//   // 左循环
//   letfMax[0] = height[0];
//   for (let i = 1; i < n; i += 1) {
//     letfMax[i] = Math.max(height[i], letfMax[i - 1]);
//   }
//   rightMax[n - 1] = height[n - 1];
//   for (let i = n - 2; i >= 0; i -= 1) {
//     rightMax[i] = Math.max(height[i], rightMax[i + 1]);
//   }
//   let ans = 0;
//   for (let i = 1; i < n - 1; i += 1) {
//     ans += Math.min(letfMax[i], rightMax[i]) - height[i];
//   }
//   return ans;
// }

// function trap(height) {
//   // 1. 暴力破解，双层循环，求出当前列的积水
//   // 时间复杂度O(n^2): 两层循环
//   // 空间复杂度O(1)
//   const n = height.length;
//   let ans = 0;
//   // 左右最边的列必定积不了水
//   for (let i = 1; i < n - 1; i += 1) {
//     let leftMax = 0;
//     let rightMax = 0;
//     // 左遍历
//     for (let j = i; j >= 0; j -= 1) {
//       leftMax = Math.max(leftMax, height[j]);
//     }
//     // 右遍历
//     for (let j = i; j < n; j += 1) {
//       rightMax = Math.max(rightMax, height[j]);
//     }
//     // 去左右两边小的为最大高度
//     ans += Math.min(leftMax, rightMax) - height[i];
//   }
//   return ans;
// }
// @lc code=end

/**
 * 解题方法
 * 1. 暴力破解，对于当前i，找出左右的最大柱子left_max,right_max, 累加ans += min(left_max, right_max) - hi
 * 2. 动态规划，在1中，为了找最大值每次向左，向右都扫描一遍，可用数组提前存储这些值，左右各遍历一边
 * 3. 单调递减栈，
 * 4. 双指针，从2中可知，如果left_max[i] < right_max[i], 则积水高度由left_max决定，right_max[i] < left_max[i]也类似
 */

const res1 = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]); // 6
