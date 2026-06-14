/*
 * @lc app=leetcode.cn id=921 lang=typescript
 *
 * [921] 使括号有效的最少添加
 */

// @lc code=start
function minAddToMakeValid(s: string): number {
  let leftOpen = 0
  let leftNeed = 0
  for (const ch of s) {
    if (ch === '(') {
      leftOpen++
    } else {
      if (leftOpen) {
        leftOpen--
      } else {
        leftNeed++
      }
    }
  }
  return leftOpen + leftNeed
};
// @lc code=end
