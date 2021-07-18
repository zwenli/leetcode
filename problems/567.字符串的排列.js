/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

function checkInclusion(s1, s2) {
  // 双指针
  if (s1.length > s2.length) return false;
  const A_CHAR_CODE = 'a'.charCodeAt();
  const count = new Array(26).fill(0);
  const m = s1.length;
  const n = s2.length;
  for (let i = 0; i < m; i += 1) {
    count[s1.charCodeAt(i) - A_CHAR_CODE] -= 1;
  }
  for (let left = 0, right = 0; right < n; right += 1) {
    const x = s2.charCodeAt(right) - A_CHAR_CODE;
    count[x] += 1;
    while (count[x] > 0) {
      count[s2.charCodeAt(left) - A_CHAR_CODE] -= 1;
      left += 1;
    }
    if (right - left + 1 === m) {
      return true;
    }
  }
  return false;
}

// function checkInclusion(s1, s2) {
//   // 滑动窗口
//   if (s1.length > s2.length) return false;
//   const A_CHAR_CODE = 'a'.charCodeAt();
//   const m = s1.length;
//   const n = s2.length;
//   const count = new Array(26).fill(0);
//   for (let i = 0; i < m; i += 1) {
//     count[s1.charCodeAt(i) - A_CHAR_CODE]++;
//     count[s2.charCodeAt(i) - A_CHAR_CODE]--;
//   }
//   let diff = 0;
//   for (let i = 0; i < 26; i += 1) {
//     if (count[i] !== 0) diff += 1;
//   }
//   if (diff === 0) return true;
//   for (let i = m; i < n; i += 1) {
//     const x = s2.charCodeAt(i - m) - A_CHAR_CODE;
//     const y = s2.charCodeAt(i) - A_CHAR_CODE;
//     if (x === y) continue;
//     if (count[x] === 0) diff += 1;
//     count[x] += 1;
//     if (count[x] === 0) diff -= 1;
//     if (count[y] === 0) diff += 1;
//     count[y] -= 1;
//     if (count[y] === 0) diff -= 1;
//     if (diff === 0) return true;
//   }
//   return false;
// }
// function checkInclusion(s1, s2) {
//   // 滑动窗口
//   if (s1.length > s2.length) return false;
//   const A_CHAR_CODE = 'a'.charCodeAt();
//   const count = new Array(26).fill(0);
//   const m = s1.length;
//   const n = s2.length;
//   for (let i = 0; i < m; i++) {
//     count[s1.charCodeAt(i) - A_CHAR_CODE]++;
//     count[s2.charCodeAt(i) - A_CHAR_CODE]--;
//   }
//   if (allZero(count)) return true;
//   for (let i = m; i < n; i++) {
//     count[s2.charCodeAt(i) - A_CHAR_CODE]--;
//     count[s2.charCodeAt(i - m) - A_CHAR_CODE]++;
//     if (allZero(count)) return true;
//   }
//   return false;
  
//   function allZero(count) {
//     for (let i = 0; i < 26; i += 1) {
//       if (count[i] !== 0) return false;
//     }
//     return true;
//   }
// }
// @lc code=end

const assert = require('assert').strict;

const res1 = checkInclusion('ab', 'eidbaooo');
assert.equal(res1, true);

const res2 = checkInclusion('ab', 'eidboaoo');
assert.equal(res2, false);

/**

1. 滑动窗口，固定窗口长度的，

最开始，分别用count1，count2记录s1,s2字母出现的次数，
判断窗口内的count1和count2是否一样。
然后滑动窗口，注意右边字母是进，左边字母是出，重复判断
窗口关系为 j-i=n;

以上思路可以继续优化，用count记录s1,s2之间字母次数的差值
如果s1是s2的子串，那么在窗口内的count所有数字都为0的，
所以我们可以让s1加次数，s2减次数（相反也一样）
然后判断count是否全为0
之后滑动窗口，s2右边进字母减一，左边出字母加一，重复判断

这时候发现每次移动窗口时，只一进一出两个字符，却需要统计整个count，
我们可以用diff变量记录count1与count2不同值的个数，这样就变成
判断diff是否为0即可

每次窗口滑动，记一进一出两个字符为x和y

若x === y, 则对count无影响，直接跳过
若x !== y, 对于字符x，在count[x]+1之前需要判断count[x]是否为0，
如果为0，则说明出现差值diff+1。修改完之后，若count[x] == 0，则diff - 1。
对于y同理，在count[y]-1之前若count[y] == 0, diff + 1, 修改完后
若count[y] === 0, diff - 1;

2. 双指针，快慢指针，不固定窗口长度的

方法一的思路是在保证区间长度为m的情况下，去考察是否存在一个区间使得count的值全为0

反过来，可以在保证count的值不为正数下，是否存在一个区间，其长度恰好等于m。

初始化时，仅统计s的字母数量，则count的值均不为正，且总和为-m。

然后用两个指针left和right表示考察区间[left, right]。right每向右移动一次，就统计
一次进入区间的字符x。为保证count的值不为正，若此时count[x]为正数 >0，则left向右移动，
减少离开区间的字符的count直到count[x] <= 0。
（right指针是快于left指针的，初始化时已保证count的所有值是不大于0的，
即使过程中有count[right] > 0，只需要向右移动left指针，减少字符数量。
一种情况是区间内都没有s1的字符，那么left会等于right，count所有值不为正的性质不变。一进一出）

[left,right] 的长度每增加1，count的元素值之和就加1。当[left, right]的区间长度恰好为m时，
就意味着count的元素值之和为0，由于count的值不为正，
元素值之和为0就意味着所有元素均为0，这样我们就找到了一个目标子串。


总结：对这类问题，主要是考察窗口内字母频次和种类数量，与顺序无关
维护好这两个信息就可以解决问题了。
 */
