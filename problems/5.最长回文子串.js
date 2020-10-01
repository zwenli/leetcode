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
function expandAroundCenter(s, left, right) {
  let l = left;
  let r = right;
  while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
    l -= 1;
    r += 1;
  }
  return r - l - 1;
}

function longestPalindrome(s) {
  // 中心扩展算法, 基于动态规划
  // p(i,j) <= p(i + 1, j - 1) <= p(j + n, j - 1) <= 某一边界情况
  // 某一边界情况指 p(i,i),p(i, i + 1)
  if (!s || !s.length) {
    return '';
  }
  const n = s.length;
  let start = 0;
  let end = 0;
  for (let i = 0; i < n; i += 1) {
    const len1 = expandAroundCenter(s, i, i);
    const len2 = expandAroundCenter(s, i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.substring(start, end + 1);
}
// @lc code=end

// function longestPalindrome(s) {
//   // 动态规划，状态转移方程为：
//   // P(i, i) = ture
//   // P(i, i + 1) = Si === Si+1
//   // P(i, j) = P(i + 1, j - 1) && Si === Sj
//   // 时间复杂度O(n^2);空间复杂度O(n^2)
//   const n = s.length;
//   const dp = Array(n).fill([]).map(() => Array(n).fill(null));
//   let ans = '';
//   // 注意遍历的顺序
//   for (let l = 0; l < n; l += 1) {
//     for (let i = 0; i + l < n; i += 1) {
//       const j = i + l;
//       if (l === 0) {
//         dp[i][j] = true;
//       } else if (l === 1) {
//         dp[i][j] = s.charAt(i) === s.charAt(j);
//       } else {
//         dp[i][j] = dp[i + 1][j - 1] && (s.charAt(i) === s.charAt(j));
//       }
//       if (dp[i][j] && l + 1 > ans.length) {
//         ans = s.substr(i, l + 1);
//       }
//     }
//   }
//   return ans;
// }

// // 判断字符串是否为回文串
// function isPalindrome(str) {
//   // 双指针
//   let left = 0;
//   let right = str.length - 1;
//   while (left < right) {
//     if (str.charAt(left) !== str.charAt(right)) {
//       return false;
//     }
//     left += 1;
//     right -= 1;
//   }
//   return true;
// }

// /**
//  * @param {string} s
//  * @return {string}
//  */
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
//       const right = str.substring(1, length - 1);
//       const both = str.substring(1);
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
// }

const res1 = longestPalindrome('babad'); // 'aba', 'bab';
const res2 = longestPalindrome('cbbd'); // 'bb';
const res3 = longestPalindrome('abb'); // 'bb'
const res4 = longestPalindrome('jrjnbctoqgzimtoklkxcknwmhiztomaofwwzjnhrijwkgmwwuazcowskjhitejnvtblqyepxispasrgvgzqlvrmvhxusiqqzzibcyhpnruhrgbzsmlsuacwptmzxuewnjzmwxbdzqyvsjzxiecsnkdibudtvthzlizralpaowsbakzconeuwwpsqynaxqmgngzpovauxsqgypinywwtmekzhhlzaeatbzryreuttgwfqmmpeywtvpssznkwhzuqewuqtfuflttjcxrhwexvtxjihunpywerkktbvlsyomkxuwrqqmbmzjbfytdddnkasmdyukawrzrnhdmaefzltddipcrhuchvdcoegamlfifzistnplqabtazunlelslicrkuuhosoyduhootlwsbtxautewkvnvlbtixkmxhngidxecehslqjpcdrtlqswmyghmwlttjecvbueswsixoxmymcepbmuwtzanmvujmalyghzkvtoxynyusbpzpolaplsgrunpfgdbbtvtkahqmmlbxzcfznvhxsiytlsxmmtqiudyjlnbkzvtbqdsknsrknsykqzucevgmmcoanilsyyklpbxqosoquolvytefhvozwtwcrmbnyijbammlzrgalrymyfpysbqpjwzirsfknnyseiujadovngogvptphuyzkrwgjqwdhtvgxnmxuheofplizpxijfytfabx'); //
console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
