/**
 * 
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，
 * 你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
 */

/**
 * @param {number[]} T
 * @return {number[]}
 * 暴力破解
 */
var dailyTemperatures = function(T) {
  if (T.length  === 1) {
    return [0]
  }
  const res = []
  let i = 0;
  let j = 1;
  while(i < T.length) {
    if (j >= T.length) {
      res.push(0)
      i += 1
      j = i + 1
    } else if (T[i] < T[j]) {
      res.push(j-i)
      i += 1
      j = i + 1
    } else {
      j += 1
    }
  }
  return res
}

// 栈
var dailyTemperatures = function(T) {
  let result = new Array(T.length).fill(0)
  let stack = [] // 存放下标
    debugger
  for (let i = 0; i < T.length; i++) {
    while (stack.length > 0 && T[i] > T[stack[stack.length - 1]]) {
      // 当前比队列中的top大，则可以计算res，
      // pop后继续比对，直到stack为空或不大于时停止
      let prevIndex = stack.pop()
      result[prevIndex] = i - prevIndex
    }
    stack.push(i)
  }

  return result
};
