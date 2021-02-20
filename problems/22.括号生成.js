/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */

function generateParenthesis(n) {
  class Node {
    constructor(str, left, right) {
      this.str = str;
      this.left = left;
      this.right = right;
    }
  }
  // 6. bfs，参考2，需要手动维护递归栈，用自定义节点实现
  // 时间复杂度O():
  // 空间复杂度O():
  const res = [];
  const queue = [new Node('', 0, 0)];
  while (queue.length) {
    const node = queue.shift();
    if (node.left === n && node.right === n) {
      res.push(node.str);
      continue;
    }
    if (node.left < n) {
      queue.push(new Node(node.str + '(', node.left + 1, node.right));
    }
    if (node.right < node.left) {
      queue.push(new Node(node.str + ')', node.left, node.right + 1));
    }
  }
  return res;
}

// function generateParenthesis(n) {
//   // 5. 基于4的动态规划，
//   // 时间复杂度O():
//   // 空间复杂度O():
//   const dp = [[''], ['()']]; // base case
//   // 要算出dp[n]，需要先算出n之前的结果
//   for (let i = 2; i <= n; i += 1) {
//     const res = [];
//     // 当前dp[i]的结果是dp[j],dp[i-j-1]之和
//     for (let j = 0; j < i; j += 1) {
//       for (const left of dp[j]) {
//         for (const right of dp[i - j - 1]) {
//           res.push(`(${left})${right}`);
//         }
//       }
//     }
//     dp[i] = res;
//   }
//   return dp[n];
// }
// function generateParenthesis(n) {
//   // 4. 递归，另一种，(a)b
//   // 时间复杂度O():
//   // 空间复杂度O():
//   const cache = [];
//   return generate(n);

//   function generate(n) {
//     if (cache[n]) return cache[n];
//     const res = [];
//     if (n === 0) {
//       res.push('');
//     } else {
//       for (let i = 0; i < n; i += 1) {
//         for (const a of generate(i)) {
//           for (const b of generate(n - i - 1)) {
//             res.push(`(${a})${b}`);
//           }
//         }
//       }
//     }
//     cache[n] = res;
//     return res;
//   }
// }
// function generateParenthesis(n) {
//   // 2. 递归dfs，剪枝优化
//   // 时间复杂度O():
//   // 空间复杂度O():
//   const res = [];
//   generate('', 0, 0, n, res);
//   return res;

//   function generate(curStr, left, right, n, res) {
//     if (left === n && right === n) {
//       res.push(curStr);
//       return;
//     }
//     // 左括号数量小于n，说明还可以放入左括号
//     if (left < n) {
//       generate(curStr + '(', left + 1, right, n, res);
//     }
//     // 右括号数量小于左括号数量，还可以放入右括号
//     if (right < left) {
//       generate(curStr + ')', left, right + 1, n, res);
//     }
//   }
// }
// function generateParenthesis(n) {
//   // 1. 暴力法，
//   // 时间复杂度O(2^2n*n): 生成2^2*n的括号序列，每个括号序列校验的时间复杂度为O(n)
//   // 空间复杂度O(n): 除答案数组的空间，还要递归调用栈的空间，栈的空间取决于递归深度，也就是2n，即O(n)
//   const res = [];
//   generate(n * 2, 0, '', res);
//   return res;

//   function generate(len, pos, curStr, res) {
//     if (len === pos) {
//       if (vaild(curStr)) res.push(curStr);
//       return;
//     }
//     generate(len, pos + 1, curStr + '(', res);
//     generate(len, pos + 1, curStr + ')', res);
//   }

//   function vaild(str) {
//     const FLAG = {
//       '(': 1,
//       ')': -1,
//     };
//     let balance = 0;
//     for (let i = 0; i < str.length; i += 1) {
//       balance += FLAG[str[i]];
//       if (balance < 0) return false;
//     }
//     return balance === 0;
//   }
// }
// @lc code=end

const res1 = generateParenthesis(1); // ["()"]
const res2 = generateParenthesis(3); // ["((()))","(()())","(())()","()(())","()()()"]

// 解法
// 1. 生成2^(3*2)所有可能，再过滤无效的结果
// 2. 递归生成过程中就判断是否有效，（剪枝）
//   左括号，当 左 < n,可以继续添加
//   右括号，当 右 < 左，可以继续添加
// 3. 回溯，思路和2一样，没学到回溯，暂时不用
// 4. 也是递归，思路为：
//   合法的括号序列必为(a)b，a和b分别为合法的括号序列（可为空）
//   生成函数generate(n),
//   递归调用generate(i)即可计算a的所有可能性，
//   递归调用generate(n-i-1)即可计算b的所有可能性， i < n
//   遍历a和b的所有可能性拼装，即可得出2*n长度的括号序列
// 5. 动态规划实现4
// 6. 2的思路是dfs，用bfs也可实现，但是得手动维度调用栈，也就是得实现自定义节点，存储当前的left,right,curStr
