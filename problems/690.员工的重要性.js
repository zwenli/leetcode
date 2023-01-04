/*
 * @lc app=leetcode.cn id=690 lang=javascript
 *
 * [690] 员工的重要性
 */

// @lc code=start
/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function (employees, id) {
  const map = new Map()
  for (const employee of employees) {
    map.set(employee.id, employee)
  }
  return dfs(id)
  function dfs(id) {
    const employee = map.get(id)
    let total = employee.importance
    for (const subId of employee.subordinates) {
      total += dfs(subId)
    }
    return total
  }
}
// @lc code=end
