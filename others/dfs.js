/*
 * Return true if there is a path from cur to target.
 */
// boolean DFS(int root, int target) {
//     Set<Node> visited;
//     Stack<Node> s;
//     add root to s;
//     while (s is not empty) {
//         Node cur = the top element in s;
//         return true if cur is target;
//         for (Node next : the neighbors of cur) {
//             if (next is not in visited) {
//                 add next to s;
//                 add next to visited;
//             }
//         }
//         remove cur from s;
//     }
//     return false;
// }

function dfs(root, target) {
  const visited = new Set()
  const stack = [root]
  while (s.length) {
    let cur = stack.pop()
    if (cur === target) return true
    for (let next of cur.neighbors) {
      if (visited.has(next)) continue
      visited.add(next)
      stack.push(next)
    }
  }
  return false
}