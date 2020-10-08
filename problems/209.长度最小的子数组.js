/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start

function binarySearch(nums, target) {
  // 数组是递增的才能保证二分查找的正确性
  if (!nums || !nums.length) return -1;
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  let pivot;
  while (left < right) {
    // eslint-disable-next-line no-bitwise
    pivot = left + ((right - left) >> 1);
    const elem = nums[pivot];
    if (elem < target) {
      left = pivot + 1;
    } else {
      right = pivot;
    }
  }
  return (nums[left] >= target) ? left : -1;
}

/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(s, nums) {
  // 前缀和+二分查找
  // 时间复杂度O(nlogn)
  // 空间复杂度O(n)
  if (!nums || !nums.length) return 0;
  const n = nums.length;
  let ans = Infinity;
  const sums = Array(n + 1).fill(0);
  // 为了方便计算，令 size = n + 1
  // sums[0] = 0 意味着前 0 个元素的前缀和为 0
  // sums[1] = A[0] 前 1 个元素的前缀和为 A[0]
  // 以此类推
  for (let i = 1; i <= n; i += 1) {
    sums[i] = nums[i - 1] + sums[i - 1];
  }
  // 得到前缀和之后，对于每个开始下标 i，可通过二分查找得到大于或等于 i 的最小下标bound，
  // 使得 sums[bound] - sums[i] >= s, (等价于子串和（bound, i - 1）>= s)
  // 并更新子数组的最小长度（此时子数组的长度是 bound-(i−1) ）。
  for (let i = 1; i <= n; i += 1) {
    const target = sums[i - 1] + s;
    const bound = binarySearch(sums, target);
    if (bound > 0 && bound <= n) {
      ans = Math.min(ans, bound - (i - 1));
    }
  }
  return ans === Infinity ? 0 : ans;
}
// @lc code=end

// function minSubArrayLen(s, nums) {
//   // 双指针
//   // 时间复杂度O(n), 始末最多各遍历n次
//   // 空间复杂度O(1)
//   if (!nums || !nums.length) return 0;
//   const { length } = nums;
//   let res = Infinity;
//   let sum = 0;
//   let start = 0;
//   let end = 0;
//   while (end < length) {
//     // 每次移动坐标，更新下sum
//     sum += nums[end];
//     while (sum >= s) {
//       res = Math.min(res, end - start + 1);
//       sum -= nums[start];
//       start += 1;
//     }
//     end += 1;
//   }
//   return res === Infinity ? 0 : res;
// }

// function minSubArrayLen(s, nums) {
//   if (!nums || !nums.length) return 0;
//   let count = Infinity;
//   let i = 0;
//   let j = 0;
//   while (j < nums.length) {
//     let res = 0;
//     // TODO 只遍历一次将结果保存起来；
//     for (let temp = i; temp <= j; temp += 1) {
//       res += nums[temp];
//     }
//     if (res >= s) {
//       // console.log(nums.slice(i, j + 1));
//       count = Math.min(count, j - i + 1);
//       i += 1;
//     } else {
//       j += 1;
//     }
//   }
//   return count === Infinity ? 0 : count;
// }

const nums1 = [2, 3, 1, 2, 4, 3];
const res1 = minSubArrayLen(7, nums1); // 2, [4,3]
