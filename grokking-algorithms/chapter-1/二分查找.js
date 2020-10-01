// 二分查找（列表必须是顺序排列的）
// 返回指定item在list中的index，不存在返回-1
// 时间复杂度O = log2n
function binarySearch(list, item) {
  let low = 0
  let high = list.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const guess = list[mid]
    if (guess < item) {
      low = mid + 1
    } else if (guess > item) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

// test
const list = Array.apply(null, {length: 100}).map((item, index) => index)
const item = 66

console.log(binarySearch(list, item)) // 66