/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permuteUnique(nums) {
  // 2. 回溯+剪枝
  // 和46题类似，用回溯的方法计算全排列组合
  // 但是要满足’全排列不重复‘，需要而外条件处理
  // 设定规则在填入第i个数的时候'重复数字只会填入一个即可'，
  // 本题解中，我们选择对原数组排序，保证相同的数字都相邻，
  // 然后每次填入的数一定是这个数所在重复数集合中「从左往右第一个未被填过的数字」
  // 时间复杂度O(n * n!): 全排列的时间复杂度为O(n!)也就是backtrack调用的次数，使用O(n)的时间将当前答案复制到答案数组中
  // 空间复杂度O(n): 标记数组的空间复杂度为O(n), 递归调用栈的空间复杂度为O(n), 总就是O(2n)=O(n)
  if (!nums || !nums.length) return [];
  const ans = [];
  const vis = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b); // 一定要保证有序
  backtrack(0, []);
  return ans;
  function backtrack(depth, temp) {
    if (depth === nums.length) {
      ans.push([...temp]);
      return;
    }
    for (let i = 0; i < nums.length; i += 1) {
      if (vis[i]) {
        // 已访问过，进行剪枝
        continue;
      }
      if (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1]) {
        // 大白话点，限制重复的方法，要么都填入，要么都不填入
        // 即在当前数字和左边数字相等，且左边数字未访问过，那就剪枝处理，都不填入。
        //
        // i > 0 && nums[i] === nums[i - 1] && vis[i - 1]
        // 其实也可以起到去重的效果，但是效率没比上层剪枝高，上层剪枝节点从上就断了
        //
        // 其实核心就是多个重复的答案只要一个就好了，这里用到策略，从左到右排序，
        // 只允许重复数字中最左边的可以先填，后续的也就可以填写
        // 反过来当最左边没填写过，那么后续的也不可以填写，这样就可以筛选掉重复解了
        continue;
      }
      temp.push(nums[i]);
      vis[i] = true;
      backtrack(depth + 1, temp);
      temp.pop();
      vis[i] = false;
    }
  }
}
// @lc code=end

const res1 = permuteUnique([1, 1, 2]);
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
const res2 = permuteUnique([1, 2, 3]);
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 1. 回溯，最后对结果去重复，暴力解法
// 2. 回溯 + 剪枝
