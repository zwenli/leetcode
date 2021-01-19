/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// TODO

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// function maxSlidingWindow(nums, k) {
//   // 暴力破解，两层循环
//   // 时间复杂度O(n*k): 第一次遍历n，第二层遍历k
//   // 空间复杂度O(1): 不占用额外空间
//   if (!nums || !nums.length) return nums;
//   const n = nums.length;
//   const ans = [];
//   for (let i = 0; i < n - k + 1; i += 1) {
//     let max = 0;
//     for (let j = 0; j < k; j += 1) {
//       max = Math.max(max, nums[i + j]);
//     }
//     ans[i] = max;
//   }
//   return ans;
// }

// function maxSlidingWindow(nums, k) {
//   // 1. 优先队列，堆的实现，后续完善
//   // TODO：
// }

// function maxSlidingWindow(nums, k) {
//   // 2.单调队列， 遇到滑动窗口的问题都可以用这种方法解决
//   // 时间复杂度O(n): 每个下标刚好被放入队列一次，移除队列一次
//   // 空间复杂度O(k): 栈的空间最多不超过k+1
//   if (!nums || !nums.length) return nums;
//   const n = nums.length;
//   const q = []; // 双端队列，队列元素队首 > 队尾
//   // 处理首个窗口的队列，队首为最大值，从大到小排序
//   for (let i = 0; i < k; i += 1) {
//     while (q.length && nums[q[q.length - 1]] < nums[i]) {
//       // 如果当前下标元素比队尾大，需要移除队尾元素，
//       // 保证队列元素是从大到小排序的
//       q.pop();
//     }
//     q.push(i);
//   }
//   const ans = [nums[q[0]]];
//   // 开始滑动窗口
//   for (let i = k; i < n; i += 1) {
//     while (q.length && nums[q[q.length - 1]] < nums[i]) {
//       q.pop();
//     }
//     q.push(i);
//     while (q[0] <= i - k) {
//       // 最大值不在窗口内，需要移除当前最大值
//       q.shift();
//     }
//     // 队列从大到小排序的，保证移除后的队首仍是最大值
//     ans.push(nums[q[0]]);
//   }
//   return ans;
// }

function maxSlidingWindow(nums, k) {
  // 3. 分块+预处理
  // 有更简洁的写法，
  // 证明思路可参考https://leetcode.com/problems/sliding-window-maximum/discuss/65881/O(n)-solution-in-Java-with-two-simple-pass-in-the-array
  // [i, i + k - 1] => suffix[i, j - 1] prefix[j, i + k - 1], i < j < i + k - 1
  // if (!nums || !nums.length) return nums;
  // const n = nums.length;
  // const prefixMax = new Array(n).fill(0); // 前缀
  // const suffixMax = new Array(n).fill(0); // 后缀
  // for (let i = 0; i < n; i += 1) {
  //   if (i % k === 0) {
  //     prefixMax[i] = nums[i];
  //   } else {
  //     prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
  //   }
  // }
  // for (let i = n - 1; i >= 0; i -= 1) {
  //   if (i === n || (i + 1) % k === 0) { // 注意下标是i + 1
  //     suffixMax[i] = nums[i];
  //   } else {
  //     suffixMax[i] = Math.max(suffixMax[i + 1], nums[i]);
  //   }
  // }
  // const ans = [];
  // for (let i = 0; i < n - k + 1; i += 1) {
  //   ans.push(Math.max(suffixMax[i], prefixMax[i + k - 1]));
  // }
  // return ans;
  if (!nums || !nums.length) return nums;
  const n = nums.length;
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);
  for (let i = 0; i < n; i += 1) {
    if (i % k === 0) {
      leftMax[i] = nums[i];
    } else {
      leftMax[i] = Math.max(leftMax[i - 1], nums[i]);
    }
    const j = n - i - 1;
    if (j + 1 === n || (j + 1) % k === 0) {
      rightMax[j] = nums[j];
    } else {
      rightMax[j] = Math.max(rightMax[j + 1], nums[j]);
    }
  }
  const ans = [];
  for (let i = 0; i < n - k + 1; i += 1) {
    ans.push(Math.max(rightMax[i], leftMax[i + k - 1]));
  }
  return ans;
}
// @lc code=end

const res1 = maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3); // [3,3,5,5,6,7]
