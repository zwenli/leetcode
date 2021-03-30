/* eslint-disable no-bitwise */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

function subsets(nums) {
  /*
    迭代，
    对集合[4,5,6]，子集如下
    子集 => 二进制
    [] => 0b000, 0
    [6] => 0b001, 1
    [5] => 0b010, 2
    [5,6] => 0b011, 3
    [4] => 0b100, 4
    [4,6] => 0b101, 5
    [4,5,6] => 0b111, 6
    0对应不在子集中，1对应在子集中，枚举每个掩码mask，构造对应的子集
    时间复杂度O(n * 2^n): 一共有2^n个状态，每种状态需要O(n)的时间构造子集
    空间复杂度O(n): 临时数组的空间复杂度为O(n)
   */
  if (!nums || !nums.length) return [];
  const ans = [];
  const n = nums.length;
  for (let mask = 0; mask < (1 << n); mask += 1) {
    const temp = [];
    for (let i = 0; i < n; i += 1) {
      if (mask & (1 << i)) {
        temp.push(nums[i]);
      }
    }
    ans.push(temp);
  }
  return ans;
}
// function subsets(nums) {
//   // 迭代，每次结果和加上当前数，和原结果集和一起
//   const ans = [];
//   if (!nums || !nums.length) return ans;
//   // 初始化第一个子集
//   ans.push([]);
//   for (const num of nums) {
//     // 遍历数组数字，
//     // 对当前结果集依次加上该数字，接在后面
//     const n = ans.length;
//     for (let i = 0; i < n; i += 1) {
//       ans.push([...ans[i], num]);
//     }
//   }
//   return ans;
// }
// function subsets(nums) {
//   // 回溯，pick and no pick
//   // 时间复杂度O(n * 2^n): 一共有2^n个状态，每种状态需要O(n)的时间构造子集
//   // 空间复杂度O(n): 递归的空间复杂度为O(n), 临时数组的空间复杂度为O(n)
//   const ans = [];
//   if (!nums || !nums.length) return ans;
//   dfs(0, nums.length, []);
//   return ans;

//   function dfs(index, n, temp) {
//     // recursion terminator
//     if (index === n) {
//       ans.push([...temp]);
//       return;
//     }
//     // no pick
//     dfs(index + 1, n, temp);
//     // pick
//     temp.push(nums[index]);
//     dfs(index + 1, n, temp);
//     // reverse level states
//     temp.pop();
//   }
// }
// @lc code=end

const res1 = subsets([1, 2, 3]);
// [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
