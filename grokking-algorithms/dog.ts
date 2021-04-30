class Person {
  name: String
  constructor(name: String) {
    this.name = name;
  }
  sayHello(): void {
    console.log('my name is ', this.name);
  }
  walk(): void {
    console.log('walking .....');
  }
}

class Student extends Person {
  grade: String
  constructor(name: String, grade: String) {
    super(name);
    this.grade = grade;
  }
  sayHello(): void {
    super.sayHello();
    console.log('I am ', this.grade);
  }
  run(): void {
    console.log('runnning ......');
  }
}

const jack = new Student('jack', '9');
jack.sayHello()
jack.run()
jack.walk()