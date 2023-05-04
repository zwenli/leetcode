/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=493 lang=javascript
 *
 * [493] 翻转对
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// function reversePairs(nums) {
//   // 离散化树状数组
//   // time complexity O(nlogn): n为数组的长度，排序的时间复杂度为O(nlogn)，树状数组操作的时间复杂度为O(logn)
//   // space complexity O(n): 树状数组需要O(n)的空间
//   const allNumbers = Array.from(
//     new Set([...nums, ...nums.map((x) => x * 2)].sort((a, b) => a - b))
//   )
//   // 离散化
//   // 数组中整数范围可能很大，且不连续。
//   // 利用哈希表将所有可能出现的整数，映射到连续的整数区间内
//   const values = new Map()
//   let idx = 0
//   allNumbers.forEach((num) => values.set(num, ++idx))

//   let ans = 0
//   const bit = new BIT(values.size)
//   for (const num of nums) {
//     // 对于 nums[i] 而言，要找到i为右端点的翻转对数量，
//     // 即要找到[2*nums[i]+1, maxValue]（maxValue为数组中最大元素的二倍）区间的整数数量，这个数值等于
//     // = [1, maxValue]区间的数量 - [1, 2*nums[i]]区间的数量
//     const left = values.get(num * 2) + 1
//     const right = values.size
//     ans += bit.range(left, right)
//     bit.add(values.get(num), 1)
//   }
//   return ans
// }
// class BIT {
//   constructor(size) {
//     this.size = size
//     this.tree = new Array(size + 1).fill(0)
//   }
//   lowbit(x) {
//     return x & -x
//   }
//   add(i, v) {
//     while (i <= this.size) {
//       this.tree[i] += v
//       i += this.lowbit(i)
//     }
//   }
//   query(i) {
//     let sum = 0
//     while (i > 0) {
//       sum += this.tree[i]
//       i -= this.lowbit(i)
//     }
//     return sum
//   }
//   range(l, r) {
//     return this.query(r) - this.query(l - 1)
//   }
// }

function reversePairs(nums) {
  const allNumbers = Array.from(
    new Set([...nums, ...nums.map((num) => num * 2)].sort((a, b) => a - b))
  )

  const values = new Map()
  let idx = 0
  allNumbers.forEach((num) => values.set(num, idx++))

  let ans = 0
  const st = new ST(values.size)
  for (const num of nums) {
    const l = values.get(num * 2) + 1
    const r = values.size - 1
    ans += st.query(l, r)
    st.add(values.get(num), 1)
  }
  return ans
}
class ST {
  constructor(n) {
    this.n = n
    this.tree = new Array(2 * n).fill(0)
  }
  add(i, v) {
    i += this.n
    while (i > 0) {
      this.tree[i] += v
      i >>= 1
    }
  }
  query(l, r) {
    l += this.n
    r += this.n
    let sum = 0
    while (l <= r) {
      if ((l & 1) === 1) {
        sum += this.tree[l]
        l += 1
      }
      if ((r & 1) === 0) {
        sum += this.tree[r]
        r -= 1
      }
      l >>= 1
      r >>= 1
    }
    return sum
  }
}

// function reversePairs(nums) {
//   // 归并排序
//   if (!nums || nums.length < 2) return 0;
//   return mergeSort(nums, 0, nums.length - 1);
// }

// function mergeSort(nums, left, right) {
//   if (left >= right) return 0;
//   const mid = left + ((right - left) >> 1);
//   let count = mergeSort(nums, left, mid)
//    + mergeSort(nums, mid + 1, right);
//   const cache = new Array(right - left + 1);
//   let i = left; // 翻转对下标
//   let c = 0; // cache下标
//   let k = left; // 左区间下标
//   for (let j = mid + 1; j <= right; j++, c++) {
//     while (i <= mid && nums[i] <= 2 * nums[j]) i++;
//     while (k <= mid && nums[k] < nums[j]) cache[c++] = nums[k++];
//     count += mid - i + 1;
//     cache[c] = nums[j];
//   }
//   while (k <= mid) cache[c++] = nums[k++];
//   for (let p = 0; p < cache.length; p++) {
//     nums[left + p] = cache[p];
//   }
//   return count;
// }

// function reversePairs(nums) {
//   // 归并排序
//   if (!nums || nums.length < 2) return 0;
//   return mergeSort(nums, 0, nums.length - 1);
// }

// function mergeSort(nums, left, right) {
//   if (left >= right) return 0;
//   const mid = left + ((right - left) >> 1);
//   let count = mergeSort(nums, left, mid)
//    + mergeSort(nums, mid + 1, right);
//   // todo：统计和合并可以同时进行
//   // 计算翻转对的数量
//   for (let i = left, j = mid + 1; j <= right; j++) {
//     // 左右两子数组是有序的，移动左区间的下标，直到满足重要翻转对的条件
//     while (i <= mid && nums[i] <= 2 * nums[j]) i++;
//     // 此时[i, mid]区间内的元素都对nums[j]形成重要翻转对，
//     // 故计算区间内的元素个数即可。
//     count += mid - i + 1;
//     // 之后j进1位重复步骤
//   }
//   // 合并两个有序数组
//   const cache = new Array(right - left + 1);
//   let m = left;
//   let c = 0;
//   for (let n = mid + 1; n <= right; n++, c++) {
//     while (m <= mid && nums[m] < nums[n]) {
//       cache[c++] = nums[m++];
//     }
//     cache[c] = nums[n];
//   }
//   while (m <= mid) {
//     cache[c++] = nums[m++];
//   }
//   for (let k = 0; k < cache.length; k += 1) {
//     nums[left + k] = cache[k];
//   }
//   return count;
// }

// function reversePairs(nums) {
//   // 暴力解法，会超时
//   // time complexity O(n^2): 两层循环
//   if (nums.length < 2) return 0;
//   let res = 0;
//   const n = nums.length;
//   for (let i = 0; i < n - 1; i += 1) {
//     for (let j = i + 1; j < n; j += 1) {
//       if (nums[i] > 2 * nums[j]) {
//         res += 1;
//       }
//     }
//   }
//   return res;
// }
// @lc code=end

const assert = require('node:assert').strict

const res1 = reversePairs([1, 3, 2, 3, 1])
assert.equal(res1, 2)
const res2 = reversePairs([2, 4, 3, 5, 1])
assert.equal(res2, 3)
const res3 = reversePairs([-5, -5])
assert.equal(res3, 1)

/**

相似题目 逆序对

1. 暴力解法，两层循环
2. 归并排序
3. 数状数组
 */
