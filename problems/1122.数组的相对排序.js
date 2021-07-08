/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=1122 lang=javascript
 *
 * [1122] 数组的相对排序
 */

// @lc code=start
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */

// function relativeSortArray(arr1, arr2) {
//   // 计数排序
//   // time complexity O(m+n+max): arr1的数组长度m，遍历了两次，
//   //   arr2的长度为n，遍历一次，frequency的长度为max，遍历一次
//   // space complexity O(max): frequency数组的大小为max
//   const ans = [];
//   const max = Math.max(...arr1);
//   const frequency = new Array(max + 1).fill(0);
//   // 记录arr1中每个元素出现的次数
//   for (const x of arr1) {
//     frequency[x] += 1;
//   }
//   // 按照arr2的顺序，将元素放入数组，同时要清空对应次数
//   for (const x of arr2) {
//     for (let i = 0; i < frequency[x]; i += 1) {
//       ans.push(x);
//     }
//     frequency[x] = 0;
//   }
//   // 未出现过的元素需要按照升序放在末尾
//   // 最后还有剩下arr2中未出现的元素，遍历frequency，
//   // 遇到frequency[x]不为0，将x放入数组，
//   for (let x = 1; x <= max; x += 1) {
//     for (let i = 0; i < frequency[x]; i += 1) {
//       ans.push(x);
//     }
//   }
//   return ans;
// }

// function relativeSortArray(arr1, arr2) {
//   // 自定义排序
//   // time complexity O(mlogm + n): arr1的长度为m，arr1的排序复杂度O(mlogm)，
//   //   arr2的长度为n，遍历一次arr2
//   // space complexity O(logm + n): 排序需要的栈空间为O(logm), rank的空间为O(n)
//   const rank = {};
//   for (let i = 0; i < arr2.length; i += 1) {
//     rank[arr2[i]] = i;
//   }
//   return arr1.sort((x, y) => {
//     if (rank[x] != null && rank[y] != null) {
//       return rank[x] - rank[y];
//     }
//     if (rank[x] == null && rank[y] == null) {
//       return x - y;
//     }
//     return rank[x] != null ? -1 : 1;
//   });
// }
// @lc code=end

const res1 = relativeSortArray(
  [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
  [2, 1, 4, 3, 9, 6],
);
// [2,2,2,1,4,3,3,9,6,7,19]

/**

1. 排序，定义compare函数的逻辑
   用哈希表rank存arr2中val -> index 的映射
   在比较函数中，对于元素x，y有：
    1. 如果rank[x]和rank[y]都存在，则比较rank[x]和rank[y]
    2. 如果rank[x]和rank[y]都不存在，则比较x和y
    3. 以上两种都不满足，则出现在哈希表中的元素较小
2. 计数排序
用frequency数组记录arr1的数组频次，然后遍历arr2数组，
将频次个对应数推进ans，清空频次。最后在遍历一边frequency
将剩余的数字用完

 */
