/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

function findTargetSumWays(nums, target) {
  // 动态规划，优化，空间优化
  // time complexity(n * (sum - target) / 2):
  // space complexity((sum - target) / 2):
  const n = nums.length
  // sum为nums数组的元素之和，题目中保证nums的元素都为非负数，否则需要做绝对值处理。
  const sum = nums.reduce((sum, num) => sum + num, 0)
  // 此时是考虑+的情况，若target > sum, 必定不存在方案。
  if (target > sum || (sum - target) % 2 !== 0) {
    return 0
  }
  // 负值部分的绝对值
  const neg = (sum - target) / 2
  const dp = new Array(neg + 1).fill(0)
  dp[0] = 1
  for (const num of nums) {
    for (let j = neg; j >= num; j -= 1) {
      dp[j] += dp[j - num];
    }
  }
  return dp[neg]
}

// function findTargetSumWays(nums, target) {
//   // 动态规划，优化
//   // time complexity(n * (sum - target) / 2):
//   // space complexity(n * (sum - target) / 2):
//   const n = nums.length
//   // sum为nums数组的元素之和，题目中保证nums的元素都为非负数，否则需要做绝对值处理。
//   const sum = nums.reduce((sum, num) => sum + num, 0)
//   // 此时是考虑+的情况，若target > sum, 必定不存在方案。
//   if (target > sum || (sum - target) % 2 !== 0) {
//     return 0
//   }
//   // 负值部分的绝对值
//   const neg = (sum - target) / 2
//   const dp = new Array(n + 1).fill(0).map(() => new Array(neg + 1).fill(0))
//   dp[0][0] = 1
//   for (let i = 1; i <= n; i += 1) {
//     const num = nums[i - 1]
//     for (let j = 0; j <= neg; j += 1) {
//       dp[i][j] += dp[i - 1][j] // 不选
//       if (j - num >= 0) {
//         // 选
//         dp[i][j] += dp[i - 1][j - num]
//       }
//     }
//   }
//   return dp[n][neg]
// }

// function findTargetSumWays(nums, target) {
//   // 动态规划
//   // time complexity(n * sum): 总为O(n * (2 * sum + 1)), sum为nums数组的元素之和，n为nums数组的长度
//   // space complexity(n * sum):
//   const n = nums.length
//   // sum为nums数组的元素之和，题目中保证nums的元素都为非负数，否则需要做绝对值处理。
//   const sum = nums.reduce((sum, num) => sum + num, 0)
//   // target的有效范围在[-sum, sum]之内，否则无法求出结果
//   if (Math.abs(target) > sum) {
//     return 0
//   }
//   const dp = new Array(n + 1).fill(0).map(() => new Array(2 * sum + 1).fill(0))
//   dp[0][sum] = 1
//   for (let i = 1; i <= n; i += 1) {
//     const num = nums[i - 1]
//     for (let j = -sum; j <= sum; j += 1) {
//       // 边界判断
//       if (j - num + sum >= 0) {
//         dp[i][j + sum] += dp[i - 1][j - num + sum]
//       }
//       if (j + num + sum <= 2 * sum) {
//         dp[i][j + sum] += dp[i - 1][j + num + sum]
//       }
//     }
//   }
//   return dp[n][target + sum]
// }

// function findTargetSumWays(nums, target) {
//   const n = nums.length
//   const cache = new Map()
//   return dfs(0, 0)
//   function dfs(sum, index) {
//     const key = `${sum}-${index}`
//     if (cache.has(key)) {
//       return cache.get(key)
//     }
//     if (index === n) {
//       cache.set(key, sum === target ? 1 : 0)
//       return cache.get(key)
//     }
//     const left = dfs(sum + nums[index], index + 1)
//     const right = dfs(sum - nums[index], index + 1)
//     cache.set(key, left + right)
//     return cache.get(key)
//   }
// }

// function findTargetSumWays(nums, target) {
//   const n = nums.length;
//   let ans = 0;
//   dfs(0, 0);
//   return ans;
//   function dfs(sum, index) {
//     if (index === n) {
//       if (sum === target) {
//         ans += 1;
//       }
//       return;
//     }
//     dfs(sum + nums[index], index + 1);
//     dfs(sum - nums[index], index + 1);
//   }
// }
// @lc code=end

const assert = require('assert').strict

const res1 = findTargetSumWays([1, 1, 1, 1, 1], 3)
assert.equal(res1, 5)

const res2 = findTargetSumWays([1], 1)
assert.equal(res2, 1)

/**

1. 递归，回溯， O(2^n)，n为nums数组的长度

2. 记忆化搜索

3. 动态规划
参考解法2， 可以定义出动态规划方程式
dp[i][j]，表示nums中前i个元素，当前计算结果为j的方案数，令nums从下标1开始。

那么dp[n][target]为目标答案，f[0][0] = 1初始条件：代表不考虑任何数，凑出结算结果为0的方案数为1种。

根据每个数值只能搭配 + / - 使用，可得出状态转移方程式：
dp[i][j] = dp[i-1][j-nums[i-1]] + dp[i-1][j-nums[i-1]]

当使用递推形式时，我们通常会使用「静态数组」来存储动规值，因此还需要考虑维度范围的:
- 第一维度为物品数量：范围为nums数组长度
- 第二维度为中间结果：令sum为所有nums元素的总和，那么中间结果的范围为[-sum, sum]

因此我们可以确认出dp数组的大小。同时在转移时，对第二维度使用一个sum的右偏移，以确保
「负权值」也能够被合理计算/存储。

https://leetcode-cn.com/problems/target-sum/solution/gong-shui-san-xie-yi-ti-si-jie-dfs-ji-yi-et5b/

4. 动态规划，优化
在3中，总是将所有的状态值都计算出来，这当中包含很多对「目标状态」不可能达到的“额外”状态值。

例如当target不为-sum或sum是，-sum和sum就是两个对「目标状态」不可能达到的“额外”状态值，
到达-sum 或 sum 已经使用完所有数值，对target不可达到。

那么如何规避这些“额外”的状态值呢。

我们可以从哪些数值使用哪种符号来分析，即划分为「负值部分」&「非负值部分」，
令「负值部分」的绝对值总和为 neg，可得出：
  (sum - neg) - neg = sum - 2neg = target
变形得出：
  neg = (sum - target) / 2

(PS: sum - neg 表示「非负值部分」，它减去「负值部分」的差值即为target)

问题转化为：只使用 + 运算符，从nums凑出neg的方案数。

另外，由于nums均为非负整数，因此需要确保sum - target能够被2整除。

定义dp[i][j]为从nums凑出总数「恰好」为j的方案数。
dp[n][neg]就是所求答案，dp[0][0]=1为初始条件，代表不考虑任何数，凑出计算结果为 0 的方案数为 1 种。
每个数值有「选」和「不选」两种决策，转移方程为：
dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i-1]]

 */
