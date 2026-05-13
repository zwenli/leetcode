function singleNonDuplicate(nums: number[]): number {
  // 题解：https://leetcode.cn/problems/single-element-in-a-sorted-array/solutions/1252764/you-xu-shu-zu-zhong-de-dan-yi-yuan-su-by-y8gh/?envType=problem-list-v2&envId=array
  let l = 0
  let r = nums.length - 1
  while (l < r) {
    const mid = Math.floor((r - l) / 2) + l
    if (nums[mid] === nums[mid ^ 1]) {
      l = mid + 1
    } else {
      r = mid
    }
  }
  
  return nums[l]
}
