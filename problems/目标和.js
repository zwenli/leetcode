/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
const findTargetSumWays = function (nums, S) {
  const numsLength = nums.length;
  if (!numsLength) return 0;
  let count = 0;
  function dfs(res, index) {
    const num = nums[index];
    // 判断是否等于S
    const upRes = res + num;
    const downRes = res - num;
    if (index === numsLength - 1) {
      if (upRes === S) {
        count += 1;
      }
      if (downRes === S) {
        count += 1;
      }
      return;
    }
    dfs(upRes, index + 1);
    dfs(downRes, index + 1);
  }
  dfs(0, 0);
  return count;
};

const res = findTargetSumWays([1, 1, 1, 1, 1], 3);
console.log(res); // 5
