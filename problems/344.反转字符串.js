/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// TODO：2

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // 递归
  if (!s || !s.length) return;
  helper(s, 0, s.length - 1);
  function helper(s, left, right) {
    if (left >= right) return;
    [s[left], s[right]] = [s[right], s[left]];
    helper(s, left + 1, right - 1);
  }
}
// @lc code=end

// const reverseString = (s) => {
//   // 双指针
//   let i = 0;
//   let j = s.length - 1;
//   while (i < j) {
//     // [s[i], s[j]] = [s[j], s[i]];
//     const temp = s[i];
//     s[i] = s[j];
//     s[j] = temp;
//     i += 1;
//     j -= 1;
//   }
// };

const res1 = ['h', 'e', 'l', 'l', 'o'];
reverseString(res1); // ["o","l","l","e","h"]

const res2 = ['H', 'a', 'n', 'n', 'a', 'h'];
reverseString(res2); // ["h","a","n","n","a","H"]
