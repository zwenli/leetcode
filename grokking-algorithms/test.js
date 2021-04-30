var MyMessageQueue = /** @class */ (function () {
    function MyMessageQueue() {
        this.stat = 'init';
    }
    MyMessageQueue.prototype.send = function (message) {
        this.stat = 'pedding';
        console.log(message);
        this.stat = 'done';
    };
    return MyMessageQueue;
}());
var myQueue = new MyMessageQueue();
myQueue.send('e31312');
