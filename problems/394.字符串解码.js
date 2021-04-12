/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=394 lang=javascript
 *
 * [394] 字符串解码
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
function decodeString(s) {
  let res = '';
  let mul = 0;
  const stack = [];

  for (const char of s) {
    if (char === '[') {
      stack.push({
        res,
        mul,
      });
      res = '';
      mul = 0;
    } else if (char === ']') {
      const last = stack.pop();
      res = last.res + res.repeat(last.mul);
    } else if (char >= 0 && char <= 9) {
      mul = mul * 10 + Number(char);
    } else {
      res += char;
    }
  }
  return res;
}
// @lc code=end

const res = decodeString('3[a]2[bc]');
const res2 = decodeString('f3[a2[c]]');

console.log(res); // "aaabcbc"
console.log(res2); // "faccaccacc"
