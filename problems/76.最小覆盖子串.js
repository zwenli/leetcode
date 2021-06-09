/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

function minWindow(s, t) {
  // 滑动窗口
  // time complexity O(n)
  // space complexity O(|t|): |t|表示t的字母种类数量
  // 1. 初始化left,right为0, 吧索引左闭右开区间成为窗口
  // 2. 先不断增大right指针扩大窗口[left,right)，知道窗口中的所有字符串符合要求
  // 也就是包含t的所有字符
  // 3. 此时，停止增加right，转而增加left缩小窗口[left, righ)，直到
  // 窗口中的字符串不再符合要求。同时，每次增加 left ，我们都要更新一轮结果。
  // 4. 重复2，3 直到right到达了s的尽头
  // 第2步相当于找到一个可行解，第3步在优化这个可行解，最终找到最优解
  if (!s.length || !t.length || s.length < t.length) return '';
  const need = {}; // char -> cnt, 数量允许为负数
  let needCnt = 0; // 记录所需元素的总数量
  for (const char of t) {
    if (!need[char]) need[char] = 0;
    need[char] += 1;
    needCnt += 1;
  }
  let left = 0;
  let right = 0;
  let begin = 0; // 最小覆盖子串的起点
  let minLen = Infinity; // 最小覆盖子串的长度
  // [left ,right)
  while (right < s.length) {
    // 要加入的字符
    const rightChar = s[right];
    // 判断字母是否为t所需要的
    if (need[rightChar] !== undefined) {
      // 负数就表示了，该字符在窗口中有多余的数量
      need[rightChar] -= 1;
      // 当数量为负数时，无需减少所需元素的数量
      if (need[rightChar] >= 0) {
        needCnt -= 1;
      }
    }
    // 右移动窗口
    right += 1;
    // 判断是否可以收缩左侧窗口，当needCnt为0
    // 说明当前窗口的字符串包含t中的所有字符了。
    // 此时也可以更新最小子串
    while (needCnt === 0) {
      // 更新最小子串
      if (right - left < minLen) {
        minLen = right - left;
        begin = left;
      }
      // 要移除的字符
      const leftChar = s[left];
      if (need[leftChar] !== undefined) {
        // 更新字符还需要数量
        need[leftChar] += 1;
        // 当字符数量大于1，说明当前窗口已不能全部包含t的所有字符
        // 同时要更新needCnt 加上对应数量1
        if (need[leftChar] > 0) {
          needCnt += 1;
        }
      }
      // 收缩窗口
      left += 1;
    }
  }
  return minLen === Infinity ? '' : s.substr(begin, minLen);
}

// function minWindow(s, t) {
//   // 滑动窗口
//   // time complexity O(n * m): n为s的长度，m为t的字母种类数量
//   // space complexity O(1)
//   if (s.length < t.length) return '';
//   if (s === t) return s;
//   const tMap = {};
//   for (const char of t) {
//     if (!tMap[char]) {
//       tMap[char] = 0;
//     }
//     tMap[char] += 1;
//   }
//   let ans;
//   let left = 0;
//   let right = 0;
//   while (left <= right && right <= s.length) {
//     // 全部涵盖了，left移动
//     if (checkTCntZero()) {
//       if (!ans || right - left < ans.length) {
//         ans = s.slice(left, right);
//       }
//       if (tMap[s[left]] !== undefined) {
//         tMap[s[left]] += 1;
//       }
//       left += 1;
//     } else {
//       if (tMap[s[right]] !== undefined) {
//         tMap[s[right]] -= 1;
//       }
//       right += 1;
//     }
//   }
//   return ans || '';
//   function checkTCntZero() {
//     for (const key in tMap) {
//       if (tMap[key] > 0) return false;
//     }
//     return true;
//   }
// }
// @lc code=end

const res1 = minWindow('ADOBECODEBANC', 'ABC');
// 'BANC'
const res2 = minWindow('a', 'a');
// 'a'
const res3 = minWindow('ab', 'A');
// ''
const res4 = minWindow('a', 'A');
// ''

// 暴力，两层循环
// 滑动窗口
// 子串问题都可以尝试用滑动窗口解决
//
