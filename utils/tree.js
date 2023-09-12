function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

function buildTree(arr, i = 0) {
  if (arr.length === 0) return null
  if (i >= arr.length) return null
  if (arr[i] == null) return null

  const root = new TreeNode(arr[i])
  root.left = buildTree(arr, i * 2 + 1)
  root.right = buildTree(arr, i * 2 + 2)
  return root
}

module.exports = {
  TreeNode,
  buildTree
}
