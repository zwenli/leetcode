/*
 * @lc app=leetcode.cn id=724 lang=javascript
 *
 * [724] 寻找数组的中心索引
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
function pivotIndex(nums) {
  // 前缀和
  // 如果i为中心索引，则 leftSum = sum - nums[i] - leftSum
  if (nums.length < 3) return -1;
  const { length } = nums;
  const sum = nums.reduce((tol, cur) => tol + cur, 0);
  let leftSum = 0;
  for (let i = 0; i < length; i += 1) {
    if (leftSum === sum - nums[i] - leftSum) {
      return i;
    }
    leftSum += nums[i];
  }
  return -1;
}
// @lc code=end
// 暴力方法 左边 = 右边
// function pivotIndex(nums) {
//   if (nums.length < 3) return -1;
//   const { length } = nums;
//   let pIndex = 0;
//   while (pIndex <= length - 1) {
//     let left = 0;
//     let right = 0;
//     for (let i = 0; i < pIndex; i += 1) {
//       left += nums[i];
//     }
//     for (let j = length - 1; j > pIndex; j -= 1) {
//       right += nums[j];
//     }
//     if (left === right) {
//       return pIndex;
//     }
//     pIndex += 1;
//   }
//   return -1;
// }
const res6 = pivotIndex([-1, -1, 0, 1, 1, 0]);
const res5 = pivotIndex([-1, -1, -1, 0, 1, 1]);
const res4 = pivotIndex([1, 7, 3, 6, 5, 6]);
const res1 = pivotIndex([1, 7, 3, 6, 5, 6]);
const res2 = pivotIndex([1, 2, 3]);
const res3 = pivotIndex([-1, -1, -1, -1, -1, 0]);
console.log(res6); // 5
console.log(res5); // 0
console.log(res4); // 3
console.log(res1); // 3
console.log(res2); // -1
console.log(res3); // 2
