/*
 * @lc app=leetcode.cn id=2207 lang=javascript
 *
 * [2207] 字符串中最多数目的子序列
 */

// @lc code=start
/**
 * @param {string} text
 * @param {string} pattern
 * @return {number}
 */
var maximumSubsequenceCount = function(text, pattern) {
  // 题解：https://leetcode.cn/problems/maximize-number-of-subsequences-in-a-string/solutions/1352039/by-endlesscheng-yfyf/
  // 遍历统计答案：遇到y时，如果左边出现3个x，那么就意味着找到了3个pattern，把3加入答案。
  // 一般地，在遍历 text 的同时，维护 x 的出现次数 cntX。遇到 y 时，把 cntX 加入答案。
  // 然后考虑插入字母的情况。
  // 
  // 根据题意，
  // x 插入的位置越靠左，pattern 子序列的个数越多；
  // y 插入的位置越靠右，pattern 子序列的个数越多。
  // 那么 x 应插在 text 最左侧，y 应插在 text 最右侧。
  // 分类讨论：
  // 把 x 插在 text 最左侧：答案额外增加 cntY，其中 cntY 是 y 在 text 中的出现次数。
  // 把 y 插在 text 最右侧：答案额外增加 cntX，其中 cntX 是 x 在 text 中的出现次数。

  const [x, y] = pattern
  let ans = 0
  let cntX = 0
  let cntY = 0
  for (const c of text) {
    if (c === y) {
      ans += cntX
      cntY += 1
    }
    if (c === x) {
      cntX += 1
    }
  } 
  return ans + Math.max(cntX, cntY)
};
// @lc code=end
