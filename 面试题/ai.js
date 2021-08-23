/**
实现以下功能接口

案例1: AI.talk('hahaha').talk('a').cancel*()
执行后，控制台打印: hahaha

案例2: AI.sleep(3000).talk('a')
执行后，隔了3秒后，控制台才打印：hahaha

案例3: AI.talk('hahaha').cancel()
执行后，控制台什么都没有打印

案例4: AI.sleep(5000).cancel().talk('abc').sleep(1000).talk('cba')
执行后，控制台马上打印：abc，然后隔了1秒后，再次打印：cba

 */
class AI {
  constructor() {
    this.stack = [];
    this.timer = void 0;
  }
  talk(e) {
    this.stack.push(() => {
      console.log(e)
      return Promise.resolve()
    })
    this.run()
    return this
  }
  sleep(time) {
    this.stack.push(() => {
      return new Promise(resolve => {
        setTimeout(resolve, time);
      })
    })
    this.run()
    return this
  }
  cancel() {
    if (this.stack.length) {
      this.stack.pop()
    }
    this.run()
    return this
  }
  run() {
    if (this.timer) return;
    this.timer = setTimeout(async () => {
      for (let task of this.stack) {
        await task();
      }
      this.stack = []
      this.timer = void 0;
    });
  }
}

new AI().talk('hahaha').talk('a').cancel()
new AI().sleep(3000).talk('a')
new AI().talk('hahaha').cancel()
new AI().sleep(5000).cancel().talk('abc').sleep(1000).talk('cba')