interface MessageQueue {
  stat: String
  send: Function
}

class MyMessageQueue implements MessageQueue {
  stat: String
  constructor() {
    this.stat = 'init'
  }
  send(message: String) {
    this.stat = 'pedding'
    console.log(message)
    this.stat = 'done'
  }
}

const myQueue = new MyMessageQueue()
myQueue.send('e31312')
