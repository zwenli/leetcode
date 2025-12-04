/*
 * @lc app=leetcode.cn id=150 lang=javascript
 *
 * [150] 逆波兰表达式求值
 */

// @lc code=start
function evalRPN(tokens) {
  const stack = []
  for (const token of tokens) {
    if (isNumber(token)) {
      stack.push(Number(token))
    } else {
      const b = stack.pop()
      const a = stack.pop()
      if (token === '+') {
        stack.push(a + b)
      } else if (token === '-') {
        stack.push(a - b)
      } else if (token === '*') {
        stack.push(a * b)
      } else if (token === '/') {
        stack.push(a / b > 0 ? Math.floor(a / b) : Math.ceil(a / b))
      }
    }
  }
  return stack.pop()
};

function isNumber(token) {
  return !['+', '-', '*', '/'].includes(token);
}
// @lc code=end
