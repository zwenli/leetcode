/*
 * @lc app=leetcode.cn id=917 lang=javascript
 *
 * [917] 仅仅反转字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

function reverseOnlyLetters(s) {
  // 双指针, 头尾指针都是字母就交换，负责非字母的指针位移
  if (!s || !s.length) return s;
  let arr = Array.from(s);
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    if (!isLetter(arr[i])) {
      i += 1;
    } else if (!isLetter(arr[j])) {
      j -= 1;
    } else {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i += 1;
      j -= 1;
    }
  }
  return arr.join('');
  
  function isLetter(ch) {
    return /[a-zA-Z]/.test(ch);
  }
};

// function reverseOnlyLetters(s) {
//   // 双指针
//   if (!s || !s.length) return s;
//   let ans = '';
//   let n = s.length;
//   let j = n - 1;
//   for (let i = 0; i < n; i++) {
//     if (isLetter(s.charAt(i))) {
//       while (j >= 0 && !isLetter(s.charAt(j))) j--;
//       ans += s.charAt(j--);
//     } else {
//       ans += s.charAt(i);
//     }
//   }
//   // let i = 0;
//   // let j = n - 1;
//   // while (i < n || j >= 0) {
//   //   if (isLetter(s.charAt(i))) {
//   //     if (isLetter(s.charAt(j))) {
//   //       ans += s.charAt(j);
//   //       i += 1;
//   //       j -= 1;
//   //     } else {
//   //       j -= 1;
//   //     }
//   //   } else {
//   //     ans += s.charAt(i);
//   //     i += 1;
//   //   }
//   // }
//   return ans;
  
//   function isLetter(ch) {
//     return /[a-zA-Z]/.test(ch);
//   }
// };

// function reverseOnlyLetters(s) {
//   // 栈
//   // time complexity O(n): n为字符串的长度，两次遍历
//   // space complexity O(n): 栈的空间不超过O(n)
//   if (!s || !s.length) return s;
//   const arr = Array.from(s);
//   const n = arr.length;
//   const stack = [];
//   for (let i = 0; i < n; i += 1) {
//     if (isLetter(arr[i])) stack.push(arr[i]);
//   }
//   for (let i = 0; i < n; i += 1) {
//     if (isLetter(arr[i])) arr[i] = stack.pop();
//   }
//   return arr.join('');
//   function isLetter(ch) {
//     return /[a-zA-Z]/.test(ch);
//   }
// };
// @lc code=end

const assert = require('assert').strict;

const res1 = reverseOnlyLetters('ab-cd');
assert.equal(res1, 'dc-ba');
const res2 = reverseOnlyLetters('a-bC-dEf-ghIj');
assert.equal(res2, 'j-Ih-gfE-dCba');
/**
1. 栈
  第一次遍历将字母入栈
  第二次遍历，遇到字母则出栈
2. 双指针
  i 顺序 对应非字母字符
  j 逆序 对应字母字符
3. 另一种思路的双指针
  i 头 j尾巴，当i，j都字母字符时就就换，否则移动指针
 */
