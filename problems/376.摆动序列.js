/*
 * @lc app=leetcode.cn id=376 lang=javascript
 *
 * [376] 摆动序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function wiggleMaxLength(nums) {
  // dp+空间优化
  // time complexity O(n)
  // space compexity O(1)
  const n = nums.length;
  let up = 1;
  let down = 1;
  for (let i = 1; i < n; i += 1) {
    if (nums[i] > nums[i - 1]) {
      up = down + 1;
    } else if (nums[i] < nums[i - 1]) {
      down = up + 1;
    }
  }
  return n === 0 ? 0 : Math.max(up, down);
}

// function wiggleMaxLength(nums) {
//   const n = nums.length
//   const up = new Array(n).fill(0)
//   const down = new Array(n).fill(0)
//   up[0] = down[0] = 1
//   for (let i = 1; i < n; i += 1) {
//     if (nums[i] < nums[i - 1]) {
//       up[i] = up[i - 1]
//       down[i] = Math.max(down[i - 1], up[i - 1] + 1)
//     } else if (nums[i] > nums[i - 1]) {
//       up[i] = Math.max(up[i - 1], down[i - 1] + 1)
//       down[i] = down[i - 1]
//     } else {
//       up[i] = up[i - 1]
//       down[i] = down[i - 1]
//     }
//   }
//   return Math.max(up[n - 1], down[n - 1])
// }
// @lc code=end

const assert = require('assert').strict

const res1 = wiggleMaxLength([1, 7, 4, 9, 2, 5])
assert.equal(res1, 6)

const res2 = wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8])
assert.equal(res2, 7)

const res3 = wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9])
assert.equal(res3, 2)

/**
1. 动态规划
https://leetcode-cn.com/problems/wiggle-subsequence/solution/bai-dong-xu-lie-by-leetcode-solution-yh2m/
https://leetcode-cn.com/problems/wiggle-subsequence/solution/tan-xin-si-lu-qing-xi-er-zheng-que-de-ti-jie-by-lg/

详细的证明过程看上面的两个题解，这里简单说明一下
up[i] 表示以前i个元素中以某一个结尾的最长的「上升摆动序列」长度。
down[i] 表示以前i个元素中以某一个结尾的最长的「下降摆动序列」长度。

转移方程如下：
up[i] = up[i - 1], when nums[i] <= nums[i-1]
up[i] = Math.max(up[i-1], down[i-1] + 1), when nums[i] > nums[i-1]
down[i] = down[i - 1], when nums[i] >= nums[i-1]
down[i] = Math.max(down[i-1], up[i-1] + 1), when nums[i] < nums[i-1]

以up[i]为例，
当nums[i] <= nums[i-1]，无法选出更长的「上升摆动序列」的方案。因为任何以nums[i]
为结尾的「上升摆动序列」，都可以将nums[i]替换成nums[i-1]，使其成为nums[i-1]结尾的「上升摆动序列」的方案。

当nums[i] > nums[i-1]时，可以从up[i-1]或者down[i-1]转移状态。
从up[i-1]转移时，长度不变。
而从down[i-1]转移时，必定存在一个down[i-1]对应的最长的「下降摆动序列」的末尾元素小于nums[i]。  
两者取最大值即可。

观察可知，up，down的状态转移只依赖上一个状态，优化成两个变量存储即可，
而且每当nums[i] > nums[i - 1]，呈上升趋势，up值才会增加
当nums[i] < nums[i - 1]，呈下降趋势，down值才会增加
且过程中up和down的差的绝对值恒不大于 1，于是可简化为
nums[i] > nums[i - 1]，up = down + 1
nums[i] < nums[i - 1]，down = up + 1
base case: up = down = 1

 */
