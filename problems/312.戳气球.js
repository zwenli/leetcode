/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=312 lang=javascript
 *
 * [312] 戳气球
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

function maxCoins(nums) {
  // 动态规划
  // time complexity O(n^3): n为气球数量，n^2为区间数量，区间迭代的时间复杂度O(n)
  // space complexity O(n^2):
  const n = nums.length;
  const val = [1, ...nums, 1]; // 增加两个哨兵，处理边界情况
  const dp = new Array(n + 2).fill(0).map(
    () => new Array(n + 2).fill(0),
  );
  // 0 <- i, j -> n + 1
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = i + 2; j <= n + 1; j += 1) {
      for (let k = i + 1; k < j; k += 1) {
        let sum = val[i] * val[k] * val[j];
        sum += dp[i][k] + dp[k][j];
        dp[i][j] = Math.max(dp[i][j], sum);
      }
    }
  }
  return dp[0][n + 1];
}

// function maxCoins(nums) {
//   // 回溯，会超时
//   let ans = 0;
//   backtrack(nums, 0);
//   return ans;
//   function backtrack(rest, cur) {
//     if (!rest.length) {
//       ans = Math.max(ans, cur);
//       return;
//     }
//     const n = rest.length;
//     for (let i = 0; i < n; i += 1) {
//       const num = rest[i];
//       const sum = (i - 1 < 0 ? 1 : rest[i - 1]) * (i + 1 >= n ? 1 : rest[i + 1]) * num;
//       rest.splice(i, 1);
//       backtrack(rest, cur + sum);
//       // backtrack
//       rest.splice(i, 0, num);
//     }
//   }
// }
// @lc code=end

const res3 = maxCoins([7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3]);
// 1654
const res1 = maxCoins([3, 1, 5, 8]);
// 167
const res2 = maxCoins([1, 5]);
// 10

// 回溯
// https://leetcode-cn.com/problems/burst-balloons/solution/zhe-ge-cai-pu-zi-ji-zai-jia-ye-neng-zuo-guan-jian-/
// https://leetcode-cn.com/problems/burst-balloons/solution/chuo-qi-qiu-by-leetcode-solution/
// dp[i,j] 表示开区间(i,j)能得到的最多硬币数，转移方程如下：
// i < j - 1: dp[i,j] = k在[i + 1, j - 1] max(val[i] * val[k] * val[j] + dp[i,k] + dp[k,j])
// i >= j - 1: dp[i,j] = 0; // 开区间内已经不存在气球了。
// dp[0][n-1]就是我们所要求的答案，注意动态规划的次序。
// i，j也就是left,right是往两边扩散的，<- i, j ->
// k可以理解为是在开区间内最后一个戳爆的气球，由于是最后一个戳爆了，周围已经没有气球，只剩下i,j
// 那么戳k所获得的金币就是val[i] * val[k] * val[j]
// 同时k是最后一个戳的，那么以k为分界两边必然是先各自被戳爆的，互不干扰
// 也就是依赖dp[i,k],dp[k,j]的状态，分别求出各自区间的最大值即可。
