/* eslint-disable no-restricted-syntax */
/*
 * @lc app=leetcode.cn id=874 lang=javascript
 *
 * [874] 模拟行走机器人
 */

// @lc code=start
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
function robotSim(commands, obstacles) {
  let ans = 0; // 距离
  let x = 0; // x坐标
  let y = 0; // y坐标
  let direction = 0; // 方向
  const xy = [
    [0, 1], // 北
    [1, 0], // 东
    [0, -1], // 南
    [-1, 0], // 西
  ];
  const obstaclesSet = new Set(
    obstacles.map(([x, y]) => `${x},${y}`),
  );
  for (const command of commands) {
    if (command === -1) {
      // 右转90度
      direction = (direction + 1) % 4;
    } else if (command === -2) {
      // 左转90度
      // (direction - 1 + 4) % 4
      // 左转90度相当于右转270也就是右转3次
      direction = (direction + 3) % 4;
    } else {
      for (let k = 0; k < command; k += 1) {
        const nx = x + xy[direction][0];
        const ny = y + xy[direction][1];
        if (obstaclesSet.has(`${nx},${ny}`)) {
          // 遇到障碍物，停止前进
          break;
        }
        x = nx;
        y = ny;
      }
      // 放在循环体外，是因为前进到最后，对比上一个指令，只有两种情况
      // 如果是退回去了，那么之前ans还是最大的，如果是前进，则最后一步是最大的，符合要求
      ans = Math.max(ans, x * x + y * y);
    }
  }
  return ans;
}
// @lc code=end

const res1 = robotSim([4, -1, 3], []); // 25

const res2 = robotSim([4, -1, 4, -2, 4], [[2, 4]]); // 65

// 贪心
