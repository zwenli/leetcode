/*
 * @lc app=leetcode.cn id=403 lang=javascript
 *
 * [403] 青蛙过河
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {boolean}
 */

function canCross(stones) {
  // 动态规划
  // time complexity O(n^2)
  // space complexity O(n^2)
  const n = stones.length;
  // dp(i,k) 表示第i个石头可以是否跳跃k个单元
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(false));
  dp[0][1] = true; // 第一步只能跳跃一个单元
  for (let i = 1; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      const gap = stones[i] - stones[j];
      if (gap < 0 || gap > n || !dp[j][gap]) continue;
      dp[i][gap] = true;
      if (gap - 1 >= 0) dp[i][gap - 1] = true;
      if (gap + 1 < n) dp[i][gap + 1] = true;
      if (i === n - 1) return true;
    }
  }
  return false;
}
// function canCross(stones) {
//   // 动态规划
//   // dp(i,k) 表示 青蛙能否到达石头i，且上一次跳跃距离为k的状态
//   // dp(i,k) = dp(j,k+1) || dp(j, k) || dp(j, k-1)
//   // 式中j表示上一个的石头编号j，且满足stones[i]-stones[j] = k
//   // 初始条件为dp(0,0)=true,当找到一个dp(n-1,k)为真时，就可以知道青蛙能到达终点了
//   // 对于石头i，枚举所有的j，那么上一次跳跃距离k=stones[i]-stones[j],
//   // 如果在第j个石头上，其上一次跳跃距离可以是k-1,k,k+1三个其中一个，
//   // 这样才能从j跳到i，那么只需检查三个状态其中一个为真即可
//   // 推论
//   // 1. 现在石头编号为i时，上一次跳跃距离必定满足k <= i
//   //    当青蛙位于石头0时，k = 0,之后每次跳跃，青蛙的石头编码至少增加1，
//   //    而每次跳跃的距离最多增加1。
//   //    当跳跃m次后，青蛙所处现在的石头编号i >= m, 上次跳跃距离 k <= m
//   //    所以 i >= k
//   //    这样我们就可以从后往前枚举j，当上一次跳跃距离k>j+1时，我们即可以停止跳跃，
//   //    因为在第j个石头上我们最多只能跳跃j+1的距离
//   // 2. 当第i个石子与第i-1个石子距离超过i时，青蛙必定无法到达终点
//   //    由结论1可知，当青蛙到达第 i-1 个石子时，它的「上一次跳跃距离」至多为 i-1，因此青蛙在第 1 个石子上最远只能跳出 i 的距离。
//   //    而距离第 i-1 个石子最近的石子即为第 i 个石子，它们的距离超过了青蛙当前能跳出的最远距离，因此青蛙无路可跳。
//   //    因此我们可以提前检查是否有相邻的石子不满足条件，如果有，我们可以提前返回 false.
//   const n = stones.length;
//   const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
//   dp[0][0] = true;
//   for (let i = 1; i < n; i += 1) {
//     if (stones[i] - stones[i - 1] > i) return false;
//   }
//   for (let i = 1; i < n; i += 1) {
//     for (let j = i - 1; j >= 0; j -= 1) {
//       const k = stones[i] - stones[j];
//       if (k > j + 1) {
//         break;
//       }
//       dp[i][k] = dp[j][k - 1] || dp[j][k] || dp[j][k + 1];
//       if (i === n - 1 && dp[i][k]) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// function canCross(stones) {
//   // 记忆化搜索
//   const n = stones.length;
//   // 由于只要找到其中一种能过河的结果，就立即返回true了
//   // 如果第二次遇到同一个子问题，说明第一次遇到它时，
//   // 它返回的肯定是false，唯有false，才会继续搜别的分支，
//   // 否则它就向上返回true了，整个true掉，不可能再遇到该重复子问题。
//   const seen = new Set();
//   return dfs(0, 0);
//   // 设间距gap = stones[j] - stones[i], k和gap满足以下三个关系
//   // gap >= k - 1 && gap <= k + 1, 说明能从石头i跳到石头j，继续递归，看看能不能跳到最后，返回真
//   // gap > k + 1, 跳不到石头j，后面的石头也是跳不到的了，无需继续找
//   // gap < k - 1, 说明距离太近而跳不到石头j，继续找下个石头能不能跳到。
//   function dfs(i, k) {
//     const key = i * 2000 + k;
//     if (seen.has(key)) {
//       return false;
//     } else {
//       seen.add(key);
//     }
//     for (let j = i + 1; j < n; j += 1) {
//       const gap = stones[j] - stones[i];
//       if (gap >= k - 1 && gap <= k + 1) {
//         if (dfs(j, gap)) return true;
//       } else if (gap > k + 1) {
//         break;
//       }
//     }
//     return i === n - 1;
//   }
// }
// function canCross(stones) {
//   // 记忆化搜索
//   const n = stones.length;
//   const memo = new Map();
//   return dfs(0, 0);
//   // 设间距gap = stones[j] - stones[i], k和gap满足以下三个关系
//   // gap >= k - 1 && gap <= k + 1, 说明能从石头i跳到石头j，继续递归，看看能不能跳到最后，返回真
//   // gap > k + 1, 跳不到石头j，后面的石头也是跳不到的了，无需继续找
//   // gap < k - 1, 说明距离太近而跳不到石头j，继续找下个石头能不能跳到。
//   function dfs(i, k) {
//     if (i === n - 1) return true;
//     const key = i * 2000 + k;
//     if (memo.has(key)) return memo.get(key);
//     for (let j = i + 1; j < n; j += 1) {
//       const gap = stones[j] - stones[i];
//       if (gap >= k - 1 && gap <= k + 1) {
//         if (dfs(j, gap)) {
//           memo.set(key, true);
//           return memo.get(key);
//         }
//       } else if (gap > k + 1) {
//         break;
//       }
//     }
//     memo.set(key, false);
//     return memo.get(key);
//   }
// }

// function canCross(stones) {
//   // dfs
//   const n = stones.length;
//   // 初始化k = 0, 满足假定它第一步只能跳跃一个单位
//   return dfs(0, 0);
//   // 设间距gap = stones[j] - stones[i], k和gap满足以下三个关系
//   // gap >= k - 1 && gap <= k + 1, 说明能从石头i跳到石头j，继续递归，看看能不能跳到最后，返回真
//   // gap > k + 1, 跳不到石头j，后面的石头也是跳不到的了，无需继续找
//   // gap < k - 1, 说明距离太近而跳不到石头j，继续找下个石头能不能跳到。
//   function dfs(i, k) {
//     for (let j = i + 1; j < n; j += 1) {
//       const gap = stones[j] - stones[i];
//       if (gap >= k - 1 && gap <= k + 1) {
//         if (dfs(j, gap)) return true;
//       } else if (gap > k + 1) {
//         break;
//       }
//     }
//     return i === n - 1;
//   }
// }
// @lc code=end

const res1 = canCross([0, 1, 3, 5, 6, 8, 12, 17]);
// true
const res2 = canCross([0, 1, 2, 3, 4, 8, 9, 11]);
// false
const res3 = canCross([0, 2]);
// false
const res4 = canCross([0, 1, 3, 6, 7]);
// false
