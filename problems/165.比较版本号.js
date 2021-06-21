/*
 * @lc app=leetcode.cn id=165 lang=javascript
 *
 * [165] 比较版本号
 */

// @lc code=start
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */

function compareVersion(version1, version2) {
  const v1 = version1.split('.').map((i) => Number(i));
  const v2 = version2.split('.').map((i) => Number(i));
  for (let i = 0; i < v1.length || i < v2.length; i += 1) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;
    if (num1 === num2) continue;
    return num1 > num2 ? 1 : -1;
  }
  return 0;
}
// @lc code=end

const res1 = compareVersion('1.01', '1.001');
// 0
const res2 = compareVersion('1.0', '1.0.0');
// 0
const res3 = compareVersion('0.1', '1.0');
// -1
const res4 = compareVersion('1.0.1', '1');
// 1
