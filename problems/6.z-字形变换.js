/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */

function convert(s, numRows) {
  // 2. 按行访问
  // time compelxity O(n): n为字符串s的长度
  // space complexity O(n)
  if (numRows < 2 || s.length <= numRows) return s
  let ans = ''
  let n = s.length
  let cycleLen = 2 * (numRows - 1)
  // 逐行读取字符
  for (let i = 0; i < numRows; i += 1) {
    // 行i中的字符的索引位置
    for (let j = 0; i + j < n; j += cycleLen) {
      ans += s.charAt(i + j)
      if (i !== 0 && i !== numRows - 1 && j + cycleLen - i < n) {
        ans += s.charAt(j + cycleLen - i)
      }
    }
  }
  return ans
}
// function convert(s, numRows) {
//   // 按行排序
//   // 从左到右访问遍历字符串，可以轻松地确定字符位于 Z 字形图案中的哪一行。
//   // time compelxity O(n): n为字符串s的长度
//   // space complexity O(n)
//   if (numRows < 2 || s.length <= numRows) return s
//   const rows = new Array(numRows).fill('')
//   let down = true // 减少
//   let curRow = 0
//   for (let i = 0; i < s.length; i += 1) {
//     rows[curRow] += s.charAt(i)
//     if (curRow === 0 || curRow === numRows - 1) down = !down
//     curRow += down ? -1 : 1
//   }
//   let ans = ''
//   for (const row of rows) {
//     ans += row
//   }
//   return ans
// }

// function convert(s, numRows) {
//   // 按行排序
//   // 从到右访问遍历字符串，可以轻松地确定字符位于 Z 字形图案中的哪一行。
//   if (numRows < 2 || s.length <= numRows) return s;
//   const cols = Math.floor(s.length / 2) + 1;
//   const table = new Array(numRows).fill(null).map(
//     () => new Array(cols).fill(null),
//   );
//   let down = true;
//   let x = 0;
//   let y = 0; // y不存在减的情况
//   for (let i = 0; i < s.length; i += 1) {
//     table[x][y] = s[i];
//     if (down) {
//       if (x < numRows - 1) {
//         x += 1;
//       } else {
//         down = false;
//         x -= 1;
//         y += 1;
//       }
//     } else {
//       if (x > 0) {
//         x -= 1;
//         y += 1;
//       } else {
//         down = true;
//         x += 1;
//       }
//     }
//   }
//   let ans = '';
//   for (let r = 0; r < numRows; r += 1) {
//     for (let c = 0; c < cols; c += 1) {
//       if (table[r][c] !== null) {
//         ans += table[r][c];
//       }
//     }
//   }
//   return ans;
// }
// @lc code=end

const assert = require('assert').strict

const res1 = convert('PAYPALISHIRING', 3)
assert.equal(res1, 'PAHNAPLSIIGYIR')
// P   A   H   N
// A P L S I I G
// Y   I   R

const res2 = convert('PAYPALISHIRING', 4)
assert.equal(res2, 'PINALSIGYAHRPI')
// P     I    N
// A   L S  I G
// Y A   H R
// P     I

const res3 = convert('ABC', 2)
assert.equal(res3, 'ACB')
// A C
// B

/**

N字变换更为贴切

解法，
1. 按行排序
从左到右访问遍历字符串，可以轻松地确定字符位于 Z 字形图案中的哪一行。
无需关注空格，确定好当前是哪行，拼接上字符即可

2. 按行访问
按照与逐行读取 Z 字形图案相同的顺序访问字符串。

首先访问行0中的所有字符，接着访问行1，然后行2，依此类推...
对于所有整数k，
* 行0中的字符位于索引 k*2*(numRows-1)
* 行numRows-1中的字符位于索引 k*2*(numRows-1) + (numsRows-1)
* 内部的行i中的字符位于索引 k*2*(numRows-1)+i 和 (k+1)*2*(numRows-1)-i两处

PS:画图加深理解
numsRows = 4
P     I    N｜  r = 0, i = [0, 6, 12] => k*2(numsRows-1)
A   L S  I G｜ r = 1, i = [1, 5, 7, 11, 13], 可以看出有两个点，
Y A   H R   ｜ 以k*2(numsRows-1)为中点作对称，偏移1个位置，同理r = i时，偏移i个位置
P     I     ｜ r = 3, i = [3, 9] => k*2(numsRows-1) + (numsRows-1)

 */
