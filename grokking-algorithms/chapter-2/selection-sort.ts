// 时间复杂度O(n^2)

/**
 * 将数组从小到大排序
 * 用选择排序
 */

function selectionSort(arr: number[]): number[] {
  const newArr: number[] = [];
  while (arr.length) {
    const smallest_index = findSmallest(arr)
    newArr.push(...arr.splice(smallest_index, 1))
  }
  return newArr;
}

function findSmallest(arr: number[]): number {
  var a = 1
  let smallest: number = arr[0]
  let smallest_index: number = 0
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i]
      smallest_index = i
    }
  }
  return smallest_index
}

export default {
  selectionSort
}