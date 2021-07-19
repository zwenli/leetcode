/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start

/**
 * @param {*} s
 * @param {*} left
 * @param {*} right
 * @return {number}
 */

function longestPalindrome(s) {
  // 中心扩展
  // time complexity O(n^2)
  // space complexity O(1)
  if (!s || !s.length) return '';
  const n = s.length;
  let maxStart = 0;
  // let maxEnd = 0;
  let maxLen = 1;
  for (let i = 0; i < n; i += 1) {
    const len = Math.max(
      expandAroundCenter(s, i, i),
      expandAroundCenter(s, i, i + 1),
    )
    if (maxLen < len) {
      maxStart = i - ((len - 1) >> 1);
      // maxEnd = i + (len >> 1);
      maxLen = len;
    }
  }
  return s.substr(maxStart, maxLen);
  function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < n && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
}

// function longestPalindrome(s) {
//   // dp
//   // time complexity O(n^2)
//   // space complexity O(n^2)
//   if (!s || !s.length) return '';
//   const n = s.length;
//   const dp = new Array(n).fill(false).map(
//     () => new Array(n).fill(false)
//   );
//   let maxStart = 0;
//   let maxLen = 1;
//   // 向两边扩散
//   for (let i = n - 1; i >= 0; i--) {
//     for (let j = i; j < n; j++) {
//       if (s[i] === s[j] && (j - i + 1 <= 2 || dp[i + 1][j - 1])) {
//         dp[i][j] = true;
//         if (j - i + 1 > maxLen) {
//           maxLen = j - i + 1;
//           maxStart = i;
//         }
//       }
//     }
//   }
//   return s.substr(maxStart, maxLen);
// }

// @lc code=end

// function longestPalindrome(s) {
//   // 队列 + 备忘录，leetcode上会超时
//   const set = new Set();
//   const queue = [s];
//   let res = '';
//   while (queue.length) {
//     const str = queue.shift();
//     if (set.has(str)) continue;
//     if (isPalindrome(str)) {
//       res = str.length > res.length ? str : res;
//     }
//     set.add(str);
//     const { length } = str;
//     if (length) {
//       const left = str.substring(0, length - 1);
//       const right = str.substring(1);
//       const both = str.substring(1, length - 1);
//       if (!set.has(left)) {
//         queue.push(left);
//       }
//       if (!set.has(right)) {
//         queue.push(right);
//       }
//       if (!set.has(both)) {
//         queue.push(both);
//       }
//     }
//   }
//   return res;
//   // // 判断字符串是否为回文串
//   function isPalindrome(str) {
//     // 双指针
//     let left = 0;
//     let right = str.length - 1;
//     while (left < right) {
//       if (str.charAt(left) !== str.charAt(right)) {
//         return false;
//       }
//       left += 1;
//       right -= 1;
//     }
//     return true;
//   }
// }

const assert = require('assert').strict;
const res1 = longestPalindrome('babad');
assert.equal(['aba', 'bab'].includes(res1), true);
const res2 = longestPalindrome('cbbd');
assert.equal(res2, 'bb');
const res3 = longestPalindrome('abb'); // 'bb'
assert.equal(res3, 'bb');
const res4 = longestPalindrome('jrjnbctoqgzimtoklkxcknwmhiztomaofwwzjnhrijwkgmwwuazcowskjhitejnvtblqyepxispasrgvgzqlvrmvhxusiqqzzibcyhpnruhrgbzsmlsuacwptmzxuewnjzmwxbdzqyvsjzxiecsnkdibudtvthzlizralpaowsbakzconeuwwpsqynaxqmgngzpovauxsqgypinywwtmekzhhlzaeatbzryreuttgwfqmmpeywtvpssznkwhzuqewuqtfuflttjcxrhwexvtxjihunpywerkktbvlsyomkxuwrqqmbmzjbfytdddnkasmdyukawrzrnhdmaefzltddipcrhuchvdcoegamlfifzistnplqabtazunlelslicrkuuhosoyduhootlwsbtxautewkvnvlbtixkmxhngidxecehslqjpcdrtlqswmyghmwlttjecvbueswsixoxmymcepbmuwtzanmvujmalyghzkvtoxynyusbpzpolaplsgrunpfgdbbtvtkahqmmlbxzcfznvhxsiytlsxmmtqiudyjlnbkzvtbqdsknsrknsykqzucevgmmcoanilsyyklpbxqosoquolvytefhvozwtwcrmbnyijbammlzrgalrymyfpysbqpjwzirsfknnyseiujadovngogvptphuyzkrwgjqwdhtvgxnmxuheofplizpxijfytfabx'); //
assert.equal(res4, 'qosoq');

/**

1. 动态规划, dp[i,j]表示字符串s的第i个字符到第j个字符的子串是否为回文串，
dp[i,j] = dp[i+1, j-1] && s[i] === s[j]
只有第i+1到第j-1个字符的子串为回文串且第i个字符和第j个字符相等，dp[i,j]才会是回文串
边界情况,
dp[i, i] = true, 长度为1的子串显然是一个回文串
dp[i, i + 1] = s[i] === s[i + 1] 长度为2的子串，只要两个字符相同那么就是个回文串

2. 中心拓展
枚举回文中心，并尝试向两边拓展，直到无法拓展为止，
此时的回文串长度即为此回文中心下的最长回文串长度。
对比找出最大长度的即可求出最长回文子串

 */
