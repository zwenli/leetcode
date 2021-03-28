/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  // ref: https://leetcode-cn.com/problems/permutations/solution/quan-pai-lie-by-leetcode-solution-2/
  // 2.回溯，这个问题可以看作有n个排列成一行的空格，
  // 我们需要从左往右依此填入题目给定的n个数，每个数只能使用一次
  // 那么很直接的可以想到一种穷举的算法，即从左往右每一个位置都依此尝试填入一个数，看能不能填完这n个空格，在程序中我们可以用「回溯法」来模拟这个过程。
  // 定义函数backtrack(first, output)
  //  first从左到右填到第first，[0, first - 1]是已填写的集合，[first, n - 1] 是待填写的集合
  //  当 first === n,说明已经填完了n个位置
  //  当 first < n是，考虑第first个位置需要填写哪个值，设i为[first, n - 1]的值，
  //     first 和 i交换，表示将第i的数字填入第first的位置，继续递归填写第first + 1的位置
  //     递归完成后，交换回来
  // https://baike.baidu.com/item/%E6%8E%92%E5%88%97/7804523
  // 时间复杂度O(N*N!): 全排列的时间复杂度为O(n!)，需要O(n)的时间将当前答案复制到答案数组中，相乘得时间复杂度为O(n * n!)
  // 空间复杂度O(n): 递归调用栈的大小取决与数组的长度n
  const ans = [];
  if (!nums.length || !nums.length) return ans;
  const output = [...nums];
  const n = nums.length;
  backtrack(n, output, ans, 0);
  return ans;
  function backtrack(n, output, ans, first) {
    // first等于n说明已经填完了n个位置，找到一个可行的解，递归结束
    if (first === n) {
      ans.push([...output]);
      return;
    }

    for (let i = first; i < n; i += 1) {
      // 将i填入第first的位置
      swap(output, first, i);
      // 继续递归填写下一个数
      backtrack(n, output, ans, first + 1);
      // 还原替换
      swap(output, first, i);
    }
  }
  function swap(list, i, j) {
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
}

// function permute(nums) {
//   // 对1的优化
//   // 时间复杂度O(n * n * n!): 全排列的时间复杂度O(!n)，需要O(n)的时间将当前答案复制到答案数组中，Array.prototype.include的时间复杂度为O(n)
//   // 空间复杂度O(n): 递归调用所需的空间最大为数组的长度n。
//   const ans = [];
//   const temp = [];
//   if (!nums.length || !nums.length) return ans;
//   const n = nums.length;
//   const used = new Array(n).fill(false);
//   dfs(nums, 0, n, temp, ans);
//   return ans;
//   function dfs(nums, depth, n, temp, ans) {
//     if (depth === n) {
//       ans.push([...temp]);
//       return;
//     }
//     for (let i = 0; i < n; i += 1) {
//       if (!used[i]) {
//         temp.push(nums[i]);
//         used[i] = true;
//         dfs(nums, depth + 1, n, temp, ans);
//         temp.pop();
//         used[i] = false;
//       }
//     }
//   }
// }
// function permute(nums) {
//   // 1.回溯，每次入队一个数字之前判断是否填写
//   // 时间复杂度O(n * n * n!): 全排列的时间复杂度O(!n)，需要O(n)的时间将当前答案复制到答案数组中，Array.prototype.include的时间复杂度为O(n)
//   // 空间复杂度O(n): 递归调用所需的空间最大为数组的长度n。
//   const ans = [];
//   const temp = [];
//   if (!nums.length || !nums.length) return ans;
//   dfs(nums, temp, ans);
//   return ans;
//   function dfs(nums, temp, ans) {
//     if (temp.length === nums.length) {
//       ans.push([...temp]);
//       return;
//     }
//     for (const num of nums) {
//       // 数字存在临时数组中，则不能在推进，防止重复
//       // TODO: 优化，用used = new Array(length).fill 记录每次已使用的数字位置
//       if (!temp.includes(num)) {
//         temp.push(num);
//         dfs(nums, temp, ans);
//         temp.pop();
//       }
//     }
//   }
// }
// @lc code=end

const res1 = permute([1, 2, 3]);
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]
const res2 = permute([1]);
