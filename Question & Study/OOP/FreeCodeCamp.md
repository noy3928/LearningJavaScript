# OOP - free code camp

Objects in JavaScript are used to model real-world objects, giving them properties and behavior just like their real-world counterparts. Here's an example using these concepts to create a duck object:

<pre>
<code>
let dog = {
  name : 'puppy',
  numLegs : 4,
};
</code>
</pre>

## Make Code More Reusable with the this Keyword

If the variable name changes, any code referencing the original name would need to be updated as well.  
In a short object definition, it isn't a problem,  
but if an object has many references to its properties there is a greater chance for error.

<pre>
<code>
let dog = {
  name: "Spot",
  numLegs: 4,
  sayLegs: function() {return "This dog has " + this.numLegs + " legs.";}
};

dog.sayLegs();
</code>
</pre>

<br>

## Define a Constructor Function

생성자의 규칙

- Constructors are defined with a capitalized name to distinguish them from other functions that are not constructors.
- Constructors use the keyword this to set properties of the object they will create. Inside the constructor, this refers to the new object it will create.
- Constructors define properties and behaviors instead of returning a value as other functions might.

<pre>
<code>
function Dog(){
  this.name = 'puppy';
  this.color = 'white';
  this.numLegs = 4
}
</code>
</pre>

<br>

## Use a Constructor to Create Objects

- this 키워드는 항상 지금 막 생성된 객체를 가리키고 있다.
- new 키워드가 사용되고 있는것에 주목하기. new 키워드가 없이 생성자를 사용하게되면, 내부의 this가 새롭게 생성된 생성자를 가리키지 않는다. 그렇게되면 원치않는 결과를 얻게될 수도 있다.

<br>

## Extend Constructors to Receive Arguments

<pre>
<code>
function Dog(name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 4;
}

const terrier = new Dog('puppy', 'white')
</code>
</pre>

<br>

## Verify an Object's Constructor with instanceof

생성된 인스턴스가 생성자의 인스턴스인지 확인하는 방법 : instanceof

<pre>
<code>
function House(numBedrooms) {
  this.numBedrooms = numBedrooms;
}

const myHouse = new House(5);
console.log(myHouse instanceof House)
</code>
</pre>

<br>

## Understand Own Properties

- name and numLegs are called own properties, because they are defined directly on the instance object. That means that duck and canary each has its own separate copy of these properties.

<pre>
<code>
function Bird(name) {
  this.name = name;
  this.numLegs = 2;
}

let canary = new Bird("Tweety");
let ownProps = [];
// Only change code below this line
for(let prop in canary){
  if(canary.hasOwnProperty(prop)){
    ownProps.push(prop)
  }
}
console.log(ownProps)
</code>
</pre>

<br>

## Use Prototype Properties to Reduce Duplicate Code

- 모든 인스턴스들은 prototype이라는 Property를 자동적으로 가지고 있다.
- 그리고 이 prototype은 모든 instances 사이에 공유되고 있다.
- 이 prototype은 생성자를 지칭하는 객체이다.

인스턴스에 새로운 프로퍼티를 넣고싶다면,
생성자의 prototype에 프로퍼티를 넣어주면된다.

<pre>
<code>
function Dog(name) {
  this.name = name;
}

let beagle = new Dog("Snoopy");
Dog.prototype.numLegs = 2;
</code>
</pre>

<br>

## Iterate Over All Properties

- hasOwnProperty로 intance가 가진 프로퍼티와 prototype이 가진 프로퍼티를 구분하기.
- own 프로퍼티는 인스턴스에 직접적으로 생성되는 프로퍼티이다.

<pre>
<code>
function Dog(name) {
  this.name = name;
}

Dog.prototype.numLegs = 4;

let beagle = new Dog("Snoopy");

let ownProps = [];
let prototypeProps = [];

for(let property in beagle){
  if(beagle.hasOwnProperty(property)){
    ownProps.push(property)
  }else{
    prototypeProps.push(property)
  }
}

console.log(ownProps)
console.log(prototypeProps)
</code>
</pre>

<br>

## Understand the Constructor Property

<pre>
<code>
let duck = new Bird();
let beagle = new Dog();

console.log(duck.constructor === Bird); // true
console.log(beagle.constructor === Dog); //true
</code>
</pre>

constructor 프로퍼티가 생성자 함수를 참조하고 있는 것을 확인할 수 있다.
이 프로퍼티로 우리는 인스턴스가 어느 생성자로부터 생성된 것인지 확인할 수 있다.

<pre>
<code>
function joinBirdFraternity(candidate) {
  if (candidate.constructor === Bird) {
    return true;
  } else {
    return false;
  }
}
</code>
</pre>

<br>

## Change the Prototype to a New Object

개별적으로 하나하나씩 prototype에 프로퍼티를 넣어주는 것은 귀찮은 일이다.

<pre>
<code>
Bird.prototype.eat = function() {
  console.log("nom nom nom");
}

Bird.prototype.describe = function() {
  console.log("My name is " + this.name);
}
</code>
</pre>

더 좋은 방법은 prototype에 새로운 객체를 넣어주는 것이다. 우리가 원하는 프로퍼티들을 넣어둔 상태로.

<pre>
<code>
Bird.prototype = {
  numLegs: 2, 
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
</code>
</pre>

<br>

## Remember to Set the Constructor Property when Changing the Prototype

<pre>
<code>
function Dog(name) {
  this.name = name;
}

// Only change code below this line
Dog.prototype = {
  constructor : Dog,
  numLegs: 4,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};
</code>
</pre>

<br>

## Understand Where an Object’s Prototype Comes From

사람들이 그들의 부모에게 유전자를 물려받듯이, 객체도 만들어진 생성자함수로부터 prototype을 직접 물려받는다.  
예를들어, 여기 Bird 생성자가 duck 객체를 만들었다.

<pre>
<code>
function Bird(name) {
  this.name = name;
}

let duck = new Bird("Donald");
</code>
</pre>

duck은 Bird 생성자 함수로부터 이것의 prototype을 상속한다. 이것의 관계는 isPrototypeOf 메서드를 통해서 보여줄 수 있다.

<pre>
<code>
Bird.prototype.isPrototypeOf(duck); // true
</code>
</pre>

<br>

## Understand the Prototype Chain

All objects in JavaScript (with a few exceptions) have a prototype

<pre>
<code>
function Bird(name) {
  this.name = name;
}

typeof Bird.prototype;
</code>
</pre>

prototype이 하나의 객체이기 때문에, prototype은 그 자체로 prototype을 가질 수 있다.  
Bird.prototype의 prototype은 Object.prototype이다.

<pre>
<code>
Object.prototype.isPrototypeOf(Bird.prototype); //true
</code> 
</pre>

이거는 어디에 쓸모가 있을까?? hasOwnProperty를 기억할텐데,

<pre>
<code>
let duck = new Bird("Donald");
duck.hasOwnProperty("name");
</code>
</pre>

hasOwnProperty 이 메서드는 Bird.prototype로도 접근가능하고,duck으로도 접근가능한 Object.prototype로부터 결정되어 진다.  
이게 바로 프로토타입체인의 예시이다. 이런 프로토타입 체인에서, Bird는 duck의 supertype이고, duck은 subtype이다.  
Object는 Bird와 duck의 supertype이다. Object는 자바스크립트에 존재하는 모든 객체의 supertype이라고 할 수 있다.  
그러므로 모든 객체들은 hasOwnProperty 메서드를 사용할 수 있다.

<br>

## Use Inheritance So You Don't Repeat Yourself

There's a principle in programming called Don't Repeat Yourself (DRY)  
Notice in the example below that the describe method is shared by Bird and Dog:

<pre>
<code>
Bird.prototype = {
  constructor: Bird,
  describe: function() {
    console.log("My name is " + this.name);
  }
};

Dog.prototype = {
  constructor: Dog,
  describe: function() {
    console.log("My name is " + this.name);
  }
};
</code>
</pre>

describe가 반복되고 있다. Animal이라는 supertype을 만들어서 DRY원칙을 지킬 수 있을 것 같다.

<pre>
<code>
function Animal() { };

Animal.prototype = {
  constructor: Animal, 
  describe: function() {
    console.log("My name is " + this.name);
  }
};
</code>
</pre>

Since Animal includes the describe method, you can remove it from Bird and Dog:

<pre>
<code>
Bird.prototype = {
  constructor: Bird
};

Dog.prototype = {
  constructor: Dog
};
</code>
</pre>

<br>

## Inherit Behaviors from a Supertype

인스턴스를 만드는 또 다른 방법

<pre>
<code>
let animal = Object.create(Animal.prototype);
</code>
</pre>

By setting the prototype of animal to be the prototype of Animal, you are effectively giving the animal instance the same "recipe" as any other instance of Animal.

<pre>
<code>
animal.eat();
animal instanceof Animal;
</code>
</pre>

<br>

## Set the Child's Prototype to an Instance of the Parent

This challenge covers the next step: set the prototype of the subtype (or child)—in this case, Bird—to be an instance of Animal.

<pre>
<code>
Bird.prototype = Object.create(Animal.prototype);
</code>
</pre>

prototype은 객체를 만들기 위한 레시피와 같다는 것을 기억하자. Bird를 위한 레시피는 지금 Animal로 부터 받은 모든 핵심 재료들을 가지고 있다.

<pre>
<code>
let duck = new Bird('Donald');
duck.eat();
</code>
</pre>

duck은 Animal의 속성을 상속받음으로써, eat 메서드를 가지고 있다.

<br>

## Reset an Inherited Constructor Property

<pre>
<code>
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor
</code>
</pre>

하지만 duck 이나, Bird로부터 만들어진 instance들은 그들이 Bird로 부터 만들어졌지,Animal로 만들어진 것이 아니라는 것을 보여줄 필요가 있다.  
이것을 하기 위해서, Bird의 constructor property를 Bird object에 수동적으로 세팅할 수 있다.

<pre>
<code>
Bird.prototype.constructor = Bird;
duck.constructor
</code>
</pre>

<br>

## Add Methods After Inheritance

부모 생성자 함수의 prototype 객체를 상속한 생성자함수는 상속받은 메서드에 더해서, 본래 자신의 메서드도 여전히 가지고 있다.
예를 들어서, Bird는 생성자함수이다. Animal의 prototype을 상속한

<pre>
<code>
function Animal() { }
Animal.prototype.eat = function() {
  console.log("nom nom nom");
};
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
Bird.prototype.constructor = Bird;
</code>
</pre>

Animal에게서 상속받은것 외에도, Bird 객체에 유니크한 행동을 넣으려 한다.  
fly 함수를 얻게되었다. 함수는 Bird의 prototype에 추가된다, 다른 모든 생성자함수와 같은 방식으로.

<pre>
<code>
Bird.prototype.fly = function() {
  console.log("I'm flying!");
};
</code>
</pre>

이제 Bird는 eat과 fly 두 개의 메서드를 가지게 되었다.

<pre>
<code>
let duck = new Bird();
duck.eat();
duck.fly();
</code>
</pre>

<br>

## Override Inherited Methods

메서드를 오버라이딩하는 것도 가능하다. 자식 프로토타입에 같은 이름으로 넣어주면 된다.

<pre>
<code>
function Animal() { }
Animal.prototype.eat = function() {
  return "nom nom nom";
};
function Bird() { }

Bird.prototype = Object.create(Animal.prototype);

Bird.prototype.eat = function() {
  return "peck peck peck";
};
</code>
</pre>

만약 let duck = new Bird(); 이런 인스턴스가 있다면,  
duck.eat()를 호출할 수 있다.  
이게 자바스크립트가 duck의 프로토타입 체인으로 메서드를 찾는 방법이다.

1.duck => Is eat() defined here? No.  
2.Bird => Is eat() defined here? => Yes. Execute it and stop searching.  
3.Animal => eat() is also defined, but JavaScript stopped searching before reaching this level.  
4.Object => JavaScript stopped searching before reaching this level.

<br>

## Use a Mixin to Add Common Behavior Between Unrelated Objects

상속이 문제가 되는 경우가 있다. 관계가 없는 두 경우의 객체에 상속되는 경우가 그렇다.  
예를 들어 Bird와 AirPlane은 모두 fly하긴 하지만, 엄연히 다른 종류다.  
이렇게 공통된 메서드를 가지고 있으면서 다른 종류의 객체가 있을 때,  
유연하게 메서드를 상속시키는 방법은 무엇일까?  
바로 mixin을 활용하는 것이다.

<pre>
<code>
let flyMixin = function(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  }
};
</code>
</pre>

<pre>
<code>
let bird = {
  name: "Donald",
  numLegs: 2
};

let plane = {
  model: "777",
  numPassengers: 524
};

flyMixin(bird);
flyMixin(plane);
</code>
</pre>

이제 fly 메서드가 bird와 plane모두에 상속되었다.

<pre>
<code>
bird.fly();
plane.fly();
</code>
</pre>

<br>

## Use Closure to Protect Properties Within an Object from Being Modified Externally

Bird의 name 속성은 public이었다. 왜냐하면 외부에서 조작이 가능한 것이었기 때문이다.

<pre>
<code>
bird.name = "Duffy";
</code>
</pre>

그러나 이렇게 외부에서 쉽게 조작이 가능하도록 만들어두면, 문제가 생기는 경우들이 있을 수 있다.  
이런 문제를 막는 가장 쉬운 방법은 public을 private로 만드는 것이다.  
constructor를 이용해서 만들 수 있는데, 이렇게 함으로써 변수의 scope를 변경시킬 수 있다.  
또한 이 방법을 통해서 만들어진 변수는 constructor 내부의 메서드에 의해서만 바뀔 수 있다.

<pre>
<code>
function Bird() {
  let hatchedEgg = 10;

  this.getHatchedEggCount = function() { 
    return hatchedEgg;
  };
}
let ducky = new Bird();
ducky.getHatchedEggCount();
</code>
</pre>

Here getHatchedEggCount is a privileged method, because it has access to the private variable hatchedEgg.  
This is possible because hatchedEgg is declared in the same context as getHatchedEggCount.  
In JavaScript, a function always has access to the context in which it was created. This is called closure.

<br>

## Understand the Immediately Invoked Function Expression (IIFE)

<pre>
<code>
(function () {
  console.log("Chirp, chirp!");
})();
</code>
</pre>

Note that the function has no name and is not stored in a variable.  
The two parentheses () at the end of the function expression cause it to be immediately executed or invoked.  
This pattern is known as an immediately invoked function expression or IIFE.

## Use an IIFE to Create a Module

IIFE는 보통 그룹관련기능에 많이 사용된다.

 <pre>
 <code>
 function glideMixin(obj) {
  obj.glide = function() {
    console.log("Gliding on the water");
  };
}
function flyMixin(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  };
}
 </code>
 </pre>

위의 그룹들을 아래와 같이 모듈에 넣을 수 있다.

```javascript
let motionModule = (function () {
  return {
    glideMixin: function (obj) {
      obj.glide = function () {
        console.log("Gliding on the water")
      }
    },
    flyMixin: function (obj) {
      obj.fly = function () {
        console.log("Flying, wooosh!")
      }
    },
  }
})()
```

IIFE를 사용하고 있는 부분에 주목해보자. 즉시 객체를 반환하고 모듈에 담아넣고 있다.  
이렇게 함으로써 다양한 기능을 하나의 개체 안에 담아놓고 사용할 수가 있다.

<pre>
<code>
motionModule.glideMixin(duck);
duck.glide();
</code>
</pre>
