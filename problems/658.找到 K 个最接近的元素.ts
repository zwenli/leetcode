function findClosestElements(arr: number[], k: number, x: number): number[] {
  let left = 0
  let right = arr.length - k
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (x > (arr[mid] + arr[mid + k]) / 2) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return arr.slice(left, left + k)
};