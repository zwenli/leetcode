/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  // dfs, 会超时, 加上剪枝也是会超时
  if (!coins || !coins.length) return -1;
  if (amount === 0) return 0;
  coins.sort((a, b) => b - a); // 排序，优先处理大的

  let minCnt = Infinity;
  dfs(0, 0);
  return minCnt === Infinity ? -1 : minCnt;

  function dfs(cur, cnt) {
    if (cur === amount) {
      minCnt = Math.min(cnt, minCnt);
      return;
    }
    if (cur > amount) return;
    // 已经超过当前最小的兑换，无需继续处理了
    if (cnt + 1 >= minCnt) return;
    for (const coin of coins) {
      dfs(cur + coin, cnt + 1);
    }
  }
}
// @lc code=end

const res1 = coinChange([1, 2, 5], 11); // 3

const res2 = coinChange([2], 3); // -1

const res3 = coinChange([1], 0); // 0

const res4 = coinChange([1], 1); // 1

const res5 = coinChange([1], 2); // 2
