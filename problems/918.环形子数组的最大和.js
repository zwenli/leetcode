/*
 * @lc app=leetcode.cn id=918 lang=javascript
 *
 * [918] 环形子数组的最大和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function maxSubarraySumCircular(nums) {
  const n = nums.length;
  let allSum = 0;
  let maxSum = nums[0];
  let maxPrev = 0;
  let minSum = nums[0];
  let minPrev = 0;
  for (let i = 0; i < n; i += 1) {
    allSum += nums[i];
    maxPrev = Math.max(maxPrev + nums[i], nums[i]);
    maxSum = Math.max(maxPrev, maxSum);
    minPrev = Math.min(minPrev + nums[i], nums[i]);
    minSum = Math.min(minPrev, minSum);
  }
  if (maxSum < 0) return maxSum;
  return Math.max(maxSum, allSum - minSum);
}
// @lc code=end

const assert = require('assert');
assert.equal(maxSubarraySumCircular([1,-2,3,-2]), 3);
assert.equal(maxSubarraySumCircular([5,-3,5]), 10);
assert.equal(maxSubarraySumCircular([3,-1,2,-1]), 4);
assert.equal(maxSubarraySumCircular([3,-2,2,-3]), 3);
assert.equal(maxSubarraySumCircular([-2,-3,-1]), -1);

/**
1.暴力，两层循环
2. 参考53，分情况讨论
 a. 当最大和位于中间，情况和53一样，值maxSum
 b. 当最大和位于两侧，两侧之和等于所有和减去中间和，
    而我们求两侧最大和，就意味这中间和是最小的minSum。
 c. 全为负数的情况，情况b的值等于0，所以值等于情况一的值
 综上，如不全为负数，取 maxSum, allSum-min的最大值
 否则，取maxSum即可
 */
