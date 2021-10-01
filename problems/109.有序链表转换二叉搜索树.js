/*
 * @lc app=leetcode.cn id=109 lang=javascript
 *
 * [109] 有序链表转换二叉搜索树
 */

const { rules } = require("eslint-plugin-prettier")

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

function sortedListToBST(head) {
  return buildTree(head, null);
  function buildTree(left, right) {
    if (left == right) {
      return null;
    }
    const mid = getMedian(left, right)
    const root = new TreeNode(mid.val);
    root.left = buildTree(left, mid);
    root.right = buildTree(mid.next, right);
    return root;
  }
  function getMedian(left, right) {
    let slow = left;
    let fast = left;
    while (fast != right && fast.next != right) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }
}
// @lc code=end

const param1 = {
  val: -10,
  next: {
    val: -3,
    next: {
      val: 0,
      next: {
        val: 5,
        next: {
          val: 9,
        },
      },
    },
  },
}

const res1 = sortedListToBST(param1)
//      0
//   -3   5
// -10      9

/**

第一步是确定根节点，由于需要构造出平衡的二叉树，
因此比较直观的想法是让根节点左子树中的节点个数与右子树中的节点个数尽可能接近，
这样一来，左右子树的高度也会非常接近，可以达到高度差绝对值不超过1的题目要求。
如何找出这样的一个根节点呢？我们可以找出链表元素的中位数作为根节点的值。

> 这里对于中位数的定义为：如果链表中的元素个数为奇数，
> 那么唯一的中间值为中位数；如果元素个数为偶数，
> 那么唯二的中间值都可以作为中位数，而不是常规定义中二者的平均值。

根据中位数的性质，链表中小于中位数的元素个数与大于中位数的元素个数要么相等，
要么相差1。此时，小于中位数的元素组成了左子树，大于中位数的元素组成了右子树，
它们分别对应着有序链表中连续的一段。在这之后，我们使用分治的思想，
继续递归地对左右子树进行构造，找出对应的中位数作为根节点，以此类推。

1. 分治
设当前链表的左端点为left，右端点为right，包含关系为左关右开，即left包含在链表中
而right不包含在链表中，
通过快慢指针找出中位数。找出中位数之后，将其当作根节点，并且递归地构造左侧部分的链表
对应的左子树，以及右侧部分的链表对应的右子树


 */
