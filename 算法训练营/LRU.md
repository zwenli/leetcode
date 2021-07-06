# LRU

[百科](https://baike.baidu.com/item/LRU)

least recent used 最近最少使用

LRU是一种缓存淘汰策略，选择最近最久未使用的页面予以淘汰。也就是以时间为角度，内存满了就优先删除那些很久没用过的数据。

## 设计

LRU 算法实际上是让你设计数据结构:首先要接收一个 capacity 参数作为 缓存的最大容量，然后实现两个 API，一个是 put(key, val) 方法存入键值 对，另一个是 get(key) 方法获取 key 对应的 val，如果 key 不存在则返回 -1。get 和 put 方法必须都是 O(1) 的时间复杂度。

分析上面的操作过程，要让 put 和 get 方法的时间复杂度为 O(1)，我们可以 总结出 cache 这个数据结构必要的条件:查找快，插入快，删除快，有顺序之分

哈希链表（双向链表）

## 题目
* https://leetcode-cn.com/problems/lru-cache/