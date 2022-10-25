/*
 * @lc app=leetcode.cn id=1700 lang=javascript
 *
 * [1700] 无法吃午餐的学生数量
 */

// @lc code=start
/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function (students, sandwiches) {
  // 模拟
  // s1 喜欢吃方形三明治的学生数量
  // s0 喜欢吃圆形三明治的学生数量
  // 栈顶的三明治能否被拿走取决于队列剩余的学生中是否有喜欢它的，
  // 因此学生在队列的相对位置不影响整个过程，我们只需要记录队列剩余的学生中
  // s0 和 s1 的值，对整个过程进行模拟，如果栈顶的元素为 0 并且 s0 > 1，将 s0 减1；
  // 如果栈顶的元素为 1 并且 s1 > 1，将 s1 减1；否则终止循环，并返回s0+s1
  let s1 = students.reduce((sum, cur) => sum + cur, 0)
  let s0 = students.length - s1
  for (let i = 0; i < sandwiches.length; i++) {
    if (sandwiches[i] === 1 && s1 > 0) {
      s1 -= 1
    } else if (sandwiches[i] === 0 && s0 > 0) {
      s0 -= 1
    } else {
      break
    }
  }
  return s1 + s0
}
// var countStudents = function (students, sandwiches) {
//   // 暴力解法
//   let count = 0
//   while (sandwiches.length) {
//     if (students[0] === sandwiches[0]) {
//       students.shift()
//       sandwiches.shift()
//       count = 0
//     } else {
//       students.push(students.shift())
//       count += 1
//     }
//     if (count >= sandwiches.length) break
//   }
//   return students.length
// }
// @lc code=end
