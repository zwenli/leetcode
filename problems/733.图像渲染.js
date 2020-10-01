/*
 * @lc app=leetcode.cn id=733 lang=javascript
 *
 * [733] 图像渲染
 */

// @lc code=start
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
const floodFill = (image, sr, sc, newColor) => {
  const xL = image.length;
  const yL = image[0].length;
  const newIamge = JSON.parse(JSON.stringify(image));
  const queue = [[sr, sc]];
  const set = new Set();
  set.add([sr, sc].toString());
  const color = image[sr][sc];
  while (queue.length > 0) {
    const point = queue.shift();
    const [x, y] = point;
    set.add(point.toString());
    newIamge[x][y] = newColor;
    // 上下左右
    if (x + 1 < xL && newIamge[x + 1][y] === color && !set.has([x + 1, y].toString())) {
      set.add([x + 1, y]);
      queue.push([x + 1, y]);
    }
    if (x - 1 >= 0 && newIamge[x - 1][y] === color && !set.has([x - 1, y].toString())) {
      set.add([x - 1, y]);
      queue.push([x - 1, y]);
    }
    if (y + 1 < yL && newIamge[x][y + 1] === color && !set.has([x, y + 1].toString())) {
      set.add([x, y + 1]);
      queue.push([x, y + 1]);
    }
    if (y - 1 >= 0 && newIamge[x][y - 1] === color && !set.has([x, y - 1].toString())) {
      set.add([x, y - 1]);
      queue.push([x, y - 1]);
    }
  }
  return newIamge;
};
// @lc code=end

export {
  floodFill as default,
};

// const res = floodFill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2);

// console.log(res);
