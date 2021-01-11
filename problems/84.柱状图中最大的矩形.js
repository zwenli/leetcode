/*
 * @lc app=leetcode.cn id=84 lang=javascript
 *
 * [84] 柱状图中最大的矩形
 */

// TODO

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
  // 单调栈
  // 核心思路还是找到当前元素的左右边界，左右边界既是
  // heights[left]<heights[cur], heights[right]<heights[cur]
  // 时间复杂度O(n): 数组元素遍历两次
  // 空间复杂度O(n): 极端情况下，栈的空间为数组的长度
  if (!heights || !heights.length) return heights;
  // 单调栈
  const left = []; // 左边界
  const right = []; // 右边界
  const stack = []; // 栈,存元素下标，栈的内容满足height[stack[i]]<height[stack[j]]，i < j,这里指栈的下标，不要搞混
  const n = heights.length;
  // 找左边界
  for (let i = 0; i < n; i += 1) {
    // 满足 左边小于右边
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      // 当前下标的高度小于于栈顶下标的高度，
      // 说明当前栈顶不是当前下标的左边界，需要继续找左边界，
      // 直到栈为空，或符合栈顶小于当前下标高度
      stack.pop();
    }
    // 在这里，如果栈不为空你，说明已经找到当前下标的左边界了，否则设置为-1 哨兵，
    left[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    stack.push(i); // 当前下标入栈，继续处理下一个
  }
  stack.length = 0; // 清空栈
  // 找右边界
  for (let i = n - 1; i >= 0; i -= 1) {
    // 满足右边小于左边
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      // 当前下标的高度小于于栈顶下标的高度，
      // 说明当前栈顶不是当前下标的右边界，需要继续找右边界，
      // 直到栈为空，或符合栈顶小于当前下标高度
      stack.pop();
    }
    // 在这里，如果栈不为空你，说明已经找到当前下标的右边界了，否则设置为n 哨兵，
    right[i] = stack.length === 0 ? n : stack[stack.length - 1];
    stack.push(i);
  }
  let ans = 0;
  for (let i = 0; i < n; i += 1) {
    ans = Math.max(ans, (right[i] - left[i] - 1) * heights[i]);
  }
  return ans;
}
// @lc code=end

/**
 * 4种解法
 * 1. 暴力破解，两层循环
 * 2. 暴力破解，一层循环，找出当前i的左右边界
 * 3. 单调栈
 * 4. 单调栈 + 常量优化
 */

const res1 = largestRectangleArea([2, 1, 5, 6, 2, 3]); // 10
