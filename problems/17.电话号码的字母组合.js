/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// TODO

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
  // 回溯
  // 时间复杂度O(3^m*4^n): m是输入对应3个字母的数字个数，n是输入对应4个字母的数字个数，不同的字母组合有3^m*4^n种；
  // 空间复杂度O(m+n): 递归调用的层数最多为m+n

  const store = new Map();
  store.set('2', 'abc');
  store.set('3', 'def');
  store.set('4', 'ghi');
  store.set('5', 'jkl');
  store.set('6', 'mno');
  store.set('7', 'pqrs');
  store.set('8', 'tuv');
  store.set('9', 'wxyz');

  const combination = []; // 保存已有的字母排列
  const combinations = []; // 保存结果的
  backtrack(0);
  return combinations;

  function backtrack(index) {
    if (digits.length === index) {
      // 处理完所有数字，将字母组合存入结果
      combinations.push(combination.join(''));
    } else {
      const digit = digits[index];
      const tempStr = store.get(digit);
      for (const tempChar of tempStr) {
        combination.push(tempChar); // 当前字母放进已有的字母队列中
        backtrack(index + 1); // 继续处理号码的下一位
        combination.pop(); // 回退操作
      }
    }
  }
}
// @lc code=end

// function letterCombinations(digits) {
//   // BFS
//   const store = new Map();
//   store.set('2', 'abc');
//   store.set('3', 'def');
//   store.set('4', 'ghi');
//   store.set('5', 'jkl');
//   store.set('6', 'mno');
//   store.set('7', 'pqrs');
//   store.set('8', 'tuv');
//   store.set('9', 'wxyz');
//   const queue = [''];
//   // const result = [];
//   const { length } = digits;
//   if (!length) return [];

//   for (const targetChar of digits) {
//     // 统计上一层的数量。
//     const size = queue.length;
//     for (let i = 0; i < size; i += 1) {
//       const tempStr = queue.shift();
//       const targetStr = store.get(targetChar);
//       for (const tempChar of targetStr) {
//         queue.push(tempStr + tempChar);
//       }
//     }
//   }
//   return queue;
// }

// function letterCombinations(digits) {
//   // 递归DFS
//   // 时间复杂度O(3^m*4^n): m是输入对应3个字母的数字个数，n是输入对应4个字母的数字个数，不同的字母组合有3^m*4^n种，理解为树的DFS
//   // 空间复杂度O(m+n): 树的深度
//   // 字典表
//    const store = {
//      2: ['a', 'b', 'c'],
//      3: ['d', 'e', 'f'],
//      4: ['g', 'h', 'i'],
//      5: ['j', 'k', 'l'],
//      6: ['m', 'n', 'o'],
//      7: ['p', 'q', 'r', 's'],
//      8: ['t', 'u', 'v'],
//      9: ['w', 'x', 'y', 'z'],
//    };
//   const store = new Map();
//   store.set('2', 'abc');
//   store.set('3', 'edf');
//   store.set('4', 'ghi');
//   store.set('5', 'jkl');
//   store.set('6', 'mno');
//   store.set('7', 'pqrs');
//   store.set('8', 'tuv');
//   store.set('9', 'wxyz');

//   // const arr = digits.split('');
//   const { length } = digits;
//   const res = [];
//   if (!length) return res;
//   helper(0, '');
//   return res;
//   function helper(i, str) {
//     if (i === length) {
//       res.push(str);
//       return;
//     }
//     const targetChar = digits[i];
//     const targetStr = store.get(targetChar);
//     for (const tempChar of targetStr) {
//       helper(i + 1, str + tempChar);
//     }
//   }
// }

const res1 = letterCombinations('23');
