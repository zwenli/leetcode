/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// function majorityElement(nums) {
//   // 分治
//   // 主定理https://baike.baidu.com/item/%E4%B8%BB%E5%AE%9A%E7%90%86/3463232?fr=aladdin
//   // 时间复杂度O(nlogn): 根据主定理公式算出的 T(n) = 2T(n/2) + 2n
//   //   n为问题规模，递归子问题的数量为2，每个子问题的规模为n/2，递归以外的工作countInRange，执行两次，2n
//   // 空间复杂度O(logn): 每次递归分一半，
//   if (!nums || !nums.length) return null;
//   return recursion(nums, 0, nums.length - 1);

//   function countInRange(nums, num, lo, hi) {
//     let count = 0;
//     for (let i = lo; i <= hi; i += 1) {
//       if (nums[i] === num) count += 1;
//     }
//     return count;
//   }
//   function recursion(nums, lo, hi) {
//     if (lo === hi) {
//       return nums[lo];
//     }
//     const mid = Math.floor((hi - lo) / 2) + lo;
//     const left = recursion(nums, lo, mid);
//     const right = recursion(nums, mid + 1, hi);

//     if (left === right) return left;
//     const leftCount = countInRange(nums, left, lo, hi);
//     const rightCount = countInRange(nums, right, lo, hi);
//     return leftCount > rightCount ? left : right;
//   }
// }

// function majorityElement(nums) {
//   // 投票算法
//   // 时间复杂度O(n):
//   // 空间复杂度O(1):
//   if (!nums || !nums.length) return null;
//   let candidate = null;
//   let count = 0;
//   for (let i = 0; i < nums.length; i += 1) {
//     const num = nums[i];
//     if (count === 0) {
//       candidate = num;
//     }
//     if (candidate === num) {
//       count += 1;
//     } else {
//       count -= 1;
//     }
//   }
//   return candidate;
// }

// function majorityElement(nums) {
//   // 位运算, JavaScript中位运算会将操作数当成是32位的二进制数，但是返回的结果是标准的JavaScript数值
//   // 时间复杂度O(n): O(32 * n)
//   // 空间复杂度O(1):
//   let majority = 0;
//   const n = nums.length;
//   // 32位二进制，遍历每一位
//   for (let i = 0, mask = 1; i < 32; i += 1, mask <<= 1) {
//     // bitCounts表示所有数字在i位为1的个数。
//     let bitCounts = 0;
//     for (let j = 0; j < n; j += 1) {
//       // 如果nums[j]的第i位是1，累加
//       if (nums[j] & mask) {
//         bitCounts += 1;
//       }
//       // 当bitCounts 数量大于n/2，那么这个众数在这个位置的肯定是1，
//       // 通过或运算将对应位置设置为1，并且无需再遍历了
//       if (bitCounts > n / 2) {
//         majority |= mask;
//         break;
//       }
//     }
//   }
//   return majority;

//   // 更加简洁的
//   // for (let i = 0; i < 32; i += 1) {
//   //   let ones = 0;
//   //   for (let j = 0; j < n; j += 1) {
//   //     ones += (nums[j] >> i) & 1; // 统计1出现的次数
//   //   }
//   //   majority += (ones > n / 2) << i; // true位运算为1，false为0
//   // }
//   // return majority;
// }

// function majorityElement(nums) {
//   // 排序
//   // 时间复杂度O(nlogn): 排序方法的时间复杂度为O(nlogn)
//   // 时间复杂度O(logn): 排序方法的空间复杂度为O(logn)，需要使用O(logn)的栈空间
//   if (!nums || !nums.length) return null;
//   nums.sort();
//   return nums[nums.length >> 1];
// }

function majorityElement(nums) {
  // 随机
  // https://leetcode-cn.com/problems/majority-element/solution/duo-shu-yuan-su-by-leetcode-solution/
  // 时间复杂度O(n): 最坏的情况是O(∞)，期望的时间复杂度为O(n), 证明过程看链接
  // 空间复杂度O(1):
  if (!nums || !nums.length) return null;
  const n = nums.length;
  while (true) {
    const candidate = nums[randomInt(0, n)];
    if (countOccurences(nums, candidate) > n / 2) {
      return candidate;
    }
  }
  // 随机函数
  function randomInt(min, max) {
    // return [min, max)
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function countOccurences(nums, num) {
    const n = nums.length;
    let count = 0;
    for (let i = 0; i < n; i += 1) {
      if (nums[i] === num) {
        count += 1;
      }
    }
    return count;
  }
}

// function majorityElement(nums) {
//   // 哈希2，过程中累加，判断无需全部遍历，哈希1的优化
//   // 时间复杂度O(n): n为数组长度，每个元素遍历一次
//   // 空间复杂度O(n): map的占用空间为n- n/2, 也就是O(n)
//   if (!nums || !nums.length) return null;
//   const target = nums.length / 2;
//   const map = new Map();
//   for (let i = 0; i < nums.length; i += 1) {
//     if (!map.get(nums[i])) {
//       map.set(nums[i], 0);
//     }
//     const count = map.get(nums[i]) + 1;
//     map.set(nums[i], count);
//     if (count >= target) {
//       return nums[i];
//     }
//   }
//   return null;
// }
// @lc code=end

const res1 = majorityElement([3, 2, 3]); // 3
const res2 = majorityElement([2, 2, 1, 1, 1, 2, 2]); // 2

// PS: 注意众数(majority)的定义是 `在数组中出现次数大于n/2的元素`
// 如果只是求出现次数最多的元素，但该元素不满足>n/2的话，排序，投票的方法是不适用的

// 方法
// 暴力循环，两重循环，每次确定一个数字，遍历其在整个数组中重现的次数，满足>n/2即可
// 哈希表1，构建map => (num, count), 遍历map，找出最大的次数，返回num
// 哈希表2，遍历过程中对map累加，直到遇到n/2返回
// 随机法，此方法总觉得怪怪的，还不如直接用哈希完事
//   众数由于在数组中占了一半，期望值是很高的
// 分治，
//   如果a是nums的众数，如果将nums分成两部分，那么a必定是至少一部分的众数
//   这样可以用分治解决该问题：将nums分成两部分，分别求出左部分的众数a1和右部分的众数a2
//   随后在a1，a2中选出正确的众数。
// 排序
//   如果将nums中的所有元素按单调递增/递减的顺序排序，那么n/2下标的元素必定是众数，
//   因为已经众数已经占了数组中的一般，排序之后，中间必定有众数的存在
// 位运算
//   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E4%BD%8D%E8%BF%90%E7%AE%97%E7%AC%A6
//   JavaScript中位运算符会将操作数视为32位的二进制数，但是返回的结果是标准的JavaScript数值
//   分别统计所有数字在i位置，值为1的出现次数，如果大于 n/2，就将对应的答案置为1， majority |= mask
//   众数的性质决定了如果众数在那个位置，必定是大于n/2的
// Boyer-Moore 投票算法
//   思路： 如果我们把众数记为 +1，把其他数记为 -1，将它们全部加起来，显然和大于 0，从结果本身我们可以看出众数比其他数多。
//   算法： 维护一个候选众数candidate和它出现的次数count，初始分别为null， 0
//         遍历nums中的元素，对于当前元素x，在每次判断x之前，如果count为0，candidate设置为x，随后判断x
//            1. x 不等于 candidate, count - 1
//            2. x 等于 candidate, count + 1
//         遍历完成后，candidate就是整个数组的众数
//   为何这行得通呢？
// 投票法是遇到相同的则票数 + 1，遇到不同的则票数 - 1。
// 且“多数元素”的个数> ⌊ n/2 ⌋，其余元素的个数总和<= ⌊ n/2 ⌋。
// 因此“多数元素”的个数 - 其余元素的个数总和 的结果 肯定 >= 1。
// 这就相当于每个“多数元素”和其他元素 两两相互抵消，抵消到最后肯定还剩余至少1个“多数元素”。

// 无论数组是1 2 1 2 1，亦或是1 2 2 1 1，总能得到正确的候选人。

//   具体证明方法https://leetcode-cn.com/problems/majority-element/solution/duo-shu-yuan-su-by-leetcode-solution/
