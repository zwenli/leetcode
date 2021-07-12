/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

function firstUniqChar(s) {
  // 队列
  const postion = new Map();
  const queue = [];
  for (const [i, ch] of Array.from(s).entries()) {
    if (!postion.has(ch)) {
      // 不存在，说明是第一次出现
      // 记录字符和对应第一次出现的索引值
      // 同时放入队列，
      postion.set(ch, i);
      queue.push([ch, i]);
    } else {
      // 出现重复字符
      // 将哈希中字符对应的索引设置为-1
      postion.set(ch, -1);
      // 延迟删除重复字符
      // 即使队列中有一些字符出现超过了一次，但只要不是在队首都不影响答案
      // 可以不用删除。只有当它前面的所有字符被移出队列，它成为队首时，我们才需要将它移除。
      while (queue.length && postion.get(queue[0][0]) === -1) {
        queue.shift();
      }
    }
  }
  // 队列为空说明没有不重复的字符，返回-1；否则队首的元素即是第一个不重复的字符和索引
  return queue.length ? queue[0][1] : -1;
}
// function firstUniqChar(s) {
//   // 存索引
//   if (!s || !s.length) return -1;
//   const map = new Map();
//   for (let i = 0; i < s.length; i += 1) {
//     const char = s[i];
//     if (map.has(char)) {
//       map.set(char, -1);
//     } else {
//       map.set(char, i);
//     }
//   }
//   for (const [char, i] of map) {
//     if (i !== -1) return i;
//   }
//   return -1;
// }
// @lc code=end

const res1 = firstUniqChar('leetcode');
// 0
const res2 = firstUniqChar('loveleetcode');
// 2

/**

1. 哈希存索引
2. 哈希存频次
3. 队列
 */
