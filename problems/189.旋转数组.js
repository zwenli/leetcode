/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable operator-assignment */
/* eslint-disable no-param-reassign */
/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function rotate(nums, k) {
  // 3. 环转替换，证明过程不是很懂，知道怎么处理先吧
  // 设start = 0 从0开始， 存在移动公式如下
  // let current = start;
  // nums[current] 移动到 nums[(current + k) % length];
  // 直到 current 等于 start 停止移动
  // start + 1 ，继续下一位的移动
  // 最终只移动n次，用count记录位移数量，达到数量即可结束循环
  // 当n和k的最大公约数是1时，只需要一次循环就够了
  // 当n和k的最大公约数m大于1时，一次遍历是无法完成所有元素归位的，需要循环m次
  // 时间复杂度O(n): 每个元素只遍历一次
  // 空间复杂度O(1):
  if (!nums || !nums.length) return nums;
  const { length } = nums;
  k = k % length;
  let count = 0;
  for (let start = 0; count < length; start += 1) {
    let current = start;
    let prev = nums[current];
    do {
      const next = (current + k) % length;
      const temp = nums[next];
      nums[next] = prev;
      prev = temp;
      current = next;
      count += 1;
    } while (current !== start);
  }
  return nums;
}
// function rotate(nums, k) {
//   // 4. 使用反转
//   //  a. 反转所有数字
//   //  b. 反转[0, k - 1]
//   //  c. 反转[k, n - 1]
//   // 时间复杂度O(n): n个元素反转3次
//   // 空间复杂度O(1):
//   if (!nums || !nums.length) return nums;
//   const { length } = nums;
//   k %= length;
//   reverse(nums, 0, length - 1);
//   reverse(nums, 0, k - 1);
//   reverse(nums, k, length - 1);
//   return nums;
//   function reverse(nums, start, end) {
//     while (start < end) {
//       const temp = nums[start];
//       nums[start] = nums[end];
//       nums[end] = temp;
//       start += 1;
//       end -= 1;
//     }
//   }
// }
// @lc code=end

// function rotate(nums, k) {
//   // 2. 新数组， arr[(i + k) % length] = nums[i]
//   // 时间复杂度O(n):
//   // 空间复杂度O(n):
//   if (!nums || !nums.length) return nums;
//   const { length } = nums;
//   const arr = new Array(length);
//   for (let i = 0; i < length; i += 1) {
//     arr[(i + k) % length] = nums[i];
//   }
//   for (let i = 0; i < length; i += 1) {
//     nums[i] = arr[i];
//   }
//   return nums;
// }

// function rotate (nums, k) {
//   // 暴力
//   if (!nums || !nums.length) return nums
//   const length = nums.length;
//   for (let i = 0; i < k; i += 1) {
//     let prev = nums[length - 1];
//     for (let j = 0; j < length; j += 1) {
//       let temp = nums[j];
//       nums[j] = prev;
//       prev = temp;
//     }
//   }
//   return nums;
// }

const res2 = rotate([1, 2, 3, 4, 5, 6], 2); // 5,6,1,2,3,4
const res1 = rotate([1, 2, 3, 4, 5, 6, 7], 3); // 5,6,7,1,2,3,4
