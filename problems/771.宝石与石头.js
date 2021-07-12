/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=771 lang=javascript
 *
 * [771] 宝石与石头
 */

// @lc code=start
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */

function numJewelsInStones(jewels, stones) {
  // 哈希
  let ans = 0;
  const jewelSet = new Set();
  for (const jewel of jewels) {
    jewelSet.add(jewel);
  }
  for (const stone of stones) {
    if (jewelSet.has(stone)) ans += 1;
  }
  return ans;
}
// @lc code=end

const res1 = numJewelsInStones('aA', 'aAAbbbb');
// 3
const res2 = numJewelsInStones('z', 'ZZ');
// 0;
