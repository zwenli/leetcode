// 时间复杂度O(n^2)

function findSmallest(arr: number[]): number {
  let smallest: number = arr[0];
  let smallestIndex = 0;
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < smallest) {
      smallest = arr[i];
      smallestIndex = i;
    }
  }
  return smallestIndex;
}

/**
 * 将数组从小到大排序
 * 用选择排序
 */
function selectionSort(arr: number[]): number[] {
  const newArr: number[] = [];
  while (arr.length) {
    const smallestIndex = findSmallest(arr);
    newArr.push(...arr.splice(smallestIndex, 1));
  }
  return newArr;
}

// console.log(selectionSort([3,5,7,9,1,2]))

export default selectionSort;
