/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
function longestPalindrome(s) {
  // 动态规划，状态转移方程为：
  // P(i, i) = ture
  // P(i, i + 1) = Si === Si+1
  // P(i, j) = P(i + 1, j - 1) && Si === Sj
  const n = s.length;
  const dp = Array(n).fill([]).map(() => Array(n).fill(null));
  let ans = '';
  // 注意遍历的顺序
  for (let l = 0; l < n; l += 1) {
    for (let i = 0; i + l < n; i += 1) {
      const j = i + l;
      if (l === 0) {
        dp[i][j] = true;
      } else if (l === 1) {
        dp[i][j] = s.charAt(i) === s.charAt(j);
      } else {
        dp[i][j] = dp[i + 1][j - 1] && (s.charAt(i) === s.charAt(j));
      }
      if (dp[i][j] && l + 1 > ans.length) {
        ans = s.substr(i, l + 1);
      }
    }
  }
  return ans;
}

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

// @lc code=end

const res1 = longestPalindrome('babad'); // 'aba', 'bab';
const res2 = longestPalindrome('cbbd'); // 'bb';
const res3 = longestPalindrome('abb'); // 'bb'
const res4 = longestPalindrome('jrjnbctoqgzimtoklkxcknwmhiztomaofwwzjnhrijwkgmwwuazcowskjhitejnvtblqyepxispasrgvgzqlvrmvhxusiqqzzibcyhpnruhrgbzsmlsuacwptmzxuewnjzmwxbdzqyvsjzxiecsnkdibudtvthzlizralpaowsbakzconeuwwpsqynaxqmgngzpovauxsqgypinywwtmekzhhlzaeatbzryreuttgwfqmmpeywtvpssznkwhzuqewuqtfuflttjcxrhwexvtxjihunpywerkktbvlsyomkxuwrqqmbmzjbfytdddnkasmdyukawrzrnhdmaefzltddipcrhuchvdcoegamlfifzistnplqabtazunlelslicrkuuhosoyduhootlwsbtxautewkvnvlbtixkmxhngidxecehslqjpcdrtlqswmyghmwlttjecvbueswsixoxmymcepbmuwtzanmvujmalyghzkvtoxynyusbpzpolaplsgrunpfgdbbtvtkahqmmlbxzcfznvhxsiytlsxmmtqiudyjlnbkzvtbqdsknsrknsykqzucevgmmcoanilsyyklpbxqosoquolvytefhvozwtwcrmbnyijbammlzrgalrymyfpysbqpjwzirsfknnyseiujadovngogvptphuyzkrwgjqwdhtvgxnmxuheofplizpxijfytfabx'); //
console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
