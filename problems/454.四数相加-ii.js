/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=454 lang=javascript
 *
 * [454] 四数相加 II
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
function fourSumCount(A, B, C, D) {
  // 回溯
  // 此解会超时
  let res = 0;
  const nums = [A, B, C, D];
  const queue = [];
  backtrack(0);
  return res;
  function backtrack(index) {
    if (index === 4) {
      const total = queue.reduce((pre, cur) => pre + cur, 0);
      if (total === 0) res += 1;
      return;
    }
    const currentNum = nums[index];
    for (const num of currentNum) {
      queue.push(num);
      backtrack(index + 1);
      queue.pop();
    }
  }
}
// @lc code=end

fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]); // 2
