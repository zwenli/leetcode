/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function lengthOfLastWord(s) {
  // 倒序遍历
  let ans = 0;
  let i = s.length - 1;
  // 跳过末尾的空格
  while (i >= 0 && s[i] === ' ') i -= 1;
  while (i >= 0) {
    if (s[i] !== ' ') {
      ans += 1; // 计数
      i -= 1;
    } else break; // 遇到空格跳出循环
  }
  return ans;
}

// function lengthOfLastWord(s) {
//   const words = s.trim().split(/\s+/);
//   return words[words.length - 1].length;
// }
// @lc code=end

const res1 = lengthOfLastWord('Hello World');
// 5

const res2 = lengthOfLastWord('   ');
// 0

const res3 = lengthOfLastWord('a   ');
// 1

/**

1. 分割，计算最后一个单词长度

2. 用状态机？

 */
