/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start

// 判断字符串是否为回文串
function isPalindrome(str) {
  // 双指针
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str.charAt(left) !== str.charAt(right)) {
      return false;
    }
    left += 1;
    right -= 1;
  }
  return true;
}

/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  const set = new Set();
  const queue = [s];
  let res = '';
  while (queue.length) {
    const str = queue.shift();
    if (set.has(str)) continue;
    if (isPalindrome(str)) {
      res = str.length > res.length ? str : res;
    }
    set.add(str);
    const { length } = str;
    if (length) {
      const left = str.substring(0, length - 1);
      const right = str.substring(1, length - 1);
      const both = str.substring(1);
      if (!set.has(left)) {
        queue.push(left);
      }
      if (!set.has(right)) {
        queue.push(right);
      }
      if (!set.has(both)) {
        queue.push(both);
      }
    }
  }
  return res;
}

// @lc code=end

const res1 = longestPalindrome('babad'); // 'aba', 'bab';
const res2 = longestPalindrome('cbbd'); // 'bb';
const res3 = longestPalindrome('abb'); // 'bb'
const res4 = longestPalindrome('jrjnbctoqgzimtoklkxcknwmhiztomaofwwzjnhrijwkgmwwuazcowskjhitejnvtblqyepxispasrgvgzqlvrmvhxusiqqzzibcyhpnruhrgbzsmlsuacwptmzxuewnjzmwxbdzqyvsjzxiecsnkdibudtvthzlizralpaowsbakzconeuwwpsqynaxqmgngzpovauxsqgypinywwtmekzhhlzaeatbzryreuttgwfqmmpeywtvpssznkwhzuqewuqtfuflttjcxrhwexvtxjihunpywerkktbvlsyomkxuwrqqmbmzjbfytdddnkasmdyukawrzrnhdmaefzltddipcrhuchvdcoegamlfifzistnplqabtazunlelslicrkuuhosoyduhootlwsbtxautewkvnvlbtixkmxhngidxecehslqjpcdrtlqswmyghmwlttjecvbueswsixoxmymcepbmuwtzanmvujmalyghzkvtoxynyusbpzpolaplsgrunpfgdbbtvtkahqmmlbxzcfznvhxsiytlsxmmtqiudyjlnbkzvtbqdsknsrknsykqzucevgmmcoanilsyyklpbxqosoquolvytefhvozwtwcrmbnyijbammlzrgalrymyfpysbqpjwzirsfknnyseiujadovngogvptphuyzkrwgjqwdhtvgxnmxuheofplizpxijfytfabx'); //
console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
