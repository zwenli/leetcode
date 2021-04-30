var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayHello = function () {
        console.log('my name is ', this.name);
    };
    Person.prototype.walk = function () {
        console.log('walking .....');
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, grade) {
        var _this = _super.call(this, name) || this;
        _this.grade = grade;
        return _this;
    }
    Student.prototype.sayHello = function () {
        _super.prototype.sayHello.call(this);
        console.log('I am ', this.grade);
    };
    Student.prototype.run = function () {
        console.log('runnning ......');
    };
    return Student;
}(Person));
var jack = new Student('jack', '9');
jack.sayHello();
jack.run();
jack.walk();
