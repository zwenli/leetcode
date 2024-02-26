todo:

deque

Double-end Queue 双端队列
头尾都可以push，pop

stack , queue, deque

 stack api
empty, peek, pop, push, search

最近相关性 -》 栈 
类似洋葱的模型，从内到外，

 queue api
Add,remove,element, offer, poll, peek

排队

deque
addFirst, removeFirst, getFirst
addLast, removeLast, getLast
 

优先队列 priority queue
插入O(1)
取出O(long) 按元素的优先级取出
底层具体实现的数据结构较为复杂和多样：heap堆，bst, treap
Api
add, clear, poll, 




有效括号
1. 暴力， replace，不断检查字符串，将匹配的括号替换成空字符，直到字符串变为空串

2. stack


84. 最大矩阵
1. 暴力， i,j枚举两边边界，（i, j）-》 最小高度，area
2. 暴力2
	for i -〉0; n -1
	found left bound, right bound 找到当前左右两边比当前小的边界
	
2. stack
