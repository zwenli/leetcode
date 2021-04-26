/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=860 lang=javascript
 *
 * [860] 柠檬水找零
 */

// @lc code=start
/**
 * @param {number[]} bills
 * @return {boolean}
 */
function lemonadeChange(bills) {
  // 贪心，此解法为何叫贪心，在当前状态做出最优选择，体现在20的选择
  // 时间复杂度O(n): n为数组长度，每个只遍历一次
  // 空间复杂度O(1): 常量空间
  if (!bills || !bills.length) return false;
  let five = 0;
  let ten = 0;
  for (const bill of bills) {
    if (bill === 5) {
      // 5，直接收入
      five += 1;
    } else if (bill === 10) {
      // 10 找回5
      if (five === 0) return false;
      five -= 1;
      ten += 1;
    } else if (bill === 20) {
      // 20，有两种方案找零，一是一张10，一张5，而是三张5
      // 两种方案更倾向与第一种，应为使用5的场景更多，需要尽可能保留5
      if (ten > 0 && five > 0) {
        ten -= 1;
        five -= 1;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}
// @lc code=end

const res1 = lemonadeChange([5, 5, 5, 10, 20]); // true

const res2 = lemonadeChange([5, 5, 10, 10, 20]); // false
