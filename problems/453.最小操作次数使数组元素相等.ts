/**
 * 把每次对 n-1 个元素 +1 的操作等价为对某个元素 -1。
 * 把所有元素都降到相同的最小值需要的操作数等于 sum(nums) - n * min(nums)。
 * @param nums 
 * @returns 
 */
function minMoves(nums: number[]): number {
  if (nums.length === 0) return 0;
  let min = nums[0];
  let sum = 0;
  for (const x of nums) {
    sum += x;
    if (x < min) min = x;
  }
  return sum - nums.length * min;
}
