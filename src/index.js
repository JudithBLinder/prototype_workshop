// Prototypes
// As a friendly reminder, here is an example of prototypal inheritance. You can read more about it here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// Uncomment my logs to see it in action!

function Mammal(name, age = 0) {
  if (!name || typeof name !== 'string') {
    throw new Error('Mammals need a name!');
  }

  this.name = name;
  this.age = age;
}

Mammal.prototype.milk = function() {
  console.log('Milking sounds?');
}

Mammal.prototype.birthday = function() {
  ++this.age;
  console.log(`Its my birthday! 🎉🎉🎉 I am now ${this.age} years old.`);
}

const bob = new Mammal('Bob');

// console.log('Bob the Mammal Logs: ');
// bob.milk();

function Dog(name, age, breed = 'Australian Shepard') {
  Mammal.call(this, name, age);
  this.breed = breed;
}

Dog.prototype = Object.create(Mammal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`Bark. Woof. I am ${this.name} the ${this.breed} and I am ${this.age} years old. I also speak english fluently.`);
}

const winston = new Dog('Winston');

// console.log('Winston the Dog Logs: ');
// winston.birthday();
// winston.bark();
// winston.milk();

// console.log(`Validate I know what I'm doing: `);
// console.log('Is bob an instance of Mammal?', bob instanceof Mammal);
// console.log('Is winston an instance of Dog?', winston instanceof Dog);

// This seems pretty annoying right? What if we built this functionality ourselves? That's what this workshop is all about.

// TODO: You'll have to create these two functions. Look in test/index.test.js to inspect the tests!
class Factory {
  constructor() {
  }
  createClass(className, classObj, classSetters) {
    //output: const (newObj) = new ${className}()
    let objKeys = Object.keys(classObj);
    //debugger;
    className = class{
      constructor() {
        let argList = arguments;
        for (let i = 0; i < objKeys.length; i++) {
          this[objKeys[i]] = classObj[objKeys[i]];
        }
        if(classSetters !== undefined) {
          let setterKeys = Object.keys(classSetters);
          for (let i = 0; i < setterKeys.length; i++) {
            this[setterKeys[i]] = classSetters[setterKeys[i]](argList);
          }
        }
        //this.name = classObj.name;
      }
    }
    return className;
    //this.name = classObj.name;
    //return this;
  }
  extendClass(ClassToExtend, className, classObj, classSetters) {
    // const extendClassName = ({ClassToExtend, className} = {} => {
    //   class className
    // })
    //const nameIt = (name, cls) => ({[name] : class extends cls {}})[name];
    debugger;
    const classExtender = (className, ClassToExtend) => ({[className] : class extends ClassToExtend {
      //constructor(){
      //  super(className, classObj, classSetters)
      //}
    }})[className];
    return classExtender;
    // class className extends ClassToExtend {
    //   super(className, classObj, classSetters)
    // }
  }
}

const theFactory = new Factory();

module.exports = theFactory;
