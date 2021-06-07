/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=621 lang=javascript
 *
 * [621] 任务调度器
 */

// @lc code=start
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */

function leastInterval(tasks, n) {
  // time complexity O(m + n): m为任务的数量，n为任务种类的数量，这里固定为26
  // space complexity O(n): n为任务种类的数量，这里固定为26
  const ct = new Array(26).fill(0);
  for (const task of tasks) {
    ct[task.charCodeAt(0) - 65] += 1;
  }
  // 任务的最多执行次数
  const maxExec = Math.max(...ct);
  // 具有最多执行次数的任务数量
  let maxCount = 0;
  ct.forEach((v) => {
    if (v === maxExec) maxCount += 1;
  });
  return Math.max(
    (maxExec - 1) * (n + 1) + maxCount,
    tasks.length,
  );
}
// @lc code=end

const res1 = leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2);
// 8
const res2 = leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 0);
// 6
const res3 = leastInterval(['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2);
// 16

// https://leetcode-cn.com/problems/task-scheduler/solution/tong-zi-by-popopop/
// 桶理论
// 设计桶的大小为n+1，则相同任务恰好不能放在同一个桶上，最密也只能放在相邻桶。
// 对于重复任务，我们将每个都放入不同的桶，因此桶的数量是重复次数最多的任务的个数。
// 一个桶不管是否放满，其占用的时间均为 n+1，
// 这是因为后面桶里的任务需要等待冷却时间。
// 最后一个桶是个特例，由于其后没有其他任务需等待，
// 所以占用的时间为桶中的任务个数。
// 得出公式如下：num1 = 总排队时间 = （桶个数 - 1）* （n + 1）+ 最后一桶的任务。
// 但是还有一种情况是任务种类有很多时，根据上面公式排完之后，还有剩余的任务没执行
// 此时我们可以临时扩充某些桶的大小，插入剩余的任务
// 继续思考一下，这种情况下其实每个任务之间都不存在空余时间，冷却时间已经被完全填满了。
// 也就是说，我们执行任务所需的时间，就是任务的数量 num2
// 存在空闲时间时肯定是 num1 > num2, 不存在时 num1 <= nums
// 故总的时间取最大值即可。
