/*
 * @lc app=leetcode.cn id=355 lang=javascript
 *
 * [355] 设计推特
 */

// @lc code=start

class MaxPQ {
  constructor(compareTo = (a, b) => a - b) {
    this.compareTo = compareTo
    this.N = 0
    this.pq = [null] // 位置0为哨兵
  }

  peek() {
    return this.pq[1]
  }

  poll() {
    const max = this.pq[1]
    // 把这个最大元素换到最后，删除之
    this.exch(1, this.N)
    this.pq[this.N] = null
    this.N -= 1
    // 让 pq[1] 下沉到正确位置
    this.sink(1)
    return max
  }

  offer(e) {
    this.N += 1
    // 先把新元素加到最后
    this.pq[this.N] = e
    // 然后让它上浮到正确的位置
    this.swim(this.N)
  }

  get size() {
    return this.N
  }

  /** 辅助函数 */
  /** 上浮第 k 个元素，以维护最大堆性质 */
  swim(k) {
    // 浮到堆顶，停止上浮
    while (k > 1 && this.less(this.parent(k), k)) {
      // 如果第k个元素比父级元素大，交换
      this.exch(k, this.parent(k))
      k = this.parent(k)
    }
  }

  /** 下沉第 k 个元素，以维护最大堆性质 */
  sink(k) {
    while (this.left(k) <= this.N) {
      // 先找出左节点
      let j = this.left(k)
      // 如果右节点存在，对比大小，取最大值
      if (j < this.N && this.less(j, j + 1)) {
        j += 1
      }
      // 如果左右节点的最大值都比k小，就不必下沉了。
      if (this.less(j, k)) break
      this.exch(j, k)
      k = j
    }
  }

  exch(i, j) {
    const tmp = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = tmp
  }

  /** pq[i] 是否比 pq[j] 小 */
  less(i, j) {
    return this.compareTo(this.pq[i], this.pq[j]) < 0
  }

  parent(k) {
    return k >> 1
  }

  left(k) {
    return k * 2
  }

  right(k) {
    return k * 2 + 1
  }
}

let time = 0
class Tweet {
  constructor(id) {
    this.id = id
    this.timestamp = ++time
    this.next = null
  }
}

class User {
  constructor(userId) {
    this.id = userId
    this.followed = new Set()
    // 关注自身
    this.follow(userId)
    this.head = null
  }
  follow(userId) {
    this.followed.add(userId)
  }
  unfollow(userId) {
    this.followed.delete(userId)
  }
  post(tweetId) {
    const tweet = new Tweet(tweetId)
    tweet.next = this.head
    this.head = tweet
  }
}

class Twitter {
  constructor() {
    this.userMap = new Map()
  }
  postTweet(userId, tweetId) {
    if (!this.userMap.has(userId)) {
      this.userMap.set(userId, new User(userId))
    }
    this.userMap.get(userId).post(tweetId)
  }
  getNewsFeed(userId) {
    let res = []
    if (!this.userMap.has(userId)) return res
    const users = this.userMap.get(userId).followed
    const q = new MaxPQ((a, b) => a.timestamp - b.timestamp)
    for (const user of users) {
      const t = this.userMap.get(user).head
      if (t != null) {
        q.offer(t)
      }
    }
    while (q.size && res.length < 10) {
      const t = q.poll()
      res.push(t.id)
      if (t.next != null) {
        q.offer(t.next)
      }
    }
    return res
  }
  follow(followerId, followeeId) {
    if (!this.userMap.has(followerId)) {
      this.userMap.set(followerId, new User(followerId))
    }
    if (!this.userMap.has(followeeId)) {
      this.userMap.set(followeeId, new User(followeeId))
    }
    this.userMap.get(followerId).follow(followeeId)
  }
  unfollow(followerId, followeeId) {
    if (!this.userMap.has(followerId) || followerId === followeeId) {
      return
    }
    this.userMap.get(followerId).unfollow(followeeId)
  }
}

// var Twitter = function() {
//   this.followMap = new Map()
//   this.tweetList = []
// };

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
// Twitter.prototype.postTweet = function(userId, tweetId) {
//   const data = {
//     userId,
//     tweetId,
//     timestamp: Date.now()
//   }
//   this.tweetList.unshift(data)
// };

/**
 * @param {number} userId
 * @return {number[]}
 */
// Twitter.prototype.getNewsFeed = function(userId) {
//   const userIds = Array.from(this.followMap.get(userId) ?? [])
//   userIds.push(userId)
//   const newsFeed = []
//   for (const item of this.tweetList) {
//     if (userIds.includes(item.userId)) {
//       newsFeed.push(item.tweetId)
//       if (newsFeed.length >= 10) {
//         break
//       }
//     }
//   }
//   return newsFeed
// };

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
// Twitter.prototype.follow = function(followerId, followeeId) {
//   if (!this.followMap.get(followerId)) {
//     this.followMap.set(followerId, new Set())
//   }
//   const set = this.followMap.get(followerId)
//   set.add(followeeId)
// };

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
// Twitter.prototype.unfollow = function(followerId, followeeId) {
//   if (this.followMap.get(followerId)) {
//     const set = this.followMap.get(followerId)
//     set.delete(followeeId)
//   }
// };

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
// @lc code=end
