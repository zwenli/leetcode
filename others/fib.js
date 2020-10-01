/**
 * 斐波那契数列
 * @param {*} n
 * 动态规划，？ 加上缓存（备忘录）
 * 
 */

// function fib(n) {
//     if ( n === 0) return 
//     const map = new Map()
//     return helper(map, n)
// }
// function helper(map, n) {
//     if (n === 1 || n === 2) return 1;
//     if (map.has(n)) return map.get(n);
//     const value = helper(map, n - 1) + helper(map, n - 2)
//     map.set(n, value)
//     return value
// }


// 动态规划：数组存放所有值，返回最后一个即可
// dp 数组的迭代解法
// function fib(N) {
//   const dp = [0,1,1]
//   for (let i = 3; i <= N; i++) {
//     dp[i] = dp[i - 1] + dp[i - 2]
//   }
//   return dp[N]
// }

// 动态规划优化：优化上述方法：只需要存放前两个值即可，减小空间消耗
function fib(N)  {
  if (N === 0) return 0
  if (N === 1 || N === 2) return 1
  let prev = 1
  let curr = 1
  for (let i = 3; i <= N; i++) {
    const sum = prev + curr
    prev = curr
    curr = sum
  }
  return curr
}

// fib(11)