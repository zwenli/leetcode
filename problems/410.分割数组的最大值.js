/* eslint-disable no-bitwise */
/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=410 lang=javascript
 *
 * [410] 分割数组的最大值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */

function splitArray(nums, m) {
  // 二分查找+贪心
  // 本题中，我们注意到：当我们选定一个值x，我们可以线性地验证是否存在一种分割方案，
  // 满足其最大分割子数组和不超过x。策略如下：
  //   贪心地模拟分割的过程，从前到后遍历数组，用sum表示当前分割子数组的和，
  //   cnt表示已经分割出的子数组的数量（包括当前子数组），
  //   那么每当 sum 加上当前值超过了 x，我们就把当前取的值作为新的一段分割子数组的开头，
  //   并将 cnt 加 1。遍历结束后验证是否 cnt 不超过 m。
  // 二分查找，二分查找的上界为数组的最大值，下界为数组中所有元素的和。
  // 可以通过二分查找，可以得到最小的最大分割和。
  // 注意事项：如果某个 数组各自和的最大值 恰恰好使得分割数为 m ，
  // 此时不能放弃搜索，因为我们要使得这个最大值 最小化，
  // 此时还应该继续尝试缩小这个 数组各自和的最大值 ，
  // 使得分割数超过 m ，超过 m 的最后一个使得分割数为 m 的 数组各自和的最大值
  // 就是我们要找的 最小值。
  // time complexity O(n * log(sum - max))
  // space complexity O(1)
  let sum = 0;
  let max = 0;
  for (const num of nums) {
    sum += num;
    max = Math.max(max, num);
  }
  let left = max;
  let right = sum;
  while (left <= right) {
    const mid = (left + right) >> 1;
    const splits = getSplits(nums, mid);
    if (splits > m) {
      // 分割太多，说明「子数组各自的和的最大值」太小，
      // 此时需要将「子数组各自的和的最大值」调大
      left = mid + 1;
    } else {
      // 其余情况，可以继续调小「子数组各自的和的最大值」
      right = mid - 1;
    }
  }
  return left;

  // 获取满足不超过「子数组各自的和的最大值」的分割数
  function getSplits(nums, max) {
    let cnt = 1; // 最少分割一个
    let sum = 0;
    for (const num of nums) {
      if (sum + num > max) {
        cnt += 1;
        sum = num;
      } else {
        sum += num;
      }
    }
    return cnt;
  }
}

// function splitArray(nums, m) {
//   // dp[i,j], 表示前i个数字，分割为j段得到的最大连续子数组和的最小值。
//   // 转移方程如下：
//   // dp[i,j] =  min(max(dp[k][j-1], sub[k+1,i])), k = [0, i-1]
//   // sub(i,j) 表示数组中下标区间(i,j)内数字的和
//   // dp[0,0] = 0;
//   // 合法状态必须 i>=j，因此可以全部状态默认设置为一个很大的值，max时将会等到一个很大的值
//   // 就不会对外层的min产生任何影响
//   const n = nums.length;
//   const dp = new Array(n + 1).fill(0).map(
//     () => new Array(m + 1).fill(Infinity),
//   );
//   const sub = new Array(n + 1).fill(0);
//   for (let i = 1; i <= n; i += 1) {
//     sub[i] = sub[i - 1] + nums[i - 1];
//   }
//   // base case
//   dp[0][0] = 0;
//   for (let i = 1; i <= n; i += 1) {
//     for (let j = 1; j <= Math.min(i, m); j += 1) {
//       for (let k = 0; k < i; k += 1) {
//         dp[i][j] = Math.min(
//           dp[i][j],
//           Math.max(dp[k][j - 1], sub[i] - sub[k]),
//         );
//       }
//     }
//   }
//   return dp[n][m];
// }
// @lc code=end

const res1 = splitArray([7, 2, 5, 10, 8], 2);
// 18
const res2 = splitArray([1, 2, 3, 4, 5], 2);
// 9
const res3 = splitArray([1, 4, 4], 3);
// 4

// TODO：二分查找
