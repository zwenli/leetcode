/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseString = (s) => {
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    const temp = s[i];
    s[i] = s[j];
    s[j] = temp;
    i += 1;
    j -= 1;
  }
};
// @lc code=end

const res1 = ['h', 'e', 'l', 'l', 'o'];
reverseString(res1); // ["o","l","l","e","h"]

const res2 = ['H', 'a', 'n', 'n', 'a', 'h'];
reverseString(res2); // ["h","a","n","n","a","H"]
