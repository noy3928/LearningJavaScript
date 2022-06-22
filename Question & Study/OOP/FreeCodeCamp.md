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
