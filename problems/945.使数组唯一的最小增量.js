/*
 * @lc app=leetcode.cn id=945 lang=javascript
 *
 * [945] 使数组唯一的最小增量
 * 相似题目：1827.
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

var minIncrementForUnique = function (nums) {
  // 排序
  nums.sort((a, b) => a - b)
  let ans = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      // 当前数字小于等于前一个数字
      const prev = nums[i]
      nums[i] = nums[i - 1] + 1
      ans += nums[i] - prev
    }
  }
  return ans
}
// var minIncrementForUnique = function (nums) {
//   // https://leetcode.cn/problems/minimum-increment-to-make-array-unique/solution/shi-shu-zu-wei-yi-de-zui-xiao-zeng-liang-by-leet-2/
//   /**
//    * 一个前置知识：
//    * 当我们找到一个没有出现过的数的时候，将之前某个重复出现的数增加成这个没有出现过的数。
//    * 注意，这里 「之前某个重复出现的数」 是可以任意选择的，它并不会影响最终的答案，
//    * 因为将 P 增加到 X 并且将 Q 增加到 Y，与将 P 增加到 Y 并且将 Q 增加到 X
//    * 都需要进行 (X + Y) - (P + Q) 次操作。
//    * 例如当数组 nums 为 [1, 1, 1, 1, 3, 5] 时，
//    * 我们发现有 3 个重复的 1，且没有出现过 2，4 和 6，
//    * 因此一共需要进行 (2 + 4 + 6) - (1 + 1 + 1) = 9 次操作。
//    */
//   nums.sort((a, b) => a - b)
//   let ans = 0
//   let taken = 0
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] === nums[i - 1]) {
//       // 先减去当前重复的数字
//       ans -= nums[i]
//       // 记录重复的数的数量
//       taken += 1
//     } else {
//       // nums[i] < nums[i - 1] 的情况
//       // 则区间[nums[i-1] + 1, nums[i] - 1]的数字是没有重复出现的
//       // 可以将之前重复的数变为这个区间范围内的数。
//       // 最多可改变的数量为taken, nums[i] - nums[i - 1] - 1两者的最小值。
//       const give = Math.min(taken, nums[i] - nums[i - 1] - 1)
//       // 加上要使用的没有重复的数字
//       ans += nums[i - 1] * give + ((give + 1) * give) / 2
//       // 减去对应的重复次数
//       taken -= give
//     }
//   }
//   // 还有重复数字没有处理的情况
//   if (taken > 0) {
//     // 直接设置为最大值nums[nums.length - 1]往后的数字
//     ans += nums[nums.length - 1] * taken + ((taken + 1) * taken) / 2
//   }
//   return ans
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = minIncrementForUnique([1, 2, 2])
assert.equal(res1, 1)

const res2 = minIncrementForUnique([3, 2, 1, 2, 1, 7])
assert.equal(res2, 6)

/**
[1,2,3,4,5,7]
1
1
2
2

 */
