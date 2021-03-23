/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */

// function combine(n, k) {
//   // 2. 递归，根据选与不选组合枚举
//   // 时间复杂度O((n k) * k): 组合枚举的时间复杂度为O((n k))，每次记录答案的时间复杂度为O(k)
//   // 空间复杂度O(n): 递归调用栈的空间复杂度为O(n)，临时数组的空间复杂度为O(k)
//   const ans = [];
//   const temp = [];
//   if (k <= 0 || n < k) return ans;
//   backtrack(1, n, k, temp, ans);
//   return ans;
//   function backtrack(start, n, k, temp, ans) {
//     if (k === 0) {
//       // k等于0表示已无需再选择数
//       ans.push([...temp]);
//       return;
//     }
//     // 剪枝优化，
//     // 以n=5,k=3为例子，已选择1，当start为5时，可选性的值小于2，不够选择，也即无需再遍历了
//     // 也就是有效数字满足 start <= n - k + 1
//     if (start > n - k + 1) return;
//     // 不选择当前的数
//     backtrack(start + 1, n, k, temp, ans);
//     // 选择当前的数
//     temp.push(start);
//     // 这里的k表示还需选择多少个数
//     backtrack(start + 1, n, k - 1, temp, ans);
//     // 回溯
//     temp.pop();
//   }
// }
// function combine(n, k) {
//   // 1. 递归，根据搜索起点，递归树，性能比2好
//   // 时间复杂度O((n k) * k): 组合枚举的时间复杂度为O((n k))，每次记录答案的时间复杂度为O(k)
//   // 空间复杂度O(k): 递归调用栈的空间复杂度为O(k)，临时数组的空间复杂度为O(k)
//   const ans = [];
//   const temp = [];
//   if (k <= 0 || n < k) return ans;
//   backtrack(1, n, k, temp, ans);
//   return ans;
//   function backtrack(start, n, k, temp, ans) {
//     if (temp.length === k) {
//       ans.push([...temp]);
//       return;
//     }
//     // 遍历可能的搜索起点
//     // 有效范围条件，超过的可以剪枝优化掉
//     // 搜索起点的上界 + 接下来要选择的元素个数 - 1 = n
//     // start <= n - (k - temp.length) + 1
//     // 换个说法更容易理解，还要的数量不能超过剩下的范围
//     // k - temp.length = n - start + 1
//     for (let i = start; i <= n - (k - temp.length) + 1; i += 1) {
//       // 从区间中选取一个值，存入临时数组
//       temp.push(i);
//       // 继续下一个的递归，注意不要和当前i重复，i + 1
//       backtrack(i + 1, n, k, temp, ans);
//       // 回溯
//       temp.pop();
//     }
//   }
// }

function combine(n, k) {
  // 1. 递归，根据搜索起点，递归树，性能比2好
  // 时间复杂度O((n k) * k): 组合枚举的时间复杂度为O((n k))，每次记录答案的时间复杂度为O(k)
  // 空间复杂度O(k): 递归调用栈的空间复杂度为O(k)，临时数组的空间复杂度为O(k)
  const ans = [];
  const temp = [];
  if (k <= 0 || n < k) return ans;
  backtrack(1, n, k, temp, ans);
  return ans;
  function backtrack(start, n, k, temp, ans) {
    if (k === 0) {
      ans.push([...temp]);
      return;
    }
    for (let i = start; i <= n - k + 1; i += 1) {
      // 从区间中选取一个值，存入临时数组
      temp.push(i);
      // 继续下一个的递归，注意不要和当前i重复，i + 1
      backtrack(i + 1, n, k - 1, temp, ans);
      // 回溯
      temp.pop();
    }
  }
}
// @lc code=end

const res1 = combine(4, 2);
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
const res2 = combine(5, 3);
// [
//   [1, 2, 3],
//   [1, 2, 4],
//   [1, 2, 5],
//   [1, 3, 4],
//   [1, 3, 5],
//   [1, 4, 5],
//   [2, 3, 4],
//   [2, 3, 5],
//   [2, 4, 5],
//   [3, 4, 5]
// ]

// 1. 递归，范围
// 2. 递归，选与不选
