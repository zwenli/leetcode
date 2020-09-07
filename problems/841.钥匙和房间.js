/*
 * @lc app=leetcode.cn id=841 lang=javascript
 *
 * [841] 钥匙和房间
 */

// @lc code=start
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
function canVisitAllRooms(rooms) {
  const visited = new Array(rooms.length).fill(0);
  if (rooms.length === 1) return true;
  const queue = [rooms[0]];
  visited[0] = 1;
  while (queue.length) {
    const keys = queue.shift();
    if (keys && keys.length) {
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (visited[key] !== 1) {
          queue.push(rooms[key]);
          visited[key] = 1;
        }
      }
    }
  }

  return visited.reduce((total, cur) => total + cur, 0) === visited.length;
}
// @lc code=end

const res2 = canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]);
const res1 = canVisitAllRooms([[1], [2], [3], []]);
console.log(res2); // false
console.log(res1); // true
