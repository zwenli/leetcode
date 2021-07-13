/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */

function longestCommonPrefix(strs) {
  // 3. 分治
  // time complexity O(mn): m表示字符串的平均长度，n为字符串的数量，通过主定理推算出来的
  //  T(n) = 2 * T(n/2) + O(m), 其中T(n) = O(mn)
  // space complexity O(mlogn): 递归层数取决与n，O(logn)，每层需要O(m)的空间返回存储结果
  if (!strs || !strs.length) return '';
  const n = strs.length;
  return recurse(strs, 0, n - 1);
  
  function recurse(strs, start, end) {
    if (start === end) return strs[start];
    const mid = (start + end) >> 1;
    const lcpLeft = recurse(strs, start, mid);
    const lcpRight = recurse(strs, mid + 1, end);
    return commonPrefix(lcpLeft, lcpRight);
  }
  function commonPrefix(lcpLeft, lcpRight) {
    const length = Math.min(lcpLeft.length, lcpRight.length);
    let i = 0;
    while (i < length && lcpLeft[i] === lcpRight[i]) i += 1;
    return lcpLeft.substr(0, i);
  }
}

// function longestCommonPrefix(strs) {
//   // 2. 纵向扫描
//   // time complexity O(mn): m表示字符串的平均长度，n为字符串的数量
//   // space complexity O(1)
//   if (!strs || !strs.length) return '';
//   const count = strs.length;
//   const { length } = strs[0];

//   for (let i = 0; i < length; i += 1) {
//     const char = strs[0].charAt(i);
//     for (let j = 1; j < count; j += 1) {
//       if (i === strs[j].length || char !== strs[j][i]) {
//         return strs[0].substr(0, i);
//       }
//     }
//   }
//   // 情况为：只有一个字符串；所有字符串匹配；第一个字符串为空串等。
//   return strs[0];
// }

// function longestCommonPrefix(strs) {
//   // 1. 横向扫描
//   // time complexity O(mn): m表示字符串的平均长度，n为字符串的数量
//   // space complexity O(1)
//   if (!strs || !strs.length) return '';
//   const n = strs.length;
//   let ans = strs[0];
//   for (let i = 1; i < n; i += 1) {
//     let j = 0;
//     while (j < ans.length && j < strs[i].length && ans[j] === strs[i][j]) {
//       j += 1;
//     }
//     ans = ans.substr(0, j);
//     if (ans === '') return ans;
//   }
//   return ans;
// }
// @lc code=end

const res1 = longestCommonPrefix(['flower', 'flow', 'flight']); // fl
const res2 = longestCommonPrefix(['dog', 'racecar', 'car']); // ''
const res3 = longestCommonPrefix(['', '']); // ''
console.log(res1);
console.log(res2);

/**
https://leetcode-cn.com/problems/longest-common-prefix/solution/zui-chang-gong-gong-qian-zhui-by-leetcode-solution/
1. 横向扫描，依次遍历字符串数组中的每个字符串，
对于每个遍历到的字符串，更新最长公共前缀，
当遍历完所有的字符串以后，即可得到字符串数组中的最长公共前缀。
2. 纵向扫描
3. 分治，和1思路一样，只不过采用分治
4. 二分查找
 */