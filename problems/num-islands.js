/**
岛屿数量

给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。
 */

/**
 * @param {character[][]} grid
 * @return {number}
 * 基于BFS广度优先搜索
 */
function numIslands(gird) {
  const _gird = JSON.parse(JSON.stringify(gird))
  let count = 0
  let queue = [] // 用来存‘1’坐标
  for(let i = 0; i < _gird.length; i++) {
    for (let j = 0; j < _gird[0].length; j++) {
      if (_gird[i][j] === '1') {
        count += 1
        // 沉岛，防止重复遍历
        _gird[i][j] = '0'
        queue.push([j, i])
        turnZero(_gird, queue)
      }
    }
  }
  return count
}

// 遍历相邻的陆地，将其沉岛
function turnZero(_gird, queue) {
  const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]]
  while(queue.length) {
    const cur = queue.shift()
    for (dir of dirs) {
      const x = dir[0] + cur[0]
      const y = dir[1] + cur[1]
      // 边界判断
      if (x < 0 || x >= _gird[0].length || y < 0 || y >= _gird.length || _gird[y][x] !== '1') {
        continue
      }
      _gird[y][x] = '0'
      queue.push([x,y])
    }
  }
}

// [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]

var res = numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]])
console.log(res)