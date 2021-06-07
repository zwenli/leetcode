/* eslint-disable no-bitwise */
/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function countSubstrings(s) {
  // 中心拓展法，
  // 中心的定义，
  // 中心点即 left 指针和 right 指针初始化指向的地方，可能是一个也可能是两个
  // 中心点数量的计算 len = s.length * 2 - 1
  // 中心点往左右两边扩散，中心点的形式有 'a', 'ab'
  // time complexity O(n^2)
  // space complexity O(1)
  const centerLength = s.length * 2 - 1;
  let ans = 0;
  for (let center = 0; center < centerLength; center += 1) {
    // left和中心点是有2倍的关系
    // 中心点如 ‘a’的，left = right, 此时center为偶数
    // 中心点如 'ab'的，right = left + 1, 此时center为奇数
    let left = center >> 1;
    let right = left + (center % 2);
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      ans += 1;
      left -= 1;
      right += 1;
    }
  }
  return ans;
}

// function countSubstrings(s) {
//   // 动态规划, 空间优化
//   // dp(i,j) 表示字符串在区间[i,j]的子串是否为回文串
//   // 是否为回文串有三种情况，a, aa, a...a（中间也是回文串）
//   // 前两种情况 s[i] === s[j] && j - i <= 1 < 2
//   // 第三种情况 s[i] === s[j] && dp[i+1][j-1] && j - i >= 2
//   // time complexity O(n^2)
//   // space complexity O(n^2)
//   const dp = new Array(s.length).fill(false);
//   let ans = 0;
//   // 从整体上看，二维数组的遍历顺序是从左往右，从上往下
//   // 且实际有用的区间是右上角的区间范围（不懂就画出表格观察）
//   // 我们可以从j的维度（纵向）滚动数组
//   // 当前状态值依赖上一个的状态,dp[i,j] = dp[i+1,j-1]
//   // 优化成 dp[i] = dp[i+1]
//   for (let j = 0; j < s.length; j += 1) {
//     for (let i = 0; i <= j; i += 1) {
//       if (s[i] === s[j] && (j - i < 2 || dp[i + 1])) {
//         dp[i] = true;
//         ans += 1;
//       } else {
//         dp[i] = false;
//       }
//     }
//   }
//   return ans;
// }

// function countSubstrings(s) {
//   // 动态规划
//   // dp(i,j) 表示字符串在区间[i,j]的子串是否为回文串
//   // 是否为回文串有三种情况，a, aa, a...a（中间也是回文串）
//   // 前两种情况 s[i] === s[j] && j - i <= 1 < 2
//   // 第三种情况 s[i] === s[j] && dp[i+1][j-1] && j - i >= 2
//   // time complexity O(n^2)
//   // space complexity O(n^2)
//   const dp = new Array(s.length).fill(false).map(
//     () => new Array(s.length).fill(false),
//   );
//   let ans = 0;
//   // 遍历次序是，定右，左从0往右遍历
//   for (let j = 0; j < s.length; j += 1) {
//     for (let i = 0; i <= j; i += 1) {
//       if (s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1])) {
//         dp[i][j] = true;
//         ans += 1;
//       }
//     }
//   }
//   return ans;
// }
// @lc code=end

// https://leetcode-cn.com/problems/palindromic-substrings/solution/liang-dao-hui-wen-zi-chuan-de-jie-fa-xiang-jie-zho/
// 动态规划
// 中心拓展法
// https://leetcode-cn.com/problems/palindromic-substrings/solution/shou-hua-tu-jie-dong-tai-gui-hua-si-lu-by-hyj8/
// 中心拓展一种更简单的展示
// f(left,right): 函数用来判断回文串的，然后只需要 f(i,i),f(i, i+1)即可
// https://leetcode.com/problems/palindromic-substrings/discuss/105689/Java-solution-8-lines-extendPalindrome

const res1 = countSubstrings('abc');
// 3
const res2 = countSubstrings('aaa');
// 6
const res3 = countSubstrings('aaaaa');
// 15
