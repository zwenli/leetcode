/** 模拟 */
// function addDigits(num: number): number {
//   while (num >= 10) {
//     let temp = 0
//     while (num) {
//       temp += num % 10
//       num = Math.floor(num / 10)
//     }
//     num = temp
//   }
//   return num
// }

/** 数学 */
function addDigits(num: number): number {
  return (num - 1) % 9 + 1;
}
