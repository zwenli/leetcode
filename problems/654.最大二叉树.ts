class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  // 单调栈
  const n = nums.length
  const stack: number[] = []
  const left: number[] = new Array(n).fill(-1)
  const right: number[] = new Array(n).fill(-1)
  const tree: TreeNode[] = new Array(n).fill(-1)

  for (let i = 0; i < n; i++) {
    tree[i] = new TreeNode(nums[i])
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      right[stack.pop()!] = i
    }
    if (stack.length) {
      left[i] = stack[stack.length - 1]
    }

    stack.push(i)
  }

  let root: TreeNode | null = null
  for (let i = 0; i < n; i++) {
    if (left[i] === -1 && right[i] === -1) {
      root = tree[i]
    } else if (
      right[i] === -1 ||
      (left[i] !== -1 && nums[left[i]] < nums[right[i]])
    ) {
      tree[left[i]].right = tree[i]
    } else {
      tree[right[i]].left = tree[i]
    }
  }

  return root
}
// function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
//   const dfs = (
//     nums: number[],
//     left: number,
//     right: number,
//   ): TreeNode | null => {
//     if (left > right) return null
//     let best = left
//     for (let i = left + 1; i <= right; i++) {
//       if (nums[i] > nums[best]) {
//         best = i
//       }
//     }

//     const node = new TreeNode(nums[best])
//     node.left = dfs(nums, left, best)
//     node.right = dfs(nums, best, right)
//     return node
//   }

//   return dfs(nums, 0, nums.length - 1)
// }
