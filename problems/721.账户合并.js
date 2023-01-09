/*
 * @lc app=leetcode.cn id=721 lang=javascript
 *
 * [721] 账户合并
 */

// @lc code=start
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  // dfs
  const graph = buildGraph(accounts)
  const visited = new Set()
  const res = []
  for (const account of accounts) {
    const emails = []
    dfs(account[1], graph, emails, visited)
    if (emails.length) {
      res.push([account[0], ...emails.sort()])
    }
  }
  return res
  function buildGraph(accounts) {
    const graph = {}
    for (const account of accounts) {
      const master = account[1]
      for (const email of account.slice(2)) {
        graph[master]?.push(email) ?? (graph[master] = [email])
        graph[email]?.push(master) ?? (graph[email] = [master])
      }
    }
    return graph
  }
  function dfs(email, graph, emails, visited) {
    if (visited.has(email)) return
    emails.push(email)
    visited.add(email)
    for (const neighbor of (graph[email] ?? [])) {
      dfs(neighbor, graph, emails, visited)
    }
  }
}
// @lc code=end

const assert = require('node:assert').strict

const res1 = accountsMerge([
  ['John', 'johnsmith@mail.com', 'john00@mail.com'],
  ['John', 'johnnybravo@mail.com'],
  ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
  ['Mary', 'mary@mail.com'],
])
assert.deepEqual(res1, [
  ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
  ['John', 'johnnybravo@mail.com'],
  ['Mary', 'mary@mail.com'],
])

const res2 = accountsMerge([
  ['Gabe', 'Gabe0@m.co', 'Gabe3@m.co', 'Gabe1@m.co'],
  ['Kevin', 'Kevin3@m.co', 'Kevin5@m.co', 'Kevin0@m.co'],
  ['Ethan', 'Ethan5@m.co', 'Ethan4@m.co', 'Ethan0@m.co'],
  ['Hanzo', 'Hanzo3@m.co', 'Hanzo1@m.co', 'Hanzo0@m.co'],
  ['Fern', 'Fern5@m.co', 'Fern1@m.co', 'Fern0@m.co'],
])
assert.deepEqual(res2, [
  ['Gabe', 'Gabe0@m.co', 'Gabe1@m.co', 'Gabe3@m.co'],
  ['Kevin', 'Kevin0@m.co', 'Kevin3@m.co', 'Kevin5@m.co'],
  ['Ethan', 'Ethan0@m.co', 'Ethan4@m.co', 'Ethan5@m.co'],
  ['Hanzo', 'Hanzo0@m.co', 'Hanzo1@m.co', 'Hanzo3@m.co'],
  ['Fern', 'Fern0@m.co', 'Fern1@m.co', 'Fern5@m.co'],
])
