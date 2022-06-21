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
