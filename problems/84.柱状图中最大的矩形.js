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
  // 4. 单调栈 + 常数优化
  // 同单调栈思路一样，原单调栈需要循环两次
  // 而实际在第一次从左到右确认每根柱子的左边界的时候，就可以同时确认右边界了。
  // 虽然此时右边界无法确认求出，但是不影响结果，它保证了最右侧的柱子是可以求出正确的右边界的。
  // 时间复杂度O(n): 数组元素遍历一次
  // 空间复杂度O(n): 极端情况下，栈的空间为数组的长度
  if (!heights || !heights.length) return heights;
  // 单调栈
  // const n = heights.length;
  // const left = new Array(n); // 左边界
  // const right = new Array(n).fill(n); // 右边界
  // const stack = []; // 栈,存元素下标，栈的内容满足height[stack[i]]<height[stack[j]]，i < j,这里指栈的下标，不要搞混
  // for (let i = 0; i < n; i += 1) {
  //   while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
  //     // 在这虽然无法确切求出当前左柱子正确的右边界，但对最终结果没有影响
  //     // 因为如果有若干个高度的都等于矩阵的高度，那么最右侧的那根柱子是可以求出正确的右边界的。
  //     right[stack[stack.length - 1]] = i;
  //     stack.pop(); // 当前左柱子不低于当前柱子，继续往左找下一个柱子
  //   }
  //   left[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
  //   stack.push(i);
  // }
  // let ans = 0;
  // for (let i = 0; i < n; i += 1) {
  //   ans = Math.max(ans, (right[i] - left[i] - 1) * heights[i]);
  // }
  // return ans;
  // 另一种简洁的，我觉得还是先理解上面的为准，再参考这种写法
  heights.push(0); // 后面增加0高的柱子，使得while必定执行，防止数组是递增的情况下不执行while，也减少了额外处理stack的时间
  const n = heights.length;
  const stack = [-1]; // -1 哨兵，这样处理就无须再判断栈的length了
  let ans = 0;
  for (let i = 0; i < n; i += 1) {
    while (heights[i] < heights[stack[stack.length - 1]]) {
      // i柱子的高度小于栈顶柱子的高度，说明栈顶柱子的右边界已确定
      const h = heights[stack.pop()]; // 当前最大高度柱子的高度
      const w = i - stack[stack.length - 1] - 1; // 出栈后，栈顶的下标为左边界
      ans = Math.max(ans, h * w);
    }
    stack.push(i);
  }
  heights.pop();
  return ans;
}

// function largestRectangleArea(heights) {
//   // 3. 单调栈，找边界的思路可参考2
//   // 栈中存放的元素具有单调性，这就是经典的数据结构「单调栈」了。
//   // 此题体现为栈存放的柱子高度是严格递增的
//   // 设当前柱子下标为i，高度h = heights[i]
//   // 左右两侧最近的高度小于h的柱子，这样这两根柱子之间（不包括其本身）的所有柱子高度均不小于h，
//   // 并且就是i能够扩展到的最远范围。
//   // heights[left]<heights[i], heights[right]<heights[i]
//   // 时间复杂度O(n): 数组元素遍历两次
//   // 空间复杂度O(n): 极端情况下，栈的空间为数组的长度
//   if (!heights || !heights.length) return heights;
//   // 单调栈
//   const left = []; // 左边界
//   const right = []; // 右边界
//   const stack = []; // 栈,存元素下标，栈的内容满足height[stack[i]]<height[stack[j]]，i < j,这里指栈的下标，不要搞混
//   const n = heights.length;
//   // 找左边界
//   for (let i = 0; i < n; i += 1) {
//     // 满足 左边小于右边
//     while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
//       // 当前下标的高度小于于栈顶下标的高度，
//       // 说明当前栈顶不是当前下标的左边界，需要继续找左边界，
//       // 直到栈为空，或符合栈顶小于当前下标高度
//       stack.pop();
//     }
//     // 在这里，如果栈不为空你，说明已经找到当前下标的左边界了，否则设置为-1 哨兵，
//     left[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
//     stack.push(i); // 当前下标入栈，继续处理下一个
//   }
//   stack.length = 0; // 清空栈
//   // 找右边界
//   for (let i = n - 1; i >= 0; i -= 1) {
//     // 满足右边小于左边
//     while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
//       // 当前下标的高度小于于栈顶下标的高度，
//       // 说明当前栈顶不是当前下标的右边界，需要继续找右边界，
//       // 直到栈为空，或符合栈顶小于当前下标高度
//       stack.pop();
//     }
//     // 在这里，如果栈不为空你，说明已经找到当前下标的右边界了，否则设置为n 哨兵，
//     right[i] = stack.length === 0 ? n : stack[stack.length - 1];
//     stack.push(i);
//   }
//   let ans = 0;
//   for (let i = 0; i < n; i += 1) {
//     ans = Math.max(ans, (right[i] - left[i] - 1) * heights[i]);
//   }
//   return ans;
// }

// function largestRectangleArea(heights) {
//   // 2. 一层循环，找出i的左右边界
//   // 会超时
//   // 时间复杂度O(n^2): 循环n次，每次循环从左从右找边界也是n次
//   // 空间复杂度O(1)
//   if (!heights || !heights.length) return heights;
//   const n = heights.length;
//   let ans = 0;
//   for (let i = 0; i < n; i += 1) {
//     let left = i;
//     let right = i;
//     const h = heights[i];
//     while (left - 1 >= 0 && heights[left - 1] >= h) {
//       left -= 1;
//     }
//     while (right + 1 < n && heights[right + 1] >= h) {
//       right += 1;
//     }
//     ans = Math.max(ans, (right - left + 1) * h);
//   }
//   return ans;
// }

// function largestRectangleArea(heights) {
//   // 1. 暴力破解，两层循环，i,j，找出区间最小高度求面积
//   // 会超时
//   // 时间复杂度O(n^2): 循环n次，每次循环从左从右找边界也是n次
//   // 空间复杂度O(1)
//   if (!heights || !heights.length) return heights;
//   const n = heights.length;
//   let ans = 0;
//   for (let i = 0; i < n; i += 1) {
//     let minHeight = heights[i];
//     for (let j = i; j < n; j += 1) {
//       minHeight = Math.min(minHeight, heights[j]); // 每次加一记录最小高度
//       ans = Math.max(ans, (j - i + 1) * minHeight);
//     }
//   }
//   return ans;
// }
// @lc code=end

/**
 * 4种解法
 * 1. 暴力破解，两层循环
 * 2. 暴力破解，一层循环，找出当前i的左右边界
 * 3. 单调栈
 * 4. 单调栈 + 常量优化
 */

const res1 = largestRectangleArea([2, 1, 5, 6, 2, 3]); // 10
const res2 = largestRectangleArea([2, 4]); // 4
const res3 = largestRectangleArea([1, 2, 3, 2, 1]); // 6
