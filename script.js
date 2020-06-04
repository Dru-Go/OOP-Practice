console.log("=== === === === === ===");

const circle = {
  radius: 1,
  loaction: {
    x: 1,
    y: 1,
  },
  draw: () => {
    console.log("draw");
  },
};

circle.draw();
/* Factory reconstractor function - help reduce redundancy 
    when creating objects that serve the same purpose
*/

// Factory function
function createCircle(radius, location) {
  return {
    radius,
    location,
    draw: () => {
      console.log("draw using Factory Function");
    },
  };
}

const circle2 = createCircle(1, { x: 2, y: 3 });
circle2.draw();

/* Constractor function - help reduce redundancy 
    when creating objects that serve the same purpose
    
    Note - when declaring a constractor function 
            one should name the function with the first charactor capital 
*/

function CreateCircle(radius) {
  this.radius = radius;
  this.draw = () => {
    console.log("draw using Constractor function");
  };
}

/* 
    Every function is an object - one can know the name of the function by 
    just appending the letter dot
     CreateCircle.name will return the name of the function 'CreateCircle'
*/
// The previous function is the same as

const CreateCircle2 = new Function(
  "radius",
  `
    this.radius = radius
    this.draw = () => {
        console.log("draw using Constractor function")
    }
`
);

const another = new CreateCircle(1);

another.draw();

const another2 = {
  radius: 2,
  draw: () => {
    console.log("draw simple object");
  },
};

/*
 Types
    Value Types:  Number, String, Boolean, Symbol, undefined, null
    Reference Types:  Object, Function, Array
*/

/*
 To delete a property in an object we use this 
    delete another.draw or delete another[draw]

 */

for (let key in another2) {
  console.log(key, another[key]);
}

/* 
    To iterate through an the object keys and values one can use
    
    for (let key in another){
        console.log(key, another[key])
    }
    Results 
        radius 10
        draw f() { console.log('draw'); }
 
 */

if ("radius" in another2) console.log("Another has a circle");

// ===>  Abstraction in Javascript objects

function Area(length) {
  this.length = length;

  let defaultLocation = { x: 0, y: 0 }; // Bad implementation since the propery is not used outside
  this.getDefaultLocation = () => this.defaultLocation; // Good implementation since the propery is abstracted

  //   Bad Implementation
  this.compute = (factor) => {
    return factor;
  };

  //   Good Implementation - Better abstraction
  let compute2 = (factor) => {
    return factor;
  };

  this.draw = () => {
    let x, y;
    x = x * this.compute(2);
    console.log(x);
  };
}

console.log("===> Challenge Stopwatch");
// ===> Challenge Stopwatch
function StopWatch() {
  let startTime,
    endTime,
    running = false,
    duration = 0;

  this.start = () => {
    if (running) throw new Error("StopWatch is already running");
    running = true;
    // TODO set a timer
    startTime = new Date();
  };
  this.stop = () => {
    if (!running) throw new Error("StopWatch is already stopped");
    running = false;
    endTime = new Date();
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  this.reset = () => {
    startTime = null;
    endTime = null;
    running = false;
    duration = 0;
  };

  // used to define a setter or a getter
  // used to change the writable, configurable and enumerable nature of the property
  Object.defineProperty(this, "duration", {
    // writable: true, // Object propery cannot be set if writable: false
    // enumerable: true, // Object property willnot appear in the docs if enumerable: false
    // configurable: true, // Object property cannot be configured using delete instance['duration] if configurable: false
    get: () => duration,
  });
}

const timer = new StopWatch();

console.log(Object.getPrototypeOf(timer)); // will return the timer.__proto__ property

// ===> Inheritance

/*
 Two types of inheritance 
 1. classical - uses classes
 2. prototypical - uses objects
 Javascript uses Prototypical inheritace 
*/

// ===> Prototypes

function Square(length) {
  // Instance member
  this.length = length;

  // Wrong appraoch
  this.draw = () => console.log("The length of the square is ", length);

  this.move = () => {
    this.drawer();
  }; // Works calling a prototype function from current instance (reverse works aswell)
}

// Prototype members
// Better approach cause this will only be instanciated once
Square.prototype.drawer = () =>
  console.log("The length of the square is ", length);

// toString redeclared to fit a specific purpose
Square.prototype.toString = () =>
  console.log("This is the length of the square", this.length);

/*  
  ## Note 

  Object.keys(Square) returns instance members => ['length', 'move', 'draw] 
 
  for (let key in Square) console.log(keys) returns all members (instance + prototype) => 
  length
  move
  draw
  drawer
  toString 

*/

/*
## Note 

  hasOwnProperty returns true only if the property specified is an instance member of the object not prototype member

  const square = new Square()
  square.hasOwnProperty('length') // true
  square.hasOwnProperty('drawer') // false
*/

/*
  ##Note
   new Square(5) means new Square.prototype.constractor(5) 

*/

// ===> Classes
// Classes are basically functions designed to make creating objects and methods easier
// console.log(typeof Circle_class) in line 250 yields 'function'

function Circle_func(radius) {
  this.radius = radius;

  this.draw = () => {
    console.log("Drawing");
  };
} // is the same as

class Circle_class {
  constructor(radius) {
    this.radius = radius;
    // non prototype method
    this.move = () => console.log("Moving");
  }

  // prototype method
  draw() {
    console.log("Drawing");
  }

  // static method
  static parce(str) {
    const radius = JSON.parse(str).radius;
    return new Circle_class(radius);
  }
}

// ===> Static and Instance Methods
/*
  Statc methods are methods that are accessable from the class name (do not need to be instanciated)
    line no 263 is a static method
    In calling the parce method one does not need to instaciate the class to get to the method
      const parced = Circle_class.parce('{"radius": 1}') will call the static method

  Instance methods are methods that are only accessable if the class has been instanciated 
    line no 258 is an instance method
    In callind this method one needs to create an instance of the class 
      const bait = new Circle_class(12)
      bait.draw() will call the instance method
*/

//  ===> Setter and Getters

class Circle_class_setters_getters {
  // to read the radius
  get radius() {
    return this.radius;
  }

  set radius(val) {
    this.radius = val;
  }
}

// Another Example
class Square2 {
  constructor(width) {
    this.width = width;
  }

  get area() {
    return this.width ** 2;
  }

  set area(area) {
    this.width = Math.sqrt(area);
  }

  // Static method
  static equals(sq1, sq2) {
    return sq1.width === sq2.width;
  }

  static isSquare(width, height) {
    return width === height;
  }
}

const sq1 = new Square2(6);
const sq2 = new Square2(10);
console.log(sq1.area);

console.log(Square2.equals(sq1, sq2));
console.log(Square2.equals(4, 4));

console.log("===> Challenge Stack");
// ===> Challenge Stack using class

// Here we used undescore and WeakMaps to achive Encapsulation
// Note => In declaring private variable the name should start with underscore => _items
// Note => WeakMap object help create private variables

const _items = new WeakMap();

class Stack {
  constructor() {
    _items.set(this, []);
  }

  push(obj) {
    _items.get(this).push(obj);
  }

  pop() {
    const items = _items.get(this);

    if (items.length === 0) throw new Error("Stack is Empty");

    return items.pop();
  }

  peek() {
    const items = _items.get(this);

    if (items.length === 0) throw new Error("Stack is Empty");

    return items[items.length - 1];
  }

  get count() {
    const items = _items.get(this);

    return items.length;
  }
}

// ===> Inheritance

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }



  describe() {
    console.log(`I am ${this.name} and i am ${this.age} years old `);
  }
  
  static isOld() {
    console.log(`${this.name} is old`);
  } 
}

// use extends to inherit the instances and the instance and static methods 
class Programmer extends Person {

  constructor(name, age, yearsOfExperiance) {
    super(name, age);

    this.yearsOfExperiance = yearsOfExperiance;
  }

  code() {
    console.log(`${this.name} is coding`);
  }
}

const person = new Person('Bill', 23)
person.describe()

const prog = new Programmer('Boil', 12, 5)
prog.code() // prog calling its instance method code
prog.describe() // prog calling its inherited instance method 
console.log(prog.name) // prog calling the inherited name property
Programmer.isOld() 

// ===> Polymorphism

class Animal {
  constructor(name) {
    this.name = name
  }
  makeSound() {
    console.log("Generic animal sound")
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name)
  }

  // Here we are changing the implementation of the inherited method
  makeSound() {
    super.makeSound // this will call the inherited method
    console.log("Dog - Woof Woof")
  }
}

const animal = new Animal('buk')
animal.makeSound()
const dogs = new Dog('baba')
dogs.makeSound()

