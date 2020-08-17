/**
 * 逆波兰表达式：

逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。

平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) * ( 3 + 4 ) 。
该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) * ) 。
逆波兰表达式主要有以下两个优点：

去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + * 也可以依据次序计算出正确结果。
适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中。

JavaScript



作者：力扣 (LeetCode)
链接：https://leetcode-cn.com/leetbook/read/queue-stack/gomvm/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  // + - * /
  var stack = []
  for (let token of tokens) {
    if (token === '+') {
      const y = stack.pop()
      const x = stack.pop()
      stack.push(x + y)
    } else if (token === '-') {
      const y = stack.pop()
      const x = stack.pop()
      stack.push(x - y)
    } else if (token === '*') {
      const y = stack.pop()
      const x = stack.pop()
      stack.push(x * y)
    } else if (token === '/') {
      const y = stack.pop()
      const x = stack.pop()
      stack.push(parseInt(x / y))
    } else {
      stack.push(Number(token))
    }
  }
  
  if (stack.length === 1) {
    return stack[0]
  } else {
    throw new Error('tokens parser error')
  }
}

var res1 = evalRPN(["2", "1", "+", "3", "*"]) // 9
var res2 = evalRPN(["4", "13", "5", "/", "+"]) // 6
var res3 = evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]) // 22

console.log(res1)
console.log(res2)
console.log(res3)