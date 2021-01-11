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
function maxSlidingWindow(nums, k) {
  // 单调队列
  // 时间复杂度O(n): 每个下标刚好被放入队列一次，移除队列一次
  // 空间复杂度O(k): 栈的空间最多不超过k+1
  if (!nums || !nums.length) return nums;
  const n = nums.length;
  const q = []; // 双端队列，队列元素队首 > 队尾
  // 处理首个窗口的队列，队首为最大值，从大到小排序
  for (let i = 0; i < k; i += 1) {
    while (q.length && nums[q[q.length - 1]] < nums[i]) {
      // 如果当前下标元素比队尾大，需要移除队尾元素，
      // 保证队列元素是从大到小排序的
      q.pop();
    }
    q.push(i);
  }
  const ans = [nums[q[0]]];
  // 开始滑动窗口
  for (let i = k; i < n; i += 1) {
    while (q.length && nums[q[q.length - 1]] < nums[i]) {
      q.pop();
    }
    q.push(i);
    while (q[0] <= i - k) {
      // 最大值不在窗口内，需要移除当前最大值
      q.shift();
    }
    // 队列从大到小排序的，保证移除后的队首仍是最大值
    ans.push(nums[q[0]]);
  }
  return ans;
}
// @lc code=end

const res1 = maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3); // [3,3,5,5,6,7]
