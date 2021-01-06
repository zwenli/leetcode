/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */

// 栈
// 时间复杂度O(n): 每个字符遍历一次
// 空间复杂度O(n): 极端情况下栈的空间等于字符串的长度
function isValid(s) {
  const { length } = s;
  if (length % 2 === 1) return false;
  // const dict = new Map([
  //   [')', '('],
  //   ['}', '{'],
  //   [']', '['],
  // ]);
  const stack = [];

  for (let i = 0; i < length; i += 1) {
    const char = s.charAt(i);
    if (char === '(') {
      stack.push(')');
    } else if (char === '[') {
      stack.push(']');
    } else if (char === '{') {
      stack.push('}');
    } else if (stack.pop() !== char) {
      return false;
    }
  }
  return stack.length === 0;
}
// @lc code=end
// 栈 + 字典
// 时间复杂度O(n): 每个字符遍历一次
// 空间复杂度O(n): 极端情况下栈的空间等于字符串的长度，还有字典占用了O(1)的空间
// function isValid(s) {
//   const { length } = s;
//   if (length % 2 === 1) return false;
//   const dict = new Map([
//     [')', '('],
//     ['}', '{'],
//     [']', '['],
//   ]);
//   const stack = [];

//   for (let i = 0; i < length; i += 1) {
//     const char = s.charAt(i);
//     // 判断是否为右括号
//     if (dict.has(char)) {
//       // 如果栈为空，或右括号和栈顶的左括号不匹配，说明不是有效的，直接返回false
//       if (stack.length === 0 || stack.pop() !== dict.get(char)) {
//         return false;
//       }
//     } else {
//       stack.push(char);
//     }
//   }
//   return stack.length === 0;
// }
const res1 = isValid(''); // true
const res2 = isValid(']'); // false
const res3 = isValid('[]{}'); // true
